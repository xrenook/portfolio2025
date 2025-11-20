import { motion } from 'framer-motion';
import './GradientBlob.scss';

interface GradientBlobProps {
  colors: string[];
  className?: string;
}

const GradientBlob = ({ colors, className = '' }: GradientBlobProps) => {
  const gradient = `linear-gradient(45deg, ${colors.join(', ')})`;

  return (
    <motion.div 
      className={`gradient-blob ${className}`}
      style={{ background: gradient }}
      animate={{
        scale: [1, 1.2, 0.9, 1.1, 1],
        rotate: [0, 90, 180, 270, 360],
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%"
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default GradientBlob;
