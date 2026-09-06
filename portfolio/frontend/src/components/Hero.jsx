import { ArrowRight, Download, Mail } from 'lucide-react';
import { mediaUrl } from '../services/api';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import AnimatedName from './AnimatedName';
import defaultProfileImage from '../assets/profile.jpg';

const SOCIAL_ICON = { linkedin: LinkedinIcon, github: GithubIcon };

export default function Hero({ profile }) {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  const photo = mediaUrl(profile.profile_image) || defaultProfileImage;

  return (
    <section className="relative overflow-hidden pt-6 pb-2 sm:pt-8 sm:pb-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(61,217,193,0.14), transparent 42%), radial-gradient(circle at 85% 5%, rgba(61,217,193,0.10), transparent 38%)',
        }}
      />
      <div className="section relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center">
        {/* Text column */}
        <div>
         
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            <AnimatedName name={profile.full_name} variant="reveal" />
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-semibold text-accent">
            {profile.title_primary} <span className="text-slate-500 mx-2">/</span> {profile.title_secondary}
          </p>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button onClick={() => scrollTo('#projects')} className="btn btn-primary">
              View Projects <ArrowRight className="h-4 w-4" />
            </button>
            <a href="/SivaKumar_Resume.pdf" download="SivaKumar_Resume.pdf" className="btn btn-outline">
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <button onClick={() => scrollTo('#contact')} className="btn btn-outline">
              <Mail className="h-4 w-4" /> Contact Me
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {(profile.social_links || []).map((link) => {
              const Icon = SOCIAL_ICON[link.platform] || Mail;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-slate-300 hover:border-accent hover:text-accent transition-colors"
                  aria-label={link.platform}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Photo column */}
        <div className="relative mx-auto lg:mx-0">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent blur-2xl" />
          <div className="relative w-64 sm:w-80 lg:w-full max-w-sm aspect-[4/5] rounded-[1.75rem] border border-ink-600 bg-ink-900 overflow-hidden shadow-card">
            <img
              src={photo}
              alt={profile.full_name}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[1.75rem]" />
          </div>

          {/* <div className="absolute -bottom-5 -left-5 sm:-left-8 card px-4 py-3 flex items-center gap-3 bg-ink-900/95">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono text-sm font-bold">
              {'{ }'}
            </span>
            <div className="leading-tight">
              <p className="text-xs text-slate-500">Primary stack</p>
              <p className="text-sm font-semibold text-white">MERN</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
