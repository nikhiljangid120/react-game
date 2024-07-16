/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import Choice from './Choice';
import Result from './Result';

const Game = ({ gameState, setPlayerChoice, playerChoice, aiChoice, result, resetGame }) => {
  const choices = ['rock', 'paper', 'scissors'];

  return (
    <div className="flex flex-col items-center justify-center">
      {gameState === 'playing' && (
        <>
          <h2 className="text-3xl font-bold mb-6">Make your choice</h2>
          <div className="grid grid-cols-3 gap-6">
            {choices.map((choice) => (
              <Choice key={choice} choice={choice} onClick={() => setPlayerChoice(choice)} />
            ))}
          </div>
        </>
      )}
      {gameState === 'result' && (
        <Result
          playerChoice={playerChoice}
          aiChoice={aiChoice}
          result={result}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};

export default Game;