// utils/AILogic.js
const AILogic = {
    makeChoice: (playerChoice, score) => {
      const choices = ['rock', 'paper', 'scissors'];
      const playerPattern = AILogic.analyzePlayerPattern(score);
      
      if (playerPattern === 'aggressive') {
        // Counter aggressive play
        return AILogic.getCounterMove(playerChoice);
      } else if (playerPattern === 'defensive') {
        // Exploit defensive play
        return choices[Math.floor(Math.random() * choices.length)];
      } else {
        // Use weighted random choice based on player's history
        return AILogic.getWeightedRandomChoice(score);
      }
    },
  
    analyzePlayerPattern: (score) => {
      const totalGames = score.player + score.ai;
      if (totalGames < 5) return 'neutral';
      
      const winRate = score.player / totalGames;
      if (winRate > 0.6) return 'aggressive';
      if (winRate < 0.4) return 'defensive';
      return 'neutral';
    },
  
    getCounterMove: (playerChoice) => {
      const counterMoves = {
        rock: 'paper',
        paper: 'scissors',
        scissors: 'rock',
      };
      return counterMoves[playerChoice];
    },
  
    getWeightedRandomChoice: (score) => {
      const choices = ['rock', 'paper', 'scissors'];
      const weights = [
        1 + score.player * 0.1,
        1 + score.ai * 0.1,
        1 + Math.abs(score.player - score.ai) * 0.1,
      ];
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      const randomValue = Math.random() * totalWeight;
      
      let weightSum = 0;
      for (let i = 0; i < choices.length; i++) {
        weightSum += weights[i];
        if (randomValue <= weightSum) {
          return choices[i];
        }
      }
      return choices[Math.floor(Math.random() * choices.length)];
    },
  };
  
  export default AILogic;