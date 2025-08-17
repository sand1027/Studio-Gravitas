export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="space-y-4 mb-16">
          <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-black">About us</h1>
          <div className="w-16 h-px bg-black"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                <span className="font-medium text-black">Studio Gravitas</span> was established in 2016, with their inaugural project <em>The House of Memories</em> in India. Gravitas represents a collective spirit, a process, and an investigation into architecture and design—driven by the past, present, and future.
              </p>
              
              <p>
                Gravitas aims to find new meaning and interpretation in their work through a philosophy rooted in phenomenology and timeless architecture. For Gravitas, it is a process rather than a product. It is the idea of making rather than building.
              </p>
              
              <p>
                It is about the atmosphere than mere aesthetics. As a practice, Gravitas firmly believes in the collaborative spirit and a holistic approach to design and a creative process driven by 'we' rather than 'I'.
              </p>
            </div>
            
            <div className="pt-8">
              <h3 className="text-lg font-light text-black mb-4">Philosophy</h3>
              <p className="text-gray-700 leading-relaxed">
                Beyond the program, client needs and contextual forces, every project is a journey—an investigation into design rooted in the spirit of a place, history and memory. At times, it is a typological exploration that seeks to redefine the idea of home and living.
              </p>
            </div>
            
            <div className="pt-8">
              <h3 className="text-lg font-light text-black mb-4">Collaboration</h3>
              <p className="text-gray-700 leading-relaxed">
                Currently, Gravitas is involved in collaborative projects within India and abroad, partnering with design firms and clients who align with this ideology and philosophy.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Studio Gravitas Architecture"
              className="w-full h-80 object-cover"
            />
            
            <div className="bg-gray-50 p-8">
              <h3 className="text-lg font-light text-black mb-6">Studio Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="text-black">2016</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="text-black">India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus</span>
                  <span className="text-black">Architecture & Design</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Approach</span>
                  <span className="text-black">Collaborative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}