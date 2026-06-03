"use client";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackName?: string;
}

export default function SafeImage({ src, alt, className, fallbackName }: SafeImageProps) {
  function handleError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    if (fallbackName) {
      img.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(fallbackName) + "&background=0A66C2&color=fff&size=128";
    } else {
      img.style.display = "none";
    }
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
