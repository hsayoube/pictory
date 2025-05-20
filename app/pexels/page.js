'use client';

import useSWR, { SWRConfig } from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { PEXELS_API_KEY } from '../config';
import cacheWithTTL from '../context/CacheProvider';
import Alert from '../components/Alert';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const fetcher = (url) =>
    fetch(url, {
        headers: {
            Authorization: PEXELS_API_KEY,
        },
    }).then((res) => res.json());

function ImageWithFade({ src, alt, width, height }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`rounded-md shadow-md transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadingComplete={() => setLoaded(true)}
                sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                priority={false}
            />
        </motion.div>
    );
}

export default function Pexels() {
    const perPage = 30;
    const totalPages = 10;
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState([]);

    const { data, error, isLoading } = useSWR(
        `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`,
        fetcher,
        {
            dedupingInterval: 60 * 60,
            revalidateIfStale: true,
            provider: cacheWithTTL,
        }
    );

    useEffect(() => {
        if (data?.photos && data.photos.length > 0) {
            setPhotos((prev) => {
                const newPhotos = data.photos.filter(
                    (newPhoto) => !prev.find((p) => p.id === newPhoto.id)
                );
                return [...prev, ...newPhotos];
            });
        }
    }, [data]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight &&
            !isLoading &&
            page < totalPages
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isLoading, page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <SWRConfig value={{ fetcher, provider: cacheWithTTL }}>
            <main className="max-w-7xl mx-auto px-6 py-12">
                {isLoading && (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto gap-5"
                        columnClassName="masonry-column space-y-5"
                    >
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="break-inside-avoid w-full rounded-md bg-gray-300 dark:bg-gray-700 aspect-[4/3]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                            />
                        ))}
                    </Masonry>
                )}

                {!isLoading && (error || photos?.length === 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Alert type="error" message="Failed to load images. Please try again later." />
                    </motion.div>
                )}

                {!isLoading && !error && photos?.length > 0 && (
                    <>
                        <motion.h1
                            className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-100"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            Images from <span className="text-blue-600">Pexels</span>
                        </motion.h1>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex w-auto gap-5"
                            columnClassName="masonry-column space-y-5"
                        >
                            {photos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.02 }}
                                >
                                    <Link
                                        href={photo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`View photo by ${photo.photographer} on Pexels`}
                                        className="group break-inside-avoid rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 block cursor-pointer"
                                    >
                                        <div className="relative w-full rounded-md overflow-hidden">
                                            <ImageWithFade
                                                src={photo.src.medium}
                                                alt={photo.alt || 'Pexels image'}
                                                width={photo.width}
                                                height={photo.height}
                                            />
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                <p className="text-white text-sm truncate">{photo.alt || 'Untitled'}</p>
                                                <p className="text-xs text-gray-300 truncate">by {photo.photographer}</p>
                                            </motion.div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </Masonry>
                        {isLoading && photos.length > 0 && (
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="flex w-auto gap-5"
                                columnClassName="masonry-column space-y-5"
                            >
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="break-inside-avoid w-full rounded-md bg-gray-300 dark:bg-gray-700 aspect-[4/3]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05, duration: 0.4 }}
                                    />
                                ))}
                            </Masonry>
                        )}
                    </>
                )}
            </main>
        </SWRConfig>
    );
}
