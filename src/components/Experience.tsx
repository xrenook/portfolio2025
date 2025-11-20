import { motion } from 'framer-motion';
import { useState } from 'react';
import './Experience.scss';

const experienceData = [
  {
    role: "Front-End Developer",
    company: "David Jones",
    period: "2022 - Present",
    details: [
      "Sole developer at David Jones with the Design and Experience team, focusing on CRO led initiatives across the entire e-commerce journey from marketing to final mile deliver.",
      "Notable tests include removing the need for a customer to add to bag to see the discounted price of a product. This required a complex matrix to determine a final price client side, with the most successful variant increasing conversion by over 4% during the busiest sales of the year.",
      "Worked closely with the trade teams to assist with implementing ideas to assist them with meeting KPI targets, as well as with the Product Designer and Contact centres to solve bugs, NPS and customer feedback areas and breakdowns in experience."
    ]
  },
  {
    role: "Front-End Developer",
    company: "Mo Works",
    period: "2019 - 2022",
    details: [
      "Collaborated with stakeholders to confirm creative proposals and design best practices.",
      "Managed full-cycle design tasks, from conception to completion, maintaining brand and UX guidelines.",
      "Delivered 10+ projects annually, from research and design through testing and implementation.",
      "Developed user-focused visuals and interactive components using HTML, CSS, and JavaScript.",
      "Crafted SEO and responsive design strategies to improve site visibility and engagement."
    ]
  }
];

const Experience = () => {
  const [topCard, setTopCard] = useState(0);

  return (
    <section className="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2>MISSION LOG</h2>
        </div>

        <div className="stacked-cards">
          {experienceData.map((exp, index) => (
            <motion.div 
              key={index}
              className={`mission-card ${topCard === index ? 'top' : ''}`}
              onMouseEnter={() => setTopCard(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              style={{ zIndex: topCard === index ? 10 : index }}
            >
              <div className="mission-content">
                <div className="mission-header">
                  <h3>{exp.role}</h3>
                  <span className="company">@ {exp.company}</span>
                </div>
                <span className="period">{exp.period}</span>
                <ul>
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
