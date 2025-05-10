'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

const CLOUD_COUNT = 5;
const CLOUD_IMAGES = [
  '/cloudImage1.png',
  '/cloudImage2.png',
  '/cloudImage3.png',
];
const OFFSET = 500;
const MIN_DURATION = 60 * 1;
const MAX_DURATION = 60 * 2;
const STAGGER_DELAY = (MAX_DURATION - MIN_DURATION) * 1000;

const getRandomDirection = () => (Math.random() > 0.5 ? 'ltr' : 'rtl');
const getRandomY = () => Math.random() * window.innerHeight * 0.8;
const getRandomSize = () => Math.random() * 0.4 + 0.2;
const getRandomOpacity = () => Math.random() * 0.1 + 0.4;
const getRandomDuration = () => {
  return Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION;
};

const Cloud = () => {
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transitionEndHandlers = useRef<Map<HTMLDivElement, () => void>>(
    new Map(),
  );
  const initialTimeouts = useRef<NodeJS.Timeout[]>([]);

  const resetCloud = useCallback((cloud: HTMLDivElement, index: number) => {
    if (typeof window === 'undefined') return;

    cloud.style.visibility = 'visible';
    cloud.style.transition = 'none';
    cloud.style.transform = 'translateX(0px)';

    const direction = getRandomDirection();
    const duration = getRandomDuration();
    const yPosition = getRandomY();
    const sizeFactor = getRandomSize();
    const opacity = getRandomOpacity();

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const cloudWidth = screenWidth * sizeFactor;
    const startX = direction === 'ltr' ? -cloudWidth : screenWidth;

    cloud.style.top = `${yPosition}px`;
    cloud.style.left = '0px';
    cloud.style.width = `${cloudWidth}px`;
    cloud.style.height = `${screenHeight * sizeFactor * 0.1}px`;
    cloud.style.opacity = `${opacity}`;
    cloud.style.transform = `translateX(${startX}px)`;

    cloud.offsetHeight;

    const endX =
      direction === 'ltr' ? screenWidth + OFFSET : -cloudWidth - OFFSET;

    cloud.style.transition = `transform ${duration}s linear, opacity ${duration * 0.8}s linear`;
    cloud.style.transform = `translateX(${endX}px)`;
  }, []);

  useEffect(() => {
    initialTimeouts.current.forEach(clearTimeout);
    initialTimeouts.current = [];
    transitionEndHandlers.current.forEach((handler, cloudElement) => {
      cloudElement.removeEventListener('transitionend', handler);
    });
    transitionEndHandlers.current.clear();

    for (const [index, cloud] of cloudRefs.current.entries()) {
      if (cloud) {
        const timeoutId = setTimeout(() => {
          resetCloud(cloud, index);
        }, index * STAGGER_DELAY);
        initialTimeouts.current.push(timeoutId);

        const specificHandler = () => resetCloud(cloud, index);
        transitionEndHandlers.current.set(cloud, specificHandler);
        cloud.addEventListener('transitionend', specificHandler);
      }
    }

    return () => {
      initialTimeouts.current.forEach(clearTimeout);
      for (const cloud of cloudRefs.current) {
        if (cloud) {
          const handler = transitionEndHandlers.current.get(cloud);
          if (handler) {
            cloud.removeEventListener('transitionend', handler);
          }
        }
      }
      transitionEndHandlers.current.clear();
    };
  }, [resetCloud]);

  const setCloudRef = (el: HTMLDivElement | null, index: number) => {
    cloudRefs.current[index] = el;
  };

  return (
    <>
      {Array.from({ length: CLOUD_COUNT }).map((_, index) => (
        <div
          key={`${CLOUD_IMAGES[index % CLOUD_IMAGES.length]}-${index}`}
          ref={(el) => setCloudRef(el, index)}
          className="pointer-events-none fixed z--10"
          style={{ willChange: 'transform', visibility: 'hidden' }}
        >
          <Image
            src={CLOUD_IMAGES[index % CLOUD_IMAGES.length]}
            alt={`Cloud ${index + 1}`}
            width={500}
            height={500}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority={index < 3}
          />
        </div>
      ))}
    </>
  );
};

export default Cloud;
