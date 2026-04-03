import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import News from './sections/News';
import Research from './sections/Research';
import Publications from './sections/Publications';
import Footer from './sections/Footer';
import MoodPage from './pages/MoodPage';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [isMoodPage, setIsMoodPage] = useState(window.location.hash === '#/moods');

  useEffect(() => {
    const onHashChange = () => {
      setIsMoodPage(window.location.hash === '#/moods');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (isMoodPage) {
    return <MoodPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#faf8f5]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* News Section */}
        <News />

        {/* Research Areas Section */}
        <Research />

        {/* Publications Section */}
        <Publications />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
