import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

const projectsData: Project[] = [
  {
    title: "David Jones Checkout Prototype",
    category: "E-COMMERCE",
    description: "New design and flow for bag + checkout. Serves for Maze to apply UX/UI test for real coming customers to guide new headless transformation.",
    image: "/assets/images/works/work0.png",
    link: "https://checkout-djexperiment.netlify.app/",
    technologies: ["ReactJS", "Design System", "Vite", "react-toastify"]
  },
  {
    title: "David Jones New Header Demo",
    category: "UX/UI PROTOTYPE",
    description: "New design with 2 layers of mega menu demo. Serves for Maze to apply UX/UI test for real coming customers.",
    image: "/assets/images/works/work1.png",
    link: "https://davidjonesux-navigation.netlify.app",
    technologies: ["NextJS", "Framer Motion", "Tailwind CSS", "react-scroll-progress-bar"]
  },
  {
    title: "David Jones Design System",
    category: "DESIGN SYSTEM",
    description: "Design system serves as a fundamental framework to ensure consistency across content pieces to app experiences within David Jones' digital ecosystem.",
    image: "/assets/images/works/work2.png",
    link: "https://design-system-by-storyblok.netlify.app/",
    technologies: ["NextJS", "Storyblok CMS", "AOS", "Tailwind CSS"]
  },
  {
    title: "UPPAREL",
    category: "E-COMMERCE",
    description: "Australia and New Zealand's leading textile recycling company. Trusted and transparent, creating change for future generations.",
    image: "/assets/images/works/work3.png",
    link: "https://upparel.com.au/",
    technologies: ["Wordpress", "Amazon Web Server", "CSS", "eCommerce"]
  },
  {
    title: "Original Campus",
    category: "EDUCATION",
    description: "A new direction. A fresh perspective on education. Empowering you to become what you want to be.",
    image: "/assets/images/works/work4.png",
    link: "https://originalcampus.edu.au/",
    technologies: ["PHP", "SQL database", "Amazon Web Server", "Perch CMS", "Jotform", "Hubspot"]
  },
  {
    title: "Mo Works Creative Agency",
    category: "AGENCY",
    description: "Full-service creative agency based in Melbourne and Adelaide. Delivering bespoke marketing, branding, and digital solutions.",
    image: "/assets/images/works/work5.png",
    link: "https://moworks.com.au/",
    technologies: ["Angular", "Strapi CMS", "Amazon Web Server", "Aos", "Matter.js", "Mailchimp"]
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.matchMedia();

    ctx.add("(min-width: 769px)", () => {
      const slides = gsap.utils.toArray(".horizontal-panel");
      
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${slides.length * 100}%`,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section horizontal-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2>MAP SELECTION</h2>
        </div>

        <div className="projects-wrapper">
          {projectsData.map((project, index) => (
            <div key={index} className="horizontal-panel project-slide">
              <div className="project-card">
                <div className="card-image-container">
                  <img src={project.image} alt={project.title} />
                </div>
                
                <div className="card-content">
                  <div className="card-header">
                    <span className="category">{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  
                  <p className="description">{project.description}</p>
                  
                  <div className="technologies">
                    <h4>TECH STACK</h4>
                    <div className="tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="visit-btn"
                  >
                    TAKE A LOOK →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
