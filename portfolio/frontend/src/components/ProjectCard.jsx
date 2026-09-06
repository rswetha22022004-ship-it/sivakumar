import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mediaUrl } from '../services/api';
import { GithubIcon } from './BrandIcons';

export default function ProjectCard({ project }) {
  /**
   * Local Vite assets look like:
   * /assets/skillmax-xxxxx.jpeg
   *
   * Backend images usually look like:
   * /media/projects/xxxxx.jpeg
   *
   * Local assets should NOT be passed through mediaUrl().
   */
  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    // If image is already a full URL
    if (
      image.startsWith('http://') ||
      image.startsWith('https://') ||
      image.startsWith('data:') ||
      image.startsWith('blob:')
    ) {
      return image;
    }

    // Vite imported local assets
    if (
      image.startsWith('/assets/') ||
      image.includes('/assets/')
    ) {
      return image;
    }

    // Backend/media images
    return mediaUrl(image);
  };

  const image = getImageUrl(project.image);

  return (
    <div className="card overflow-hidden group flex flex-col">

      {/* Project Image */}
      <div className="h-44 w-full bg-gradient-to-br from-ink-400 to-ink-700 flex items-center justify-center overflow-hidden">

        {image ? (
          <img
            src={image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              console.error(
                `Failed to load project image for ${project.title}:`,
                image
              );

              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="font-mono text-4xl text-ink-600 select-none">
            {'</>'}
          </span>
        )}

      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col flex-1">

        <h3 className="text-lg font-bold text-white">
          {project.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
          {project.short_description}
        </p>

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="badge"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">

          {/* Live Demo */}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary !px-4 !py-2 text-sm"
            >
              Live Demo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {/* View Details */}
          <Link
            to={`/projects/${project.slug}`}
            className="btn btn-outline !px-4 !py-2 text-sm"
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* GitHub */}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 text-slate-300 hover:border-accent hover:text-accent"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}

        </div>
      </div>
    </div>
  );
}