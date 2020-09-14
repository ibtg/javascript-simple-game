'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

// Pop Up
const gameFinishePopup = new PopUp();
gameFinishePopup.setClickListener(() => {
  game.start();
});

const game = new GameBuilder()
  .gameDuration(5)
  .starCount(3)
  .blackholeCount(3)
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
