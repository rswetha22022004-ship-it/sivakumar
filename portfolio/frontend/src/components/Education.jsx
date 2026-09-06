import { GraduationCap } from 'lucide-react';

export default function Education({ education }) {
  return (
    <section id="education" className="section">
      <h2 className="section-heading">Education</h2>

      {education?.length ? (
        <div className="mt-10 space-y-5">
          {education.map((edu) => (
            <div key={edu.id} className="card p-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-white font-bold">{edu.degree}</h3>
                <p className="text-accent text-sm">{edu.institution} · {edu.year}</p>
                {edu.description && (
                  <p className="mt-2 text-sm text-slate-400">{edu.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-slate-500 text-sm">
          Education details will appear here once added from Django Admin.
        </p>
      )}
    </section>
  );
}
