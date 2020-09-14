const starSound = new Audio('../sound/star.mp3');
const blackholeSound = new Audio('../sound/blackhole.mp3');
const winSound = new Audio('../sound/win.mp3');
const bgSound = new Audio('../sound/background.mp3');

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
