"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "pink", "yellow", "purple",
  "red", "blue", "pink", "yellow", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

let first, second;
let isFlipped = false;
let lock = false;
let length = 0;


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let newCard = document.createElement("div");
        newCard.className = color;

    let frontImg = document.createElement("img");
        frontImg.setAttribute("src", color + ".png");
        frontImg.setAttribute("class", "front");
    let backImg = document.createElement("img");
        backImg.setAttribute("src", "back.png");
        backImg.setAttribute("class", "back");

      newCard.appendChild(frontImg);
      newCard.appendChild(backImg);  
      newCard.addEventListener("click", handleCardClick);
    
    gameBoard.appendChild(newCard);
  }

  return gameBoard;
}

/** Flip a card face-up. */

function flipCard() {
  if(first.className === second.className && first != second){
    first.removeEventListener("click", handleCardClick);
    second.removeEventListener("click", handleCardClick);
    length += 2;
  }
  else {
    unFlipCard(first);
    unFlipCard(second);
  }
  if(length === 10)
      setTimeout(function(){
        document.getElementById("confetti").style.visibility = 'visible';
      }, 500);
}

/** Flip a card face-down. */

function unFlipCard(card) {
  lock = true;
  setTimeout(function(){
    card.classList.remove("flipped");
    lock = false;
  }, FOUND_MATCH_WAIT_MSECS);
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  if(lock) return;
  this.classList.add("flipped");
  if(!isFlipped)
  {
    isFlipped = true;
    first = this;
    return;
  }

  second = this;
  isFlipped = false;
  flipCard();
}


  let reset = document.getElementById("reset");
  reset.addEventListener("click", function(event){
    location.reload();
  })

