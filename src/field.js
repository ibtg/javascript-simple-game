'use strict';

const STAR_SIZE = 80; // 상수니까 class 밖에서 선언
import * as sound from './sound.js';

export const ItemType = Object.freeze({
  star: 'star',
  blackhole: 'blackhole',
});

export class Field {
  constructor(starCount, blackholeCount) {
    this.starCount = starCount;
    this.blackholeCount = blackholeCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', (event) => this.onClick(event));
  }

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

  init() {
    this.field.innerHTML = '';
    this._addItem('star', this.starCount, '../img/star.png');
    this._addItem('blackhole', this.blackholeCount, '../img/blackhole.png');
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - STAR_SIZE;
    const y2 = this.fieldRect.height - STAR_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
