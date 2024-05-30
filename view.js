export function displayPlayerCards(player, containerId) {
  const container = document.getElementById(containerId);
  let playerHeader = container.querySelector('.player-header');
  if (!playerHeader) {
    playerHeader = document.createElement('div');
    playerHeader.classList.add('player-header');
    playerHeader.innerHTML = `
      <img src="img/${containerId}-avatar.jpeg" class="avatar" id="${containerId}-avatar">
      <h2>${player.name}</h2>
    `;
    container.appendChild(playerHeader);
  }

  const cardsContainer = container.querySelector('.cards');
  if (cardsContainer) {
    cardsContainer.remove();
  }

  const newCardsContainer = document.createElement('div');
  newCardsContainer.classList.add('cards');

  player.hand.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('data-card-id', index);

    // Aplica la classe d'animació si és una carta nova
    if (card.new) {
      cardDiv.classList.add('new-card');
      setTimeout(() => {
        cardDiv.classList.remove('new-card');
        delete card.new;
      }, 500);
    }

    if (card.type === 'aliens') {
      cardDiv.classList.add('aliens');

      const topDiv = document.createElement('div');
      topDiv.classList.add('top-value');
      const topValue = document.createElement('span');
      topValue.classList.add('card-value');
      topValue.textContent = card.value1;
      topDiv.appendChild(topValue);

      const bottomDiv = document.createElement('div');
      bottomDiv.classList.add('bottom-value');
      const bottomValue = document.createElement('span');
      bottomValue.classList.add('card-value');
      bottomValue.textContent = card.value2;
      bottomDiv.appendChild(bottomValue);

      const topImage = document.createElement('img');
      topImage.src = `icon/alien${card.value1}.png`;
      topDiv.appendChild(topImage);

      const bottomImage = document.createElement('img');
      bottomImage.src = `icon/alien${card.value2}.png`;
      bottomDiv.appendChild(bottomImage);

      cardDiv.appendChild(topDiv);
      cardDiv.appendChild(bottomDiv);
    } else {
      if (card.type === 'capture') {
        cardDiv.classList.add('capture');
        const image = document.createElement('img');
        image.src = `icon/alien${card.value1}.png`;
        cardDiv.appendChild(image);
      } else if (card.type === 'bountyHunter') {
        cardDiv.classList.add('bountyHunter');
        const image = document.createElement('img');
        image.src = `icon/hunter${card.value1}.png`;
        cardDiv.appendChild(image);
      }
      const valueSpan = document.createElement('span');
      valueSpan.classList.add('card-value');
      valueSpan.textContent = card.toString();
      cardDiv.appendChild(valueSpan);
    }

    newCardsContainer.appendChild(cardDiv);
  });

  container.appendChild(newCardsContainer);
}

export function displayCurrentCard(card, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.classList.add('current-card');

  if (card.type === 'aliens') {
    cardDiv.classList.add('aliens');

    const topDiv = document.createElement('div');
    topDiv.classList.add('top-value');
    const topValue = document.createElement('span');
    topValue.classList.add('card-value');
    topValue.textContent = card.value1;
    topDiv.appendChild(topValue);

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-value');
    const bottomValue = document.createElement('span');
    bottomValue.classList.add('card-value');
    bottomValue.textContent = card.value2;
    bottomDiv.appendChild(bottomValue);

    const topImage = document.createElement('img');
    topImage.src = `icon/alien${card.value1}.png`;
    topDiv.appendChild(topImage);

    const bottomImage = document.createElement('img');
    bottomImage.src = `icon/alien${card.value2}.png`;
    bottomDiv.appendChild(bottomImage);

    cardDiv.appendChild(topDiv);
    cardDiv.appendChild(bottomDiv);
  } else {
    if (card.type === 'capture') {
      cardDiv.classList.add('capture');
      const image = document.createElement('img');
      image.src = `icon/alien${card.value1}.png`;
      cardDiv.appendChild(image);
    } else if (card.type === 'bountyHunter') {
      cardDiv.classList.add('bountyHunter');
      const image = document.createElement('img');
      image.src = `icon/hunter${card.value1}.png`;
      cardDiv.appendChild(image);
    }
    const valueSpan = document.createElement('span');
    valueSpan.classList.add('card-value');
    valueSpan.textContent = card.toString();
    cardDiv.appendChild(valueSpan);
  }

  container.appendChild(cardDiv);
}

export function displayPlayerPrison(player, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<h3>Prison</h3>';

  player.prison.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('data-card-id', index);

    if (card.type === 'aliens') {
      cardDiv.classList.add('aliens');

      const topDiv = document.createElement('div');
      topDiv.classList.add('top-value');
      const topValue = document.createElement('span');
      topValue.classList.add('card-value');
      topValue.textContent = card.value1;
      topDiv.appendChild(topValue);

      const bottomDiv = document.createElement('div');
      bottomDiv.classList.add('bottom-value');
      const bottomValue = document.createElement('span');
      bottomValue.classList.add('card-value');
      bottomValue.textContent = card.value2;
      bottomDiv.appendChild(bottomValue);

      const topImage = document.createElement('img');
      topImage.src = `icon/alien${card.value1}.png`;
      topDiv.appendChild(topImage);

      const bottomImage = document.createElement('img');
      bottomImage.src = `icon/alien${card.value2}.png`;
      bottomDiv.appendChild(bottomImage);

      cardDiv.appendChild(topDiv);
      cardDiv.appendChild(bottomDiv);
    } else {
      if (card.type === 'capture') {
        cardDiv.classList.add('capture');
        const image = document.createElement('img');
        image.src = `icon/alien${card.value1}.png`;
        cardDiv.appendChild(image);
      } else if (card.type === 'bountyHunter') {
        cardDiv.classList.add('bountyHunter');
        const image = document.createElement('img');
        image.src = `icon/hunter${card.value1}.png`;
        cardDiv.appendChild(image);
      }
      const valueSpan = document.createElement('span');
      valueSpan.classList.add('card-value');
      valueSpan.textContent = card.toString();
      cardDiv.appendChild(valueSpan);
    }

    container.appendChild(cardDiv);
  });

  for (let i = player.prison.length; i < 4; i++) {
    const placeholderDiv = document.createElement('div');
    placeholderDiv.classList.add('card');
    placeholderDiv.style.width = '50px';
    placeholderDiv.style.height = '75px';
    placeholderDiv.style.border = '2px dashed black';
    container.appendChild(placeholderDiv);
  }
}