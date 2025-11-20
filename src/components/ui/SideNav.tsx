import { useState, useEffect } from 'react';
import './SideNav.scss';

const sections = [
  { id: 'hero', label: '00' },
  { id: 'about', label: '01' },
  { id: 'experience', label: '02' },
  { id: 'skills', label: '03' },
  { id: 'projects', label: '04' },
  { id: 'contact', label: '05' },
];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="side-nav">
      <div className="nav-track">
        {sections.map((section) => (
          <a 
            key={section.id}
            href={`#${section.id}`}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
          >
            <span className="label">{section.label}</span>
            <div className="indicator"></div>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;
