"use client";

export default function SimpleImage({ src, alt, className }) {
  const imageSrc = src || 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3';
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        console.log('❌ Image ERROR for:', alt);
        e.target.src = 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3';
      }}
      onLoad={() => {
        console.log('✅ Image LOADED for:', alt);
      }}
    />
  );
}