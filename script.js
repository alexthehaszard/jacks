let deck = [];
let suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "king", "queen", "jack"];
let playCards = [];
let currentCard;
let currentCard2;
let won;
setup();
shuffle();

function setup() {
  deck = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  ];
  won = false;
}

function shuffle() {
  for (let i = 0; i < deck.length; i++) {
    for (let j = 0; j < deck[i].length; j++) {
      let ran = Math.floor(Math.random() * deck[i].length);
      temp = deck[i][j];
      deck[i][j] = deck[i][ran];
      deck[i][ran] = temp;
    }
  }
  console.log(deck);
}

function placeCard() {
  if (won === false) {
    let suit = Math.floor(Math.random() * 4);
    if (deck[suit].length === 0) {
      placeCard();
    } else {
      playCards.push(new PlayCard(suit, deck[suit][0]));
      playCards[playCards.length - 1].makeElement();
      deck[suit].splice(0, 1);
    }
  }
}

class PlayCard {
  constructor(suit, num) {
    this.suit = suit;
    this.num = num;
    this.index = playCards.length;
    this.element;
    this.suitText;
    this.numText;
  }

  makeElement() {
    if (playCards.length <= 9) {
      this.element = document.createElement("div");
      this.suitText = document.createElement("p");
      this.numText = document.createElement("p");
      this.element.appendChild(this.numText);
      this.element.appendChild(this.suitText);
      this.element.classList = "card";
      this.element.setAttribute(
        "onclick",
        `playCards[${this.index}].cardClicked()`
      );
      this.suitText.classList = "card-suit";
      this.numText.classList = "card-num";
      this.suitText.innerHTML = suits[this.suit];
      this.numText.innerHTML = nums[this.num - 1];
      document.getElementById("cards").appendChild(this.element);
    }
  }

  cardClicked() {
    if (!currentCard) {
      this.element.style = "background-color: lightblue";
      currentCard = playCards[this.index];
    } else {
      if (currentCard.num + this.num === 11) {
        this.element.style = "background-color: lightgreen";
        currentCard.element.style = "background-color: lightgreen";
        setTimeout(() => {
          this.element.style = "";
          currentCard.element.style = "";
          this.updateElement();
          currentCard.updateElement();
          currentCard = null;
        }, 100);
      } else if (currentCard.num > 10 && this.num > 10 && !currentCard2) {
        currentCard2 = playCards[this.index];
        currentCard2.element.style = "background-color: lightblue";
      } else if (
        currentCard2 &&
        currentCard.num + currentCard2.num + this.num === 36
      ) {
        this.element.style = "background-color: lightgreen";
        currentCard.element.style = "background-color: lightgreen";
        currentCard2.element.style = "background-color: lightgreen";
        setTimeout(() => {
          this.element.style = "";
          currentCard.element.style = "";
          currentCard2.element.style = "";
          this.updateElement();
          currentCard.updateElement();
          currentCard2.updateElement();
          currentCard = null;
          currentCard2 = null;
        }, 100);
      } else {
        this.element.style = "background-color: lightcoral";
        currentCard.element.style = "background-color: lightcoral";
        if (currentCard2) {
          currentCard2.element.style = "background-color: lightcoral";
        }
        setTimeout(() => {
          this.element.style = "";
          currentCard.element.style = "";
          if (currentCard2) {
            currentCard2.element.style = "";
          }
          currentCard = null;
          currentCard2 = null;
        }, 100);
      }
    }
  }

  updateElement() {
    checkWin();
    if (won === false) {
      let suit = Math.floor(Math.random() * 4);
      if (deck[suit].length === 0) {
        this.updateElement();
      } else {
        this.num = deck[suit][0];
        this.suit = suits[suit];
        this.numText.innerHTML = nums[this.num - 1];
        this.suitText.innerHTML = this.suit;
        deck[suit].splice(0, 1);
      }
    }
  }
}

function checkWin() {
  let total = 0;
  for (let i = 0; i < deck.length; i++) {
    total += deck[i].length;
  }
  if (total === 0 && won === false) {
    document.getElementById("winText").style = "";
    won = true;
    document.getElementById("cards").innerHTML = "";
    setup();
  }
}
