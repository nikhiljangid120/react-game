/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { motion } from 'framer-motion';

const Leaderboard = ({ scores }) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {sortedScores.map((entry, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Leaderboard;