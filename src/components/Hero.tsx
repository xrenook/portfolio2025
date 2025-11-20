import { motion } from 'framer-motion';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
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
          <h1 data-text="A FUTURE WORTH DEVELOPER">
            A FUTURE WORTH DEVELOPER
          </h1>
        </div>

        <div className="hero-subtitle">
          <p>TEAM-BASED ACTION • START NOW</p>
        </div>

        <div className="cta-container">
          <a href="mailto:sendtoxren@gmail.com" className="play-now-btn">CONTACT NOW</a>
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
