/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const Choice = ({ choice, onClick }) => {
  const icons = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="bg-white bg-opacity-20 backdrop-blur-md text-white rounded-full p-6 shadow-lg text-6xl transition-all duration-300 hover:bg-opacity-30"
      onClick={onClick}
    >
      {icons[choice]}
    </motion.button>
  );
};

export default Choice;