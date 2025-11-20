import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './ProjectModal.scss';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal-content"
            layoutId={`project-${project.title}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}>×</button>
            
            <div className="modal-header">
              <span className="category">{project.category}</span>
              <h2>{project.title}</h2>
            </div>

            <div className="modal-body">
              <div className="image-container">
                <img src={project.image} alt={project.title} />
              </div>
              
              <div className="info-section">
                <h3>MISSION BRIEF</h3>
                <p>{project.description}</p>
                
                <div className="technologies">
                  <h3>TECH STACK</h3>
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
                  VISIT PROJECT →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
