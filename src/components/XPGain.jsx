import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const XPGain = ({ amount, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [-20, -40, -60],
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration: 1,
        times: [0, 0.2, 0.8, 1]
      }}
      onAnimationComplete={onComplete}
      className="fixed top-16 right-8 z-50 flex items-center gap-1 font-bold text-yellow-400 text-lg pointer-events-none"
      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
    >
      <span>+{amount}</span>
      <span className="text-sm">XP</span>
    </motion.div>
  );
};

export default XPGain;