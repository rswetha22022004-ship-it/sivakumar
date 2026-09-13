import TextGenerateEffect from './TextGenerateEffect';

export default function Skills({ skills }) {
  if (!skills?.length) return null;

  return (
    <section id="skills" className="section">
      <TextGenerateEffect as="h2" className="section-heading">Technical Skills</TextGenerateEffect>
      <TextGenerateEffect as="p" className="mt-3 max-w-2xl text-slate-500">
        React.js, Node.js, Express.js and MongoDB form the core MERN stack —
        with Django and Python as additional backend experience.
      </TextGenerateEffect>

      <div className="skills-hover-grid mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((category) => (
          <div
            key={category.id}
            className="skills-hover-card card group relative overflow-hidden p-6"
            onMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
              event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
            }}
          >
            <div className="relative z-10">
              <TextGenerateEffect as="h3" className="mb-4 text-sm font-mono uppercase tracking-widest text-accent">
                {category.name}
              </TextGenerateEffect>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <TextGenerateEffect
                    as="span"
                    key={skill.id}
                    className={`badge ${skill.is_primary_stack ? 'badge-primary font-semibold' : ''}`}
                  >
                    {skill.name}
                  </TextGenerateEffect>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
