import Deck from './deck.js';
import { displayPlayerCards, displayCurrentCard, displayPlayerPrison } from './view.js';
import Player from './player.js';

let currentPlayerIndex = 0;
let players = [];
let deck;
let currentCard;
let pendingBountyHunterCapture = false;
let bountyHunterPile = [];

document.getElementById('start-button').addEventListener('click', () => {
  deck = new Deck();
  deck.initializeDeck();
  deck.shuffle();

  const player1 = new Player('Player 1');
  const player2 = new Player('Player 2');
  players = [player1, player2];

  for (let i = 0; i < 5; i++) {
    player1.addCard(deck.cards.pop());
    player2.addCard(deck.cards.pop());
  }

  displayPlayerCards(player1, 'player1-container');
  displayPlayerCards(player2, 'player2-container');
  displayPlayerPrison(player1, 'player1-prison');
  displayPlayerPrison(player2, 'player2-prison');

  bountyHunterPile = [];
  displayBountyHunterPile();

  currentCard = deck.cards.find(card => card.type === 'aliens');
  if (currentCard) {
    deck.cards.splice(deck.cards.indexOf(currentCard), 1);
  } else {
    currentCard = deck.cards.pop();
  }
  displayCurrentCard(currentCard, 'current-card-container');

  setTurn(currentPlayerIndex);
  makeCardsDraggable();
});

document.getElementById('deck-container').addEventListener('click', () => {
  if (deck.cards.length > 0) {
    const newCard = deck.cards.pop();
    players[currentPlayerIndex].addCard(newCard);
    displayPlayerCards(players[currentPlayerIndex], `player${currentPlayerIndex + 1}-container`);
    makeCardsDraggable();
    endTurn();
  }
});

document.getElementById('end-turn-button').addEventListener('click', () => {
  endTurn();
});

function setTurn(index) {
  currentPlayerIndex = index;
  console.log(`És el torn de ${players[currentPlayerIndex].name}`);

  document.querySelectorAll('.avatar').forEach(avatar => {
    avatar.classList.remove('blink');
  });
  document.getElementById(`player${currentPlayerIndex + 1}-avatar`).classList.add('blink');
}

function endTurn() {
  if (players[currentPlayerIndex].hand.length < 5) {
    while (players[currentPlayerIndex].hand.length < 5 && deck.cards.length > 0) {
      players[currentPlayerIndex].addCard(deck.cards.pop());
    }
  }

  displayPlayerCards(players[currentPlayerIndex], `player${currentPlayerIndex + 1}-container`);
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  setTurn(currentPlayerIndex);
  makeCardsDraggable();
}

function handleDrop(event) {
  const cardId = event.dataTransfer.getData('text/plain');
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
  const cardIndex = Array.from(cardElement.parentElement.children).indexOf(cardElement);
  const playedCard = players[currentPlayerIndex].hand[cardIndex];

  if (!playedCard) {
    console.log('Carta no trobada o ja jugada.');
    return;
  }

  let validMove = false;

  if (playedCard.type === 'aliens' &&
    (playedCard.value1 === currentCard.value1 || playedCard.value1 === currentCard.value2 ||
     playedCard.value2 === currentCard.value1 || playedCard.value2 === currentCard.value2)) {
    validMove = true;
  } else if (playedCard.type === 'capture' && 
            (playedCard.value1 === currentCard.value1 || 
             playedCard.value1 === currentCard.value2 || 
             playedCard.value1 === currentCard.value1 + currentCard.value2 || 
             playedCard.value1 === Math.abs(currentCard.value1 - currentCard.value2))) {
    validMove = true;
  } else if (playedCard.type === 'bountyHunter') {
    validMove = true;
    pendingBountyHunterCapture = true;
  }

  if (validMove) {
    if (playedCard.type === 'capture') {
      // Mou la carta de tipus capture a la presó
      players[currentPlayerIndex].hand.splice(cardIndex, 1);
      players[currentPlayerIndex].prison.push(playedCard);
      displayPlayerPrison(players[currentPlayerIndex], `player${currentPlayerIndex + 1}-prison`);
    } else if (playedCard.type === 'bountyHunter') {
      // Juga la carta bountyHunter i activa la captura
      players[currentPlayerIndex].hand.splice(cardIndex, 1); // Només elimina la carta jugada
      moveBountyHunterToPile(playedCard); // Afegeix la carta a la pila de bountyHunter
      activateBountyHunterCapture(playedCard); // Passa la carta jugada per verificar el seu valor
    } else {
      // Juga la carta de tipus aliens
      players[currentPlayerIndex].hand.splice(cardIndex, 1);
      currentCard = playedCard;
    }
    displayPlayerCards(players[currentPlayerIndex], `player${currentPlayerIndex + 1}-container`);
    displayCurrentCard(currentCard, 'current-card-container');
    makeCardsDraggable();
  } else {
    console.log('No es pot jugar aquesta carta.');
  }
}

function activateBountyHunterCapture(playedCard) {
  const otherPlayerIndex = (currentPlayerIndex + 1) % players.length;
  document.getElementById(`player${otherPlayerIndex + 1}-container`).classList.add('highlight-cards');
  document.querySelectorAll(`#player${otherPlayerIndex + 1}-container .card`).forEach(card => {
    if (playedCard.value1 === 1 && card.classList.contains('aliens')) {
      card.classList.add('clickable', 'highlight');
      card.addEventListener('click', bountyHunterCaptureCard);
    } else if (playedCard.value1 === 2 && card.classList.contains('capture')) {
      card.classList.add('clickable', 'highlight');
      card.addEventListener('click', bountyHunterCaptureCard);
    } else if (playedCard.value1 === 3) {
      card.classList.add('clickable', 'highlight');
      card.addEventListener('click', bountyHunterCaptureCard);
    }
  });
}

function bountyHunterCaptureCard(event) {
  const cardElement = event.currentTarget;
  const cardIndex = Array.from(cardElement.parentElement.children).indexOf(cardElement);
  const otherPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const capturedCard = players[otherPlayerIndex].hand[cardIndex];
  const currentBountyHunterValue = bountyHunterPile[0].value1;

  if ((currentBountyHunterValue === 1 && capturedCard.type === 'aliens') || 
  (currentBountyHunterValue === 2 && capturedCard.type === 'capture') ||
  currentBountyHunterValue === 3) {
players[otherPlayerIndex].hand.splice(cardIndex, 1);
players[currentPlayerIndex].addCard(capturedCard);
displayPlayerCards(players[otherPlayerIndex], `player${otherPlayerIndex + 1}-container`);
displayPlayerCards(players[currentPlayerIndex], `player${currentPlayerIndex + 1}-container`);
}

document.getElementById(`player${otherPlayerIndex + 1}-container`).classList.remove('highlight-cards');
document.querySelectorAll(`#player${otherPlayerIndex + 1}-container .card`).forEach(card => {
card.classList.remove('clickable', 'highlight');
card.removeEventListener('click', bountyHunterCaptureCard);
});

pendingBountyHunterCapture = false;
makeCardsDraggable();
}

function checkWinCondition() {
if (players[currentPlayerIndex].prison.length >= 4) {
alert(`${players[currentPlayerIndex].name} ha guanyat el joc capturant 4 aliens!`);
document.getElementById('start-button').disabled = false;
}
}

function makeCardsDraggable() {
document.querySelectorAll('.card').forEach(card => {
card.setAttribute('draggable', true);
card.addEventListener('dragstart', event => {
  event.dataTransfer.setData('text/plain', card.dataset.cardId);
});
});

const currentCardContainer = document.getElementById('current-card-container');
currentCardContainer.addEventListener('dragover', event => {
event.preventDefault();
currentCardContainer.classList.add('dragover');
});

currentCardContainer.addEventListener('dragleave', () => {
currentCardContainer.classList.remove('dragover');
});

currentCardContainer.addEventListener('drop', event => {
event.preventDefault();
currentCardContainer.classList.remove('dragover');
handleDrop(event);
});
}

// Funció per moure la carta Bounty Hunter a la pila
function moveBountyHunterToPile(card) {
bountyHunterPile = [card];
displayBountyHunterPile();
}

// Funció per mostrar la pila de Bounty Hunter
function displayBountyHunterPile() {
const pileContainer = document.getElementById('bounty-hunter-pile');
pileContainer.innerHTML = '';

if (bountyHunterPile.length > 0) {
const card = bountyHunterPile[0];
const cardDiv = document.createElement('div');
cardDiv.classList.add('card', 'bountyHunter');
const image = document.createElement('img');
image.src = `icon/hunter${card.value1}.png`;
cardDiv.appendChild(image);

const valueSpan = document.createElement('span');
valueSpan.classList.add('card-value');
valueSpan.textContent = card.toString();
cardDiv.appendChild(valueSpan);

pileContainer.appendChild(cardDiv);
}
}