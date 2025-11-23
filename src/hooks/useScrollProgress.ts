import { useScroll, useTransform, MotionValue } from 'framer-motion';

export const useScrollProgress = (): MotionValue<number> => {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
};

export const useScrollTransform = (
  inputRange: number[],
  outputRange: number[]
): MotionValue<number> => {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, inputRange, outputRange);
};
