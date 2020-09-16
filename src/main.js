'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

function getRandom() {
  let time = Math.floor(Math.random() * 11) + 1;
  let star = Math.floor(Math.random() * time * 2) + 1;
  let blackhole = Math.floor(Math.random() * time * 2) + 1;
  return [time, star, blackhole];
}

const gameInfo = getRandom();

const game = new GameBuilder()
  .gameDuration(gameInfo[0])
  .starCount(gameInfo[1])
  .blackholeCount(gameInfo[2])
  .build();

game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Replay';
      break;
    case Reason.win:
      sound.playWin();
      message = 'YOU WON';
      break;
    case Reason.lose:
      sound.playBlackhole();
      message = 'YOU LOST';
      break;
    default:
      throw new Error('Error');
  }
  gameFinishePopup.showWithText(message);
});

// Pop Up
const gameFinishePopup = new PopUp();
gameFinishePopup.setClickListener(() => {
  game.start();
});
