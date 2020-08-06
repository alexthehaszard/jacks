let deck = [];
let suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "king", "queen", "jack"];
let playCards = [];
let currentCard;
let currentCard2;
let won;
let endTime = 10;
let betweenSwaps = 10;
let usingBot = false;
let wins = 0;
let losses = 0;
let games = 0;
let lost;
let boxIsGreen = false;
let showingRules = false;
setup();
shuffle();

function setup() {
  deck = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  ];
  shuffle();
  won = false;
  lost = false;
  document.getElementById("addCard").style = "";
  for (let i = 0; i < playCards.length; i++) {
    document.getElementById("cards").removeChild(playCards[i].element);
  }
  playCards = [];
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
}

function placeCard() {
  if (won === false) {
    let suit = Math.floor(Math.random() * 4);
    if (deck[suit].length === 0) {
      placeCard();
    } else {
      if (playCards.length < 8) {
        playCards.push(new PlayCard(suit, deck[suit][0]));
        playCards[playCards.length - 1].makeElement();
        deck[suit].splice(0, 1);
      } else if (playCards.length === 8) {
        playCards.push(new PlayCard(suit, deck[suit][0]));
        playCards[playCards.length - 1].makeElement();
        deck[suit].splice(0, 1);
        document.getElementById("addCard").style = "display: none";
      }
    }
    checkLoss();
  }
}

function checkWin() {
  let total = 0;
  for (let i = 0; i < deck.length; i++) {
    total += deck[i].length;
  }
  if (total === 0 && won === false && lost === false) {
    won = true;
    wins++;
    games++;
    document.getElementById("winLoss").innerHTML = `win/loss: ${wins / losses}`;
    document.getElementById("wins").innerHTML = `wins: ${wins}`;
    console.log("games: " + games);
    if (usingBot === true) {
      setTimeout(() => {
        setup();
        bot();
      }, endTime);
    }
    return true;
  }
}

function checkLoss() {
  let isLost = true;
  for (let i = 0; i < playCards.length; i++) {
    for (let j = playCards.length - 1; j > i; j--) {
      if (playCards[i].num + playCards[j].num === 11) {
        isLost = false;
        return false;
      } else if (
        playCards[i].num > 10 &&
        playCards[j].num > 10 &&
        playCards[j].num != playCards[i].num
      ) {
        for (let k = 0; k < playCards.length; k++) {
          if (
            playCards[i].num + playCards[j].num + playCards[k].num === 36 &&
            playCards[k].num > 10
          ) {
            isLost = false;
            return false;
          }
        }
      }
    }
  }
  if (playCards.length === 9 && isLost === true && lost === false) {
    lost = true;
    losses++;
    games++;
    document.getElementById("winLoss").innerHTML = `win/loss: ${wins / losses}`;
    document.getElementById("losses").innerHTML = `losses: ${losses}`;
    console.log("games: " + games);
    if (usingBot === true) {
      setTimeout(() => {
        setup();
        bot();
      }, endTime);
    }
    return true;
  }
  return false;
}

function startBot() {
  if (usingBot) {
    usingBot = false;
  } else {
    usingBot = true;
    bot();
  }
}

function showRules() {
  if (!showingRules) {
    document.querySelector("#rules").style = "";
    document.querySelector("#showRules").innerHTML = "Hide Rules";
    showingRules = true;
  } else {
    document.querySelector("#rules").style = "display: none";
    document.querySelector("#showRules").innerHTML = "Show Rules";
    showingRules = false;
  }
}
