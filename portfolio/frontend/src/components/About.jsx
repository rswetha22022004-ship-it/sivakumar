import { Building2, MapPin } from 'lucide-react';

export default function About({ profile }) {
  return (
    <section id="about" className="section">
      <h2 className="section-heading">About Me</h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <p className="lg:col-span-2 text-slate-400 leading-relaxed text-base sm:text-lg">
          {profile.about_text}
        </p>

        <div className="card p-6 space-y-4 h-fit">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm text-slate-500">Currently working at</p>
              <p className="text-white font-semibold">{profile.current_company}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm text-slate-500">Location</p>
              <p className="text-white font-semibold">{profile.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
