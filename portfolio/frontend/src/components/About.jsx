import { Building2, MapPin } from 'lucide-react';
import TextGenerateEffect from './TextGenerateEffect';

export default function About({ profile }) {
  return (
    <section id="about" className="section">
      <TextGenerateEffect as="h2" className="section-heading">About Me</TextGenerateEffect>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <TextGenerateEffect as="p" className="lg:col-span-2 text-slate-400 leading-relaxed text-base sm:text-lg">
          {profile.about_text}
        </TextGenerateEffect>

        <div
          className="skills-hover-card card relative overflow-hidden p-6 space-y-4 h-fit"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
            event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
          }}
        >
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <TextGenerateEffect as="p" className="text-sm text-slate-500">Currently working at</TextGenerateEffect>
              <TextGenerateEffect as="p" className="text-white font-semibold">{profile.current_company}</TextGenerateEffect>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <TextGenerateEffect as="p" className="text-sm text-slate-500">Location</TextGenerateEffect>
              <TextGenerateEffect as="p" className="text-white font-semibold">{profile.location}</TextGenerateEffect>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
