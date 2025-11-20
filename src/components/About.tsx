import { motion } from 'framer-motion';
import './About.scss';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2>PLAYER PROFILE</h2>
        </div>

        <div className="profile-grid">
          <motion.div 
            className="profile-card main-stats"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="card-header">
              <h3>BIO_DATA</h3>
              <div className="tech-deco"></div>
            </div>
            <p>
              Front-End & Growth / CRO Engineer with <span className="highlight">5+ years</span> years of experience delivering scalable, performant, and accessible web applications across SaaS, retail, and e-commerce platforms. Expert in React, TypeScript, design systems, front-end architecture, and modern tooling.
            </p>
            <br/>
            <p>
              I lead end-to-end delivery—from discovery, design collaboration, and technical scoping to implementation, testing, and release—while driving engineering excellence through component reusability, code quality, and technical mentorship.
With a strong CRO and experimentation background, I bring a product-driven mindset, using analytics, A/B testing, and user insights to ship measurable improvements that enhance user experience and business outcomes.
            </p>
          </motion.div>

          <motion.div 
            className="profile-card secondary-stats"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <h3>SPECIALIZATION</h3>
              <div className="tech-deco"></div>
            </div>
            <div className="radar-chart">
              <svg viewBox="0 0 200 200" className="radar-svg">
                {/* Background hexagon grid */}
                <polygon points="100,20 173,60 173,140 100,180 27,140 27,60" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                <polygon points="100,40 156,70 156,130 100,160 44,130 44,70" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                <polygon points="100,60 139,80 139,120 100,140 61,120 61,80" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                
                {/* Axis lines */}
                <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                <line x1="100" y1="100" x2="173" y2="60" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                <line x1="100" y1="100" x2="173" y2="140" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                <line x1="100" y1="100" x2="100" y2="180" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                <line x1="100" y1="100" x2="27" y2="140" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                <line x1="100" y1="100" x2="27" y2="60" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                
                {/* Data polygon - values based on bio */}
                <polygon 
                  points="100,28 165,64 165,136 100,164 43,128 43,64" 
                  fill="var(--accent-orange)" 
                  fillOpacity="0.2" 
                  stroke="var(--accent-orange)" 
                  strokeWidth="2"
                  className="data-shape"
                />
                
                {/* Data points */}
                <circle cx="100" cy="28" r="4" fill="var(--accent-orange)"/>
                <circle cx="165" cy="64" r="4" fill="var(--accent-orange)"/>
                <circle cx="165" cy="136" r="4" fill="var(--accent-orange)"/>
                <circle cx="100" cy="164" r="4" fill="var(--accent-orange)"/>
                <circle cx="43" cy="128" r="4" fill="var(--accent-orange)"/>
                <circle cx="43" cy="64" r="4" fill="var(--accent-orange)"/>
              </svg>
              
              <div className="radar-labels">
                <span className="label label-top">Development</span>
                <span className="label label-top-right">Design Systems</span>
                <span className="label label-bottom-right">CRO/Testing</span>
                <span className="label label-bottom">Architecture</span>
                <span className="label label-bottom-left">Mentorship</span>
                <span className="label label-top-left">Product</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
