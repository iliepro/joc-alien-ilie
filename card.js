export default class Card {
    constructor(type, value1, value2 = null) {
      this.type = type;
      this.value1 = value1;
      this.value2 = value2;
      this.faceUp = false;
    }
  
    // Mètode per girar la carta
    flip() {
      this.faceUp = !this.faceUp;
    }
  
    toString() {
      if (this.type === "aliens") {
        return `${this.value1} ${this.value2}`;
      } else if (this.type === "bountyHunter") {
        return `${this.value1}`;
      } else {
        return `${this.value1}`;
      }
    }
  }