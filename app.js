const sectionThree = document.getElementById("qwerty");
const sectionTwo = document.querySelector("#phrase ul");
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById("overlay");
const ul = document.querySelector("ul");
const hearts = document.querySelectorAll("img");

let missed = 0;
let hit_nr = 0;

// PHRASES: Add here the phrases you want to play with.
let phrases = [
  "Ad astra per aspera",
  "Si vis pacem para bellum",
  "Carpe diem",
  "Alea iacta est",
  "Dulce periculum",
  "Acta non verba",
  "Mors tua vita mea",
  "Audentes fortuna iuvat",
  "Aquila non capit muscas",
  "Barba tenus sapientes"
];

// START GAME: This function will start the game and reset the buttons
startGame.addEventListener("click", () => {
  overlay.style.display = "none";
  overlay.className = "start";
  sectionTwo.innerHTML = "";
  const buttons = document.querySelectorAll("button");
  for(i = 0; i < buttons.length; i += 1) {
    buttons[i].classList.remove("chosen");
    buttons[i].disabled = false;
  }
  for (i = 0 ; i < hearts.length ; i += 1) {
    hearts[i].setAttribute("src", "images/liveHeart.png");
  }
  missed = 0;
  hit_nr = 0;
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});

// RANDOM PHRASE ARRAY: It will choose a random phrase and create a string array of letters
const getRandomPhraseAsArray = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber].split("");
};

// DISPLAY PHRASE: Show the letter box of the choosen phrase on the screen
const addPhraseToDisplay = (arr) => {
  for(i = 0; i < arr.length ; i += 1) {
    const li = document.createElement("li");
    li.textContent = arr[i];
    ul.appendChild(li);
    if (li.textContent !== " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
  }
};

// CHECK LETTERS: match the right letters when clicked
const checkLetter = (button) => {
    let guess = document.getElementsByClassName("letter");
    let matchFound = null;
    for (i = 0; i < guess.length; i +=1) {
      if (button.textContent === guess[i].textContent.toLowerCase()) {
        guess[i].classList.add("show");
        matchFound = guess[i].textContent;
      }
    }
    return matchFound;
};

// OUTCOME: It will tell you the outcome of your game (win or lose)
const outcome = (result) => {
  const message = document.querySelector(".title");
  overlay.style.display = "";
  if (result === "win"){
    overlay.classList.add("win");
    message.textContent = "You WIN!!";
  } else if ( result === "lose") {
    overlay.classList.add("lose");
    message.textContent = "You LOSE!!";
    startGame.textContent = "You have run out of hearts! Play again";
  }
};

// CHECK WIN: It will check if you missed more then 4 letters or not
const checkWin = () => {
  const show = document.querySelectorAll(".show");
  const letter = document.querySelectorAll(".letter");
  if (letter.length === show.length) {
    outcome("win", "You Won")
  } else if (missed > 4) {
    outcome("lose", "You Lost");
  }
};

// CLICK EVENT: at every wrong letter will check the remaining hearts and increase their value
sectionThree.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    event.target.classList.add("chosen");
    event.target.disabled = true;
    const letterFound = checkLetter(event.target);
    if (letterFound === null) {
        hearts[hit_nr].setAttribute("src", "images/lostHeart.png");
        hit_nr +=1;
        missed += 1;
    }
    checkWin();
  }
});
