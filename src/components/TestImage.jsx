"use client";

export default function TestImage() {
  return (
    <div className="p-4 border border-red-500">
      <h3>Test Image</h3>
      <div className="w-64 h-48 bg-blue-200 border border-blue-500">
        <img 
          src="https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Test"
          className="w-full h-full object-cover"
          onLoad={() => console.log('TEST IMAGE LOADED')}
          onError={() => console.log('TEST IMAGE ERROR')}
        />
      </div>
    </div>
  );
}