import { motion } from 'framer-motion';
const CustomAnimate: React.FC<{
  children: React.ReactNode;
  enable: boolean;
}> = ({ children, enable }) => {
  return enable ? (
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 2.2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 0.1,
        delay: 1,
      }}
    >
      {children}
    </motion.div>
  ) : (
    <>{children}</>
  );
};
export default CustomAnimate;
