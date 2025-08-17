"use client";

export default function Landing() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white space-y-8 px-6">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-light tracking-wider">
              STUDIO GRAVITAS
            </h1>
            <div className="w-32 h-px bg-white mx-auto"></div>
            <p className="text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Architecture rooted in phenomenology, driven by collaborative spirit and timeless design
            </p>
          </div>
          
          <button
            onClick={() => window.location.href = '/home'}
            className="group mt-12 px-12 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wide text-lg"
          >
            <span className="group-hover:tracking-wider transition-all duration-300">
              ENTER STUDIO
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}