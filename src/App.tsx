import { useEffect } from "react";
import Lenis from "lenis";
import Background from "./components/Background";
import TopBar from "./components/ui/TopBar";
import FloatingTitle from "./components/ui/FloatingTitle";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot/Chatbot";
import AnimatedCursor from "react-animated-cursor";
import "./styles/main.scss";

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="app">
      <AnimatedCursor
        innerSize={12}
        outerSize={40}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: "var(--accent-pink)",
        }}
        outerStyle={{
          border: "2px solid var(--accent-blue)",
          mixBlendMode: "difference",
        }}
      />
      <Background />
      <TopBar />
      <FloatingTitle />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Chatbot />
    </main>
  );
}

export default App;
