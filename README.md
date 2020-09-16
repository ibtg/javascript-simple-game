## Project

- 시간안에 블랙홀 모양의 이미지를 피해 별 모양의 이미지를 모두 클릭하는 간단한 게임입니다.
- https://ibtg.github.io/javascript-simple-game/

---

## File Structure

```
├─ src
├─── field.js
├─── game.js
├─── main.js
├─── popup.js
├─── sounds.js
```

### field.js

- 게임에서 생성되는 별 모양의 이미지와 블랙홀 모양의 이미지가 화면에 생성되는 기능이 구현되어있습니다

- `setClickListener(onItemClick)`이라는 함수는 `game.js`에서 `onItemClick`이라는 함수를 전달받는데, 전달받은 함수를 통해 이미지를 클릭했을 때 어떠한 이벤트가 발생시킬지가 정해집니다

```javascript
//field.js

setClickListener(onItemClick) {
  this.onItemClick = onItemClick;
}

onClick(event) {
  const target = event.target;
  if (target.matches('.star')) {
    target.remove();
    this.onItemClick && this.onItemClick(ItemType.star);
    sound.playStar();
  } else if (target.matches('.blackhole')) {
    this.onItemClick && this.onItemClick(ItemType.blackhole);
  }
}

```

```javascript
//game.js

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
```

### game.js

- 게임의 시작과 종료 및 게임을 위한 전반적인 기능이 구현되어있습니다.

- game을 시작하기 위해서는 game class의 인스턴스를 만들어야 하는데, 이 때 Builder Pattern을 사용하여 게임 시작에 필요한 time과 생성할 이미지의 개수를 전달한 다음 game class 의 인스턴스를 만들도록 구현하였습니다

```javascript
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
```

- `setGameStopListner(onGameStop)` 함수는 게임이 종료되었을 때 어떠한 동작을 할지를 함수로 전달받습니다

```javascript
// game.js
setGameStopListner(onGameStop) {
  this.onGameStop = onGameStop;
}

```

- `onGameStop`의 함수로 게임의 성공유무에 따라 다른 메시지를 보여주도록 구현하였습니다

```javascript
// main.js

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

```

### popup.js

- 게임이 종료되면 팝업이 화면에 나타납니다

- 시간내에 모든 이미지를 클릭했으면 성공했다는 메시지가, 실패했다면 실패했다는 메시지를 보여줍니다

- `setClickListener(onClick)`라는 함수는 onClick 함수를 전달받는데 이 함수는 게임이 종료된 후 어떠한 동작을 수행할지를 정해주는 함수입니다

```javascript
// popup.js

setClickListener(onClick) {
    this.onClick = onClick;
  }


```

- 게임이 끝난 후, 팝업의 `RESTART` 버튼을 누르면 다시 게임을 시작하도록 하였습니다

```javascript
// main.js

const gameFinishePopup = new PopUp();
gameFinishePopup.setClickListener(() => {
  game.start();
});
```
