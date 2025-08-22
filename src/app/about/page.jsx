export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-black">About Us</h1>
            <div className="w-16 h-px bg-black"></div>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Studio Gravitas is an architecture and design practice focused on creating meaningful spaces that respond to context, climate, and community.
            </p>
            
            <p>
              Founded with a commitment to thoughtful design, we approach each project as an opportunity to explore the relationship between built and natural environments. Our work spans residential, commercial, and cultural projects, each developed through careful consideration of site, program, and user experience.
            </p>
            
            <p>
              We believe architecture should be both responsive and responsible - creating spaces that enhance daily life while respecting environmental and social contexts. Our design process emphasizes collaboration, sustainability, and attention to detail.
            </p>
            
            <div className="pt-8">
              <h2 className="text-xl font-light text-black mb-4">Contact Information</h2>
              <div className="space-y-2 text-sm">
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