export default function AnimatedName({ name, variant = 'reveal', className = '' }) {
  const characters = [...name];

  return (
    <span className={className} aria-label={name}>
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          aria-hidden="true"
          className={`animated-name-char animated-name-${variant}`}
          style={{ animationDelay: `${index * 45}ms` }}
        >
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </span>
  );
}
