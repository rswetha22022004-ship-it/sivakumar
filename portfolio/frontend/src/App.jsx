import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import usePortfolioData from './hooks/usePortfolioData';

function Layout({ children }) {
  const { profile } = usePortfolioData();
  return (
    <div className="site-spotlight min-h-screen flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <div className="relative z-10">
        <Footer profile={profile} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
      </Routes>
    </Layout>
  );
}
