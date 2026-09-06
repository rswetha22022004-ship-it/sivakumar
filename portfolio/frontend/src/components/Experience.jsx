import { Briefcase, CheckCircle2 } from 'lucide-react';

export default function Experience({ experience }) {
  if (!experience?.length) return null;

  return (
    <section id="experience" className="section">
      <h2 className="section-heading">Experience</h2>

      <div className="mt-10 space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.designation}</h3>
                  <p className="text-accent font-medium">{exp.company}</p>
                  <p className="text-sm text-slate-500">{exp.location}</p>
                </div>
              </div>
              <span className="badge">
                {exp.start_date ? `${exp.start_date} – ${exp.end_date}` : exp.end_date}
              </span>
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {exp.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
