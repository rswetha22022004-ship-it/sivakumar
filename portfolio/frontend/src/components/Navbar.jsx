import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-center container-px">
        <div
          className={`hidden md:flex items-center gap-8 rounded-full border px-7 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 ease-out motion-reduce:transition-none ${
            scrolled
              ? 'border-white/15 bg-[#0d1b20]/95'
              : 'border-white/10 bg-[#0d1b20]/90'
          }`}
        >
          {LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="group relative text-sm font-medium text-slate-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white motion-reduce:transform-none motion-reduce:transition-none"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 ease-out group-hover:w-full motion-reduce:transition-none" />
            </button>
          ))}
        </div>

        <button
          className="absolute right-6 text-slate-200 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-950 border-t border-ink-700">
          <div className="flex flex-col px-6 py-4 gap-4">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left text-slate-300 hover:text-accent"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
