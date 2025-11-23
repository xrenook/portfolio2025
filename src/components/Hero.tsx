import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import Hero3DScene from "./3D/Hero3DScene";
import useMousePosition from "../hooks/useMousePosition";
import "./Hero.scss";

const Hero = () => {
  const mousePosition = useMousePosition();

  // Normalize mouse position for 3D
  const normalizedMouse = {
    x: (mousePosition.x / window.innerWidth) * 2 - 1,
    y: -(mousePosition.y / window.innerHeight) * 2 + 1,
  };

  return (
    <section className="hero">
      {/* 3D Background Canvas */}
      <div className="hero-3d-canvas">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d1ff" />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#ff0055"
            />
            <Hero3DScene mousePosition={normalizedMouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="role">FRONT-END / CRO </span>
          <span className="status">ENGINEER</span>
        </motion.div>
        <div className="hero-logo">
          <span className="logo-text">XIANG REN</span>
        </div>

        <div className="title-container">
          <h1 data-text="A FUTURE WORTH DEVELOPER">A FUTURE WORTH DEVELOPER</h1>
        </div>

        <div className="hero-subtitle">
          <p>TEAM-BASED ACTION • START NOW</p>
        </div>

        <div className="cta-container">
          <a href="mailto:sendtoxren@gmail.com" className="play-now-btn">
            CONTACT NOW
          </a>
        </div>

        <div className="platform-icons">
          <span>REACT</span>
          <span>TYPESCRIPT</span>
          <span>A/B TESTING</span>
          <span>MICROSERVICE</span>
          <span>GRAPHQL</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
