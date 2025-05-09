'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

const CLOUD_COUNT = 5;
const CLOUD_IMAGES = ['/upperCloud.png', '/bottomCloud.png'];
const OFFSET = 500;

const getRandomDirection = () => (Math.random() > 0.5 ? 'ltr' : 'rtl');
const getRandomY = () => Math.random() * window.innerHeight * 0.8;
const getRandomSize = () => Math.random() * 0.2 + 0.3;
const getRandomOpacity = () => Math.random() * 0.3 + 0.3;
const getRandomDuration = () => {
  const minDuration = 60 * 2;
  const maxDuration = 60 * 4;
  return Math.random() *(maxDuration - minDuration) + minDuration;
};

const Cloud = () => {
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);

  const resetCloud = useCallback((cloud: HTMLDivElement, index: number) => {
    const direction = getRandomDirection();
    const duration = getRandomDuration();
    const yPosition = getRandomY();
    const sizeFactor = getRandomSize();
    const opacity = getRandomOpacity();

    const cloudWidth = window.innerWidth * sizeFactor;
    const startX =
      direction === 'ltr' ? -cloudWidth : window.innerWidth + cloudWidth;

    cloud.style.top = `${yPosition}px`;
    cloud.style.left = `${startX}px`;
    cloud.style.width = `${cloudWidth}px`;
    cloud.style.height = `${window.innerHeight * sizeFactor * 0.2}px`;
    cloud.style.opacity = `${opacity}`;

    const endX =
      direction === 'ltr' ? window.innerWidth + OFFSET : -cloudWidth - OFFSET;
    const translateDistance = endX - startX;

    cloud.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    cloud.style.transform = `translateX(${translateDistance}px)`;
  }, []);

  useEffect(() => {
    for (const [index, cloud] of cloudRefs.current.entries()) {
      if (cloud) {
        resetCloud(cloud, index);
        cloud.addEventListener('transitionend', () => resetCloud(cloud, index));
      }
    }

    return () => {
      for (const cloud of cloudRefs.current) {
        if (cloud) {
          cloud.removeEventListener('transitionend', () => {});
        }
      }
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
          className="pointer-events-none fixed z-0"
          style={{ willChange: 'transform' }}
        >
          <Image
            src={CLOUD_IMAGES[index % CLOUD_IMAGES.length]}
            alt={`Cloud ${index + 1}`}
            width={500}
            height={500}
          />
        </div>
      ))}
    </>
  );
};

export default Cloud;
