import ProjectCard from './ProjectCard';

export default function Projects({ projects }) {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="section">
      <h2 className="section-heading">Projects</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
