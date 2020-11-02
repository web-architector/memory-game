const memoryGameContainer = document.querySelector('.memory-game');
const button = document.querySelector('.button');
const boxWidth = 4;
const boxHeight = 3;
const allFoods = [
  'banana', 'cauliflower', 'cherry',
  'chili', 'eggplant', 'grape',
  'green-pepper', 'mushrooms', 'onion',
  'carrot', 'pear', 'pineapple',
  'red-pepper', 'strawberry', 'tomato'
];
const theme = 'fruits'; // тема карточек - фрукты, фреймворки. животные итп
let cards;
let hasFlippedCard = false; // есть ли уже одна перевернутая карточка?
let firstCard, secondCard;
let lockBoard = false; // блокируем нажатия , пока выбранные две неправлиьные карты не повернуться

// Handle click on card
const flipCard = e => {
  if (lockBoard) return;  // нажатия блокированы
  const card = e.target.closest('.memory-card');
  if (!card || card.classList.contains('flip')) return;
  card.classList.add('flip');
  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = card;
  } else {
    //Second click
    hasFlippedCard = false;
    secondCard = card;
    checkMatch(firstCard, secondCard);
  }
};

// Check whether card is equal
const checkMatch = (firstCard, secondCard) => {
  if (firstCard.dataset.pair === secondCard.dataset.pair) {
    if (!isCompleted()) return;
    return;
  }
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
  }, 1000);

};


// create new play field and shuffle cards in DOM node
const shuffleCards = () => {
  const foods = allFoods.sort(() => 0.5 - Math.random()).slice(0, boxWidth * boxHeight / 2);
  memoryGameContainer.textContent = '';
  foods.forEach((item, index) => {
    const card = `
        <div class="memory-card" data-pair="${ index }">
            <img src="assets/img/${theme}/${ item }.png" alt="${ item }" class="frontface">
            <img src="assets/img/back-face.png" alt="backface" class="backface">
        </div>`;
    memoryGameContainer.insertAdjacentHTML('afterbegin', card + card);
  });
  cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * cards.length * 10);
  });
};

// check whether all cards have been opened
const isCompleted = () => {
  return document.querySelectorAll('.flip').length === cards.length;
};

// close all cards for new game
const closeCards = () => {
  cards.forEach(card => {
    card.classList.remove('flip');
  });
};
// show all cards for memorizing
const showCards = () => {
  cards.forEach(card => {
    card.classList.add('flip');
  });
};

// Старт новой игры при нажатии на кнопку
const startNewGame = () => {
  shuffleCards();
  closeCards();
  setTimeout(() => {
    showCards();
  }, 600);
  setTimeout(() => {
    closeCards();
  }, 11000);
};

// создает поле рубашками вверх при первой загрузке и обновлении страницы
const handOutCards = () => {
  let card;
  memoryGameContainer.textContent = '';
  for (i = 0; i < boxWidth * boxHeight; i++) {
    card = `
        <div class="memory-card">
            <img src="assets/img/back-face.png" alt="backface" class="backface">
        </div>`;
    memoryGameContainer.insertAdjacentHTML('afterbegin', card);
  };
};
document.addEventListener('DOMContentLoaded', handOutCards);
memoryGameContainer.addEventListener('click', flipCard);
button.onclick = () => startNewGame();
