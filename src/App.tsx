import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import News from './sections/News';
import Research from './sections/Research';
import Publications from './sections/Publications';
import Footer from './sections/Footer';
import MoodPage from './pages/MoodPage';
import BlogPage from './pages/BlogPage';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [route, setRoute] = useState<'home' | 'moods' | 'blogs'>(() => {
    const hash = window.location.hash;
    if (hash === '#/moods') return 'moods';
    if (hash === '#/blogs') return 'blogs';
    return 'home';
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/moods') {
        setRoute('moods');
      } else if (hash === '#/blogs') {
        setRoute('blogs');
      } else {
        setRoute('home');
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === 'moods') return <MoodPage />;
  if (route === 'blogs') return <BlogPage />;

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
