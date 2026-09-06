export default function Skills({ skills }) {
  if (!skills?.length) return null;

  return (
    <section id="skills" className="section">
      <h2 className="section-heading">Technical Skills</h2>
      <p className="mt-3 max-w-2xl text-slate-500">
        React.js, Node.js, Express.js and MongoDB form the core MERN stack —
        with Django and Python as additional backend experience.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((category) => (
          <div key={category.id} className="card p-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`badge ${skill.is_primary_stack ? 'badge-primary font-semibold' : ''}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
