'use strict';

import { ItemType, Field } from './field.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this; // return class
  }
  starCount(num) {
    this.starCount = num;
    return this;
  }
  blackholeCount(num) {
    this.blckholeCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.starCount, this.blckholeCount);
  }
}

class Game {
  constructor(gameDuration, starCount, blackholeCount) {
    this.gameDuration = gameDuration;
    this.starCount = starCount;
    this.blackholeCount = blackholeCount;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gaemBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.gaemBtn.addEventListener('click', () => {
      if (this.started) {
        //if started is true, stop game
        this.stop(Reason.cancel);
      } else {
        //if started is false, start game
        this.start();
      }
    });
    this.gameField = new Field(starCount, blackholeCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    // if game is over, user cannot click game character
    if (!this.started) {
      return;
    }

    if (item === ItemType.star) {
      this.score++;
      this.updateScoreBoard();

      // if no items are left, stop game with win state
      if (this.score === this.starCount) {
        this.stop(Reason.win);
      }
      // if user click blackhole, game over with lose state
    } else if (item === ItemType.blackhole) {
      this.stop(Reason.lose);
    }
  };

  // show how many items are left
  updateScoreBoard() {
    this.gameScore.innerText = this.starCount - this.score;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(reason);
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.starCount;
    this.gameField.init();
  }

  // if game started, show stop button
  showStopButton() {
    const icon = this.gaemBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gaemBtn.style.visibility = 'visible';
  }

  // if game started, show time and score
  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.starCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  // show mintuts and seconds afer starting game
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  hideGameButton() {
    this.gaemBtn.style.visibility = 'hidden';
  }
}
