const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restart');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-value');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
    } else {
        firstCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.classList.remove('flipped');
        secondCard.textContent = '';
        flippedCards = [];
    }
}

function initializeGame() {
    gameBoard.innerHTML = '';
    cards = shuffle(cards);
    cards.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
    matchedCards = [];
}

restartButton.addEventListener('click', initializeGame);

initializeGame();

