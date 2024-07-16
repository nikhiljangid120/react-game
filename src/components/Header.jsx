/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ score, gameMode, playerName }) => {
  return (
    <header className="bg-white bg-opacity-10 backdrop-blur-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rock Paper Scissors</h1>
        <div className="flex items-center space-x-4">
          {playerName && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-semibold"
            >
              Player: {playerName}
            </motion.div>
          )}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-white text-purple-600 px-4 py-2 rounded-full shadow-lg"
          >
            <span className="font-bold">Score:</span> You {score.player} - {score.ai} AI
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;