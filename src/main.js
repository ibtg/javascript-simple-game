'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';

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
      message = 'YOU WON';
      break;
    case Reason.lose:
      message = 'YOU LOST';
      break;
    default:
      throw new Error('Error');
  }
  gameFinishePopup.showWithText(message);
});
