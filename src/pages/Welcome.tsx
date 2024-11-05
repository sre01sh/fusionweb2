import React from 'react';
import styles from './Welcome.less';
import { motion } from 'framer-motion';

export default () => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.box}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <span style={{ color: '#3575f2' }}>
          引领未来, <span style={{ color: 'red' }}> 释放数据的力量</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2.5,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        style={{ maxHeight: '350px' }}
      >
        <img width={'100%'} height={'100%'} src="/homepage.png" />
      </motion.div>
    </div>
  );
};
