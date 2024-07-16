const soundEffects = {
  choice: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'),
  win: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'),
  lose: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.mp3'),
  tie: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-neutral-bot-pinball-tone-3137.mp3'),
  powerUp: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-fairy-arcade-sparkle-866.mp3'),
  achievement: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'),
  backgroundMusic: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-level-music-689.mp3'),
};

export const playSound = (effect) => {
  soundEffects[effect].play();
};

export const playBackgroundMusic = () => {
  soundEffects.backgroundMusic.loop = true;
  soundEffects.backgroundMusic.volume = 0.5;
  soundEffects.backgroundMusic.play();
};