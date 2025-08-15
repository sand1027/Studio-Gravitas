import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/app/data/projects.json";

export default async function Subcategory({ params }) {
  const awaitedParams = await params;
  const subcategory = awaitedParams.subcategory;

  const projects = projectsData.projects.filter(
    (p) => p.category === "interior" && p.subcategory === subcategory
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold capitalize">
        {subcategory.replace("-interior", "")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <ProjectCard
            key={proj.id}
            title={proj.title}
            description={proj.description}
            image={proj.coverImage}
            href={`/projects/interior/${subcategory}/${proj.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
