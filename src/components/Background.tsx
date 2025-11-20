import { motion, useScroll, useTransform } from 'framer-motion';
import GradientBlob from './ui/GradientBlob';
import './Background.scss';

const Background = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="global-background">
      <div className="grid-overlay"></div>
      <motion.div 
        className="blob-container blob-1"
        style={{ top: '-10%', left: '-10%', y: y1, rotate }}
      >
        <GradientBlob 
          colors={['rgba(0, 209, 255, 0.4)', 'rgba(255, 0, 85, 0.4)']} 
        />
      </motion.div>
      
      <motion.div 
        className="blob-container blob-2"
        style={{ bottom: '-10%', right: '-10%', y: y2, rotate: useTransform(rotate, r => r * -1) }}
      >
        <GradientBlob 
          colors={['rgba(157, 0, 255, 0.4)', 'rgba(0, 209, 255, 0.4)']} 
        />
      </motion.div>
    </div>
  );
};

export default Background;
