import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Hero       from './sections/Hero';
import About      from './sections/About';
import Experience from './sections/Experience';
import Projects   from './sections/Projects';
import Skills     from './sections/Skills';
import Contact    from './sections/Contact';

export default function App() {
  return (
    <>
      {/* Noise texture overlay — purely decorative */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
