// components/Skeleton.tsx
import React from 'react';

interface SkeletonProps {
  className?: string; // Untuk menambahkan kelas Tailwind CSS kustom
  count?: number; // Jumlah item skeleton yang akan dirender (misal, untuk daftar)
  width?: string; // Lebar skeleton (misal: "w-full", "w-1/2")
  height?: string; // Tinggi skeleton (misal: "h-4", "h-8")
  variant?: 'text' | 'rect' | 'circle'; // Bentuk skeleton
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  count = 1,
  width,
  height,
  variant = 'rect',
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse dark:bg-gray-700';
  let shapeClasses = '';

  switch (variant) {
    case 'text':
      shapeClasses = 'rounded'; // Teks biasanya memiliki sudut sedikit membulat
      if (!height) height = 'h-4'; // Tinggi default untuk teks
      break;
    case 'rect':
      shapeClasses = 'rounded-md'; // Persegi panjang dengan sudut sedikit membulat
      break;
    case 'circle':
      shapeClasses = 'rounded-full'; // Lingkaran
      if (!width) width = height || 'w-10'; // Pastikan lingkaran memiliki lebar dan tinggi yang sama
      if (!height) height = width || 'h-10';
      break;
    default:
      shapeClasses = 'rounded-md';
  }

  const items = Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={`${baseClasses} ${shapeClasses} ${width || 'w-full'} ${height || 'h-6'} ${className || ''}`}
    ></div>
  ));

  return (
    <>
      {items}
    </>
  );
};

export default Skeleton;