export default function About() {
  return (
    <div className="min-h-screen bg-white lg:ml-80">
      <div className="p-8 lg:p-12">
        <div className="max-w-4xl content-text">
          <div className="mb-12">
            <h1 className="text-4xl font-light tracking-wide text-black mb-4">About</h1>
            <div className="w-16 h-px bg-black"></div>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed font-light">
            <p className="text-lg font-light">
              Studio Gravitas is an architecture and design practice focused on creating meaningful spaces that respond to context, climate, and community.
            </p>
            
            <p className="font-light">
              Founded with a commitment to thoughtful design, we approach each project as an opportunity to explore the relationship between built and natural environments. Our work spans residential, commercial, and cultural projects, each developed through careful consideration of site, program, and user experience.
            </p>
            
            <p className="font-light">
              We believe architecture should be both responsive and responsible - creating spaces that enhance daily life while respecting environmental and social contexts. Our design process emphasizes collaboration, sustainability, and attention to detail.
            </p>
            
            <div className="pt-8">
              <h2 className="text-xl font-light text-black mb-4">Contact Information</h2>
              <div className="space-y-2 text-sm font-light">
                <p>Email: info@studiogravitas.com</p>
                <p>Location: India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}