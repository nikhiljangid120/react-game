/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

const Result = ({ playerChoice, aiChoice, result, resetGame }) => {
  const resultText = {
    win: 'You Win!',
    lose: 'You Lose!',
    tie: "It's a Tie!",
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-4">{resultText[result]}</h2>
      <div className="flex justify-center items-center space-x-8 mb-8">
        <div>
          <p>You chose:</p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-6xl"
          >
            {playerChoice === 'rock' && '🪨'}
            {playerChoice === 'paper' && '📄'}
            {playerChoice === 'scissors' && '✂️'}
          </motion.div>
        </div>
        <div>
          <p>AI chose:</p>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 0.5 }}
            className="text-6xl"
          >
            {aiChoice === 'rock' && '🪨'}
            {aiChoice === 'paper' && '📄'}
            {aiChoice === 'scissors' && '✂️'}
          </motion.div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-purple-600 px-6 py-2 rounded-full shadow-lg font-bold"
        onClick={resetGame}
      >
        Play Again
      </motion.button>
    </motion.div>
  );
};

export default Result;