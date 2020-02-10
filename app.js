const sectionThree = document.getElementById("qwerty");
const sectionTwo = document.querySelector("#phrase ul");
let missed = 0;
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById("overlay");
const ul = document.querySelector("ul");

let phrases = [
  "I bet",
  "Try to",
  "I wonder",
  "Just for",
  "Guess the"
];

startGame.addEventListener("click", () => {
  overlay.style.display = "none";
  overlay.className = "start";
  sectionTwo.innerHTML = "";
  const buttons = document.querySelectorAll("button");
  for(i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("chosen");
    buttons[i].disabled = false;
  }
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});

const getRandomPhraseAsArray = arr => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber].split("");
};


const addPhraseToDisplay = arr => {
  for(i = 0; i < arr.length ; i +=1) {
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




const checkLetter = button => {
    let guess = document.getElementsByClassName("letter");
    let matchFound = null;
    for (i = 0; i < guess.length; i +=1) {
      //alert(guess[i].textContent);
      if (button.textContent === guess[i].textContent.toLowerCase()) {
        guess[i].classList.add("show");
        matchFound = guess[i].textContent;
      }
    }
    return matchFound;
};



const outcome = (result) => {
  const message = document.querySelector(".title");
  overlay.style.display = "";
  if (result === "win"){
    overlay.classList.add("win");
    message.textContent = "You WIN!!";
  } else if ( result === "lose") {
    overlay.classList.add("lose");
    startGame.textContent = "You have run out of hearts! Play again";
  }
};

const checkWin = () => {
  const show = document.querySelectorAll(".show");
  const letter = document.querySelectorAll(".letter");
  if (letter.length === show.length) {
    outcome("win", "You Won")
  }
  if (missed > 4) {
    outcome("lose", "You Lost");
  }
};

sectionThree.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    event.target.classList.add("chosen");
    event.target.disabled = true;
    const letterFound = checkLetter(event.target);
    if (letterFound === null) {
      const hearts = document.querySelectorAll("img");
        hearts[i].src = "images/lostHeart.png";
        i +=1;
        missed += 1;
      }
      checkWin();
  }
});
