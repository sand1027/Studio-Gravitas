import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/app/data/projects.json";

export default async function Subcategory({ params }) {
  const awaitedParams = await params;
  const subcategory = awaitedParams.subcategory;

  const projects = projectsData.projects.filter(
    (p) => p.category === "architecture" && p.subcategory === subcategory
  );

  return (
    <div className="min-h-screen bg-white p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-black capitalize">
            {subcategory.replace('-', ' ')}
          </h1>
          <div className="w-16 h-px bg-black"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              title={proj.title}
              description={proj.description}
              image={proj.coverImage}
              href={`/projects/architecture/${subcategory}/${proj.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
