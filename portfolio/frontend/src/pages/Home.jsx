import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Home() {
  const { profile, experience, skills, projects, education, loading, usingFallback } = usePortfolioData();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="page-entrance">
      <Hero profile={profile} />
      <About profile={profile} />
      <Experience experience={experience} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Education education={education} />
      <Contact profile={profile} />
    </div>
  );
}
