const starSound = new Audio(
  'https://raw.githubusercontent.com/ibtg/javascript-simple-game/master/sound/star.mp3'
);
const blackholeSound = new Audio(
  'https://raw.githubusercontent.com/ibtg/javascript-simple-game/master/sound/blackhole.mp3'
);
const winSound = new Audio(
  'https://raw.githubusercontent.com/ibtg/javascript-simple-game/master/sound/win.mp3'
);
const bgSound = new Audio(
  'https://raw.githubusercontent.com/ibtg/javascript-simple-game/master/sound/background.mp3'
);

export function playStar() {
  playSound(starSound);
}

export function playBlackhole() {
  playSound(blackholeSound);
}

export function playWin() {
  playSound(winSound);
}

export function playBackground() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
