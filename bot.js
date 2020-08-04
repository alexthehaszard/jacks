function bot() {
  checkLoss();
  checkWin();
  if (won === false && lost === false) {
    if (!document.querySelector("input").checked) betweenSwaps = 300;
    else betweenSwaps = 10;
    for (let i = 0; i < playCards.length; i++) {
      for (let j = i + 1; j < playCards.length; j++) {
        if (playCards[i].num + playCards[j].num === 11) {
          playCards[i].cardClicked();
          playCards[j].cardClicked();
          if (!usingBot) return;
          setTimeout(() => {
            bot();
          }, betweenSwaps);
          return;
        } else if (
          playCards[i].num > 10 &&
          playCards[j].num > 10 &&
          playCards[i].num !== playCards[j].num
        ) {
          for (let k = j; k < playCards.length; k++) {
            if (
              playCards[j].num + playCards[i].num + playCards[k].num === 36 &&
              playCards[k].num > 10
            ) {
              playCards[i].cardClicked();
              playCards[j].cardClicked();
              playCards[k].cardClicked();
              if (!usingBot) return;
              setTimeout(() => {
                bot();
              }, betweenSwaps);
              return;
            }
          }
        }
      }
    }
    placeCard();
    if (!usingBot) return;
    setTimeout(() => {
      bot();
    }, betweenSwaps);
    return;
  }
}
