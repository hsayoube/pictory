'use client';

import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { UNSPLASH_API_KEY } from '../config';
import cacheWithTTL from '../context/CacheProvider';
import Alert from '../components/Alert';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
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
        className={`rounded-md shadow-md transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'
          }`}
        onLoadingComplete={() => setLoaded(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
    </motion.div>
  );
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Unsplash() {
  const perPage = 30;
  const totalPages = 10;
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const { data, error, isLoading } = useSWR(
    `https://api.unsplash.com/photos?per_page=${perPage}&page=${page}`,
    fetcher,
    {
      dedupingInterval: 60 * 60,
      revalidateIfStale: true,
      keepPreviousData: true,
      provider: cacheWithTTL,
    }
  );

  useEffect(() => {
    if (data?.length > 0) {
      setImages((prev) => {
        const newImages = data.filter((photo) => !prev.find((p) => p.id === photo.id));
        return [...prev, ...newImages];
      });
    }
  }, [data]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
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
    <main className="max-w-7xl mx-auto px-6 py-12">
      {isLoading && images.length === 0 && (
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

      {!isLoading && error && images.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Alert type="error" message="Failed to load images. Please try again later." />
        </motion.div>
      )}

      {images.length > 0 && (
        <>
          <motion.h1
            className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Images from <span className="text-blue-600">Unsplash</span>
          </motion.h1>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto gap-5"
            columnClassName="masonry-column space-y-5"
          >
            {images.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
              >
                <Link
                  href={photo.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative w-full rounded-md overflow-hidden">
                    <ImageWithFade
                      src={photo.urls.small}
                      alt={photo.alt_description || 'Unsplash image'}
                      width={photo.width}
                      height={photo.height}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <p className="text-white text-sm truncate">
                        {photo.description || photo.alt_description || 'Untitled'}
                      </p>
                      <p className="text-xs text-gray-300 truncate">by {photo.user.name}</p>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Masonry>

          {/* Skeletons for next batch */}
          {isLoading && (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex w-auto gap-5 mt-6"
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
  );
}
