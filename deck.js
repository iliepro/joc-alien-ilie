import Card from './card.js';

export default class Deck {
  constructor() {
      this.cards = [];
  }

  initializeDeck() {
    // Afegir les cartes Alien
    for (let i = 9; i >= 1; i--) {
      for (let j = 0; j < i; j++) {
        this.cards.push(new Card('aliens', i, j));
      }
    }

    // Afegir les cartes de Captura
    for (let i = 0; i <= 9; i++) {
      this.cards.push(new Card('capture', i));
    }

    // Afegir les cartes de Caça Recompenses (Bounty Hunter)
    const bountyHunterValues = [1, 2, 3];
    for (let value of bountyHunterValues) {
      for (let i = 1; i <= 5; i++) {
        this.cards.push(new Card('bountyHunter', value));
      }
    }
  }

  // Mètode per barrejar les cartes del deck
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}