/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';
import GameModeSelector from './components/GameModeSelector';
import PowerUps from './components/PowerUps';
import Achievements from './components/Achievements';
import PlayerNameInput from './components/PlayerNameInput';
import Leaderboard from './components/Leaderboard';
import AILogic from './utils/AILogic';
import { playSound } from './utils/soundEffects';

const App = () => {
  const [gameState, setGameState] = useState('name');
  const [playerName, setPlayerName] = useState('');
  const [playerChoice, setPlayerChoice] = useState(null);
  const [aiChoice, setAiChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [gameMode, setGameMode] = useState(null);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [powerUps, setPowerUps] = useState({
    doublePoints: 1,
    blockAI: 1,
    revealAI: 1,
  });
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    setLeaderboard(storedLeaderboard);
  }, []);

  useEffect(() => {
    if (playerChoice) {
      playSound('choice');
      const aiMove = AILogic.makeChoice(playerChoice, score);
      setAiChoice(aiMove);
      const gameResult = determineWinner(playerChoice, aiMove);
      setResult(gameResult);
      updateScore(gameResult);
      setRoundsPlayed(prev => prev + 1);
      setGameState('result');
      checkAchievements();
    }
  }, [playerChoice]);

  useEffect(() => {
    if (gameMode) {
      if (gameMode.type === 'bestOf') {
        const targetScore = Math.ceil(gameMode.value / 2);
        if (score.player === targetScore || score.ai === targetScore) {
          setGameState('gameOver');
          updateLeaderboard();
        }
      } else if (gameMode.type === 'firstTo') {
        if (score.player === gameMode.value || score.ai === gameMode.value) {
          setGameState('gameOver');
          updateLeaderboard();
        }
      }
    }
  }, [score, gameMode]);

  const determineWinner = (player, ai) => {
    if (player === ai) return 'tie';
    if (
      (player === 'rock' && ai === 'scissors') ||
      (player === 'paper' && ai === 'rock') ||
      (player === 'scissors' && ai === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const updateScore = (result) => {
    if (result === 'win') {
      const points = powerUps.doublePoints > 0 ? 2 : 1;
      setScore(prev => ({ ...prev, player: prev.player + points }));
      setPowerUps(prev => ({ ...prev, doublePoints: Math.max(0, prev.doublePoints - 1) }));
      playSound('win');
    } else if (result === 'lose') {
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      playSound('lose');
    } else {
      playSound('tie');
    }
  };

  const resetGame = () => {
    setGameState('mode');
    setPlayerChoice(null);
    setAiChoice(null);
    setResult(null);
    setScore({ player: 0, ai: 0 });
    setRoundsPlayed(0);
    setGameMode(null);
    setPowerUps({
      doublePoints: 1,
      blockAI: 1,
      revealAI: 1,
    });
  };

  const checkAchievements = () => {
    const newAchievements = [];
    if (roundsPlayed === 10 && !achievements.includes('Novice')) {
      newAchievements.push('Novice');
    }
    if (score.player === 5 && !achievements.includes('Winner')) {
      newAchievements.push('Winner');
    }
    if (score.player === 10 && !achievements.includes('Champion')) {
      newAchievements.push('Champion');
    }
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      playSound('achievement');
    }
  };

  const usePowerUp = (powerUp) => {
    if (powerUps[powerUp] > 0) {
      setPowerUps(prev => ({ ...prev, [powerUp]: prev[powerUp] - 1 }));
      playSound('powerUp');
      // Implement power-up effects
      if (powerUp === 'blockAI') {
        // Implement AI blocking logic
      } else if (powerUp === 'revealAI') {
        // Implement AI choice reveal logic
      }
    }
  };

  const handleNameSubmit = (name) => {
    setPlayerName(name);
    setGameState('mode');
  };

  const handleReset = () => {
    setPlayerName('');
    setGameState('name');
  };

  const updateLeaderboard = () => {
    const playerScore = score.player;
    const newLeaderboard = [...leaderboard];
    const playerIndex = newLeaderboard.findIndex(entry => entry.name === playerName);

    if (playerIndex !== -1) {
      newLeaderboard[playerIndex].score = Math.max(newLeaderboard[playerIndex].score, playerScore);
    } else {
      newLeaderboard.push({ name: playerName, score: playerScore });
    }

    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
  };

  const getBackgroundColor = () => {
    if (result === 'win') return 'bg-green-500';
    if (result === 'lose') return 'bg-red-500';
    if (result === 'tie') return 'bg-yellow-500';
    return 'bg-gradient-to-br from-purple-600 to-blue-500';
  };

  return (
    <div className={`min-h-screen ${getBackgroundColor()} text-white transition-colors duration-500`}>
      <Header score={score} gameMode={gameMode} playerName={playerName} />
      <AnimatePresence mode="wait">
        <motion.div
          key={gameState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          {gameState === 'name' && (
            <PlayerNameInput onSubmit={handleNameSubmit} />
          )}
          {gameState === 'mode' && (
            <GameModeSelector setGameMode={setGameMode} setGameState={setGameState} />
          )}
          {(gameState === 'playing' || gameState === 'result') && (
            <>
              <Game
                gameState={gameState}
                setPlayerChoice={setPlayerChoice}
                playerChoice={playerChoice}
                aiChoice={aiChoice}
                result={result}
                resetGame={() => setGameState('playing')}
              />
              <PowerUps powerUps={powerUps} usePowerUp={usePowerUp} />
            </>
          )}
          {gameState === 'gameOver' && (
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                {score.player > score.ai ? 'You Win!' : 'AI Wins!'}
              </h2>
              <p className="text-2xl mb-4">
                Final Score: {playerName} {score.player} - {score.ai} AI
              </p>
              <button
                className="bg-white text-purple-600 px-6 py-2 rounded-full shadow-lg font-bold"
                onClick={resetGame}
              >
                Play Again
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-full shadow-lg font-bold mt-4"
                onClick={handleReset}
              >
                Reset Username
              </button>
            </div>
          )}
          <Leaderboard scores={leaderboard} />
        </motion.div>
      </AnimatePresence>
      <Achievements achievements={achievements} />
      <Footer />
    </div>
  );
};

export default App;
