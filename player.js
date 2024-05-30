export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.prison = [];
  }

  addCard(card) {
    this.hand.push(card);
    card.new = true;
  }

  showHand() {
    return this.hand.map(card => card.toString()).join(', ');
  }
}