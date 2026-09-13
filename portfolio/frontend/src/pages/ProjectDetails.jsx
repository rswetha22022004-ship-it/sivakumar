import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { getProject, mediaUrl } from '../services/api';
import { GithubIcon } from '../components/BrandIcons';

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let mounted = true;
    getProject(slug)
      .then((data) => { if (mounted) { setProject(data); setStatus('ready'); } })
      .catch(() => { if (mounted) setStatus('error'); });
    return () => { mounted = false; };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center pt-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="section pt-40 text-center">
        <p className="text-slate-400">Couldn't load this project. Please make sure the API server is running.</p>
        <Link to="/" className="btn btn-outline mt-6 inline-flex"><ArrowLeft className="h-4 w-4" /> Back home</Link>
      </div>
    );
  }

  const image = mediaUrl(project.image);

  return (
    <div className="page-entrance">
      <div className="section pt-32 sm:pt-40">
      <Link to="/" className="entrance-action inline-flex items-center gap-2 text-sm text-slate-400 hover:text-accent mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <div className="entrance-card h-56 sm:h-80 w-full rounded-2xl bg-gradient-to-br from-ink-800 to-ink-700 flex items-center justify-center overflow-hidden mb-10">
        {image ? (
          <img src={image} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <span className="font-mono text-6xl text-ink-600 select-none">{'</>'}</span>
        )}
      </div>

      <h1 className="entrance-heading text-3xl sm:text-4xl font-extrabold text-white">{project.title}</h1>
      <p className="entrance-subtitle mt-4 max-w-3xl text-slate-400 leading-relaxed">
        {project.full_description || project.short_description}
      </p>

      {project.technologies?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => <span key={tech.id} className="badge">{tech.name}</span>)}
        </div>
      )}

      <div className="entrance-action mt-8 flex flex-wrap gap-4">
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary">
            Live Demo <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline">
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
        )}
      </div>

      {project.features?.length > 0 && (
        <div className="entrance-card mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Features</h2>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.role_responsibilities?.length > 0 && (
        <div className="entrance-card mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Role &amp; Responsibilities</h2>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {project.role_responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}
