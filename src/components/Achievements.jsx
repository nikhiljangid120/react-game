/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Achievements = ({ achievements }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <AnimatePresence>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-yellow-400 text-purple-600 px-4 py-2 rounded-full shadow-lg font-bold mb-2"
          >
            Achievement Unlocked: {achievement}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;