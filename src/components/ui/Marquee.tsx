import { motion } from 'framer-motion';
import './Marquee.scss';

interface MarqueeProps {
  text: string;
  repeat?: number;
  duration?: number;
  reverse?: boolean;
}

const Marquee = ({ text, repeat = 4, duration = 20, reverse = false }: MarqueeProps) => {
  return (
    <div className="marquee-container">
      <motion.div 
        className="marquee-track"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="marquee-item">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
