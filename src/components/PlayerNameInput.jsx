/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PlayerNameInput = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-6">Enter Your Name</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white bg-opacity-20 backdrop-blur-md text-white rounded-full px-4 py-2 mb-4 w-64 text-center focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Your Name"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 px-6 py-2 rounded-full shadow-lg font-bold"
          type="submit"
        >
          Start Game
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PlayerNameInput;