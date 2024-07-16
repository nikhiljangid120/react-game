/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

const PowerUps = ({ powerUps, usePowerUp }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Power-ups</h3>
      <div className="flex space-x-4">
        {Object.entries(powerUps).map(([name, count]) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full shadow-lg font-bold ${
              count > 0 ? 'bg-yellow-400 text-purple-600' : 'bg-gray-400 text-gray-600'
            }`}
            onClick={() => usePowerUp(name)}
            disabled={count === 0}
          >
            {name} ({count})
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PowerUps;