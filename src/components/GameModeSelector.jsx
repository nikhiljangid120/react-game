/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

const GameModeSelector = ({ setGameMode, setGameState }) => {
  const modes = [
    { name: 'Best of 3', type: 'bestOf', value: 3 },
    { name: 'Best of 5', type: 'bestOf', value: 5 },
    { name: 'First to 10', type: 'firstTo', value: 10 },
    { name: 'Free to Play', type: 'freeToPlay', value: 5 },
  ];

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    setGameState('playing');
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Select Game Mode</h2>
      <div className="grid grid-cols-2 gap-4">
        {modes.map((mode) => (
          <motion.button
            key={mode.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-6 py-3 rounded-full shadow-lg font-bold"
            onClick={() => handleModeSelect(mode)}
          >
            {mode.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;