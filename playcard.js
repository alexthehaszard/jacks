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
    document
      .getElementById("cards")
      .insertBefore(this.element, document.getElementById("addCard"));
  }

  cardClicked() {
    if (!currentCard) {
      this.element.style = "background-color: lightblue";
      currentCard = playCards[this.index];
    } else {
      if (currentCard.num + this.num === 11) {
        this.element.style = "background-color: lightgreen";
        currentCard.element.style = "background-color: lightgreen";
        if (usingBot === true) {
          this.element.style = "";
          if (currentCard) {
            currentCard.element.style = "";
          }
          this.updateElement();
          if (currentCard) {
            currentCard.updateElement(1);
            currentCard = null;
          }
        } else {
          setTimeout(() => {
            this.element.style = "";
            if (currentCard) {
              currentCard.element.style = "";
            }
            this.updateElement();
            if (currentCard) {
              currentCard.updateElement(1);
              currentCard = null;
            }
          }, 200);
        }
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
        if (usingBot === true) {
          this.element.style = "";
          if (currentCard) {
            currentCard.element.style = "";
          }
          if (currentCard2) {
            currentCard2.element.style = "";
          }
          this.updateElement();
          if (currentCard) {
            currentCard.updateElement();
          }
          if (currentCard2) {
            currentCard2.updateElement(1);
          }
          currentCard = null;
          currentCard2 = null;
        } else {
          setTimeout(() => {
            this.element.style = "";
            if (currentCard) {
              currentCard.element.style = "";
            }
            if (currentCard2) {
              currentCard2.element.style = "";
            }
            this.updateElement();
            if (currentCard) {
              currentCard.updateElement();
            }
            if (currentCard2) {
              currentCard2.updateElement(1);
            }
            currentCard = null;
            currentCard2 = null;
          }, 200);
        }
      } else {
        this.element.style = "background-color: lightcoral";
        currentCard.element.style = "background-color: lightcoral";
        if (currentCard2) {
          currentCard2.element.style = "background-color: lightcoral";
        }
        setTimeout(() => {
          this.element.style = "";
          if (currentCard) {
            currentCard.element.style = "";
          }
          if (currentCard2) {
            currentCard2.element.style = "";
          }
          currentCard = null;
          currentCard2 = null;
        }, 200);
      }
    }
  }

  updateElement(loss) {
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
    if (loss === 1) {
      checkLoss();
    }
  }
}
