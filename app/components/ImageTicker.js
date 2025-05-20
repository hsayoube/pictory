'use client';

import Image from 'next/image';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap
} from 'framer-motion';
import { UNSPLASH_API_KEY } from '../config';
import cacheWithTTL from '../context/CacheProvider';
import Alert from './Alert';

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
    },
  }).then((res) => res.json());

export default function ImageTicker() {
  const [images, setImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const { data, error, isLoading } = useSWR(
    `https://api.unsplash.com/photos?per_page=12`,
    fetcher,
    {
      dedupingInterval: 3600_000,
      revalidateIfStale: true,
      keepPreviousData: true,
      provider: cacheWithTTL,
    }
  );

  useEffect(() => {
    if (Array.isArray(data)) {
      setImages(data);
    }
  }, [data]);

  const x = useMotionValue(0);
  const speed = isHovered ? 20 : 60;
  const xTransformed = useTransform(x, (val) => `${wrap(-1000, 0, val)}px`);

  useAnimationFrame((_, delta) => {
    const moveBy = (delta / 1000) * speed;
    x.set(x.get() - moveBy);
  });

  const loopImages = [...images, ...images]; // duplicate for seamless loop

  return (
    <>
      {(!isLoading && error && images.length === 0) && (
        <Alert type="error" message="Failed to load images. Please try again later." />
      )}

      {images.length > 0 && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full overflow-hidden bg-white dark:bg-gray-900 py-6 border-y border-gray-200 dark:border-gray-700"
        >
          {/* Gradient mask edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white dark:from-gray-900 z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white dark:from-gray-900 z-10" />

          <motion.div
            className="flex gap-8 whitespace-nowrap"
            style={{ x: xTransformed }}
          >
            {loopImages.map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0.5,
                  zIndex: 1,
                  boxShadow: '0 6px 25px rgba(0,0,0,0.25)',
                }}
                className="min-w-[240px] max-w-[260px] flex-shrink-0 relative aspect-[4/3] transition-transform rounded-xl overflow-hidden"
              >
                <Image
                  src={image.urls.small}
                  alt={image.alt_description || 'Unsplash Image'}
                  fill
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 350px, 400px"
                  className="object-cover transition-transform"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
