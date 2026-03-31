import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import News from './sections/News';
import Research from './sections/Research';
import Publications from './sections/Publications';
import Footer from './sections/Footer';

import './App.css';

function App() {
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
