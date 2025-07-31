const buttons = document.querySelectorAll("button[data-move]");

const score = {
  wins: 0,
  losses: 0,
  ties: 0
};

const textIds = {
  win: "win",
  lose: "lose",
  tie: "tie"
};

const moves = {
  rock : "images/rock.png",
  paper : "images/paper.png",
  scissors: "images/scissors.png"
};

const emojis = {
  win: "images/hooray.png",
  lose:"images/cross.png",
  tie:"images/meh.webp"
};

const keys = Object.keys(score);
const ids = Object.keys(textIds);

function objectFinder(){
  for (let i =0; i<keys.length ; i++){
  const property = keys[i];
  document.getElementById(property).textContent = score[property];
  }
}

function textChanger(id){
  textReset();
  const result = document.getElementById(id);
  result.className = "highlight";
}

function textReset(){
  for (let i =0; i<keys.length ; i++){
  const id = ids[i];
  const text = document.getElementById(id);
  text.className = "default";
  }
}

function statusChecker (){
  if (score.wins >= score.losses && score.wins>=score.ties){
    textChanger("win");
  } else if (score.losses >= score.wins && score.losses>=score.ties){
    textChanger("lose");
  } else if (score.ties >= score.wins && score.ties>=score.losses){
    textChanger("tie");
  } else{
    return;
  }
}

function displayImages(){
  const player = moves[playerMove];
  const aiPlayer = moves[aiMove];
  const sticker = emojis[emojiPng];

  document.getElementById("move-img").src = player;
  document.getElementById("ai-move-img").src = aiPlayer;
  document.getElementById("result-react").src = sticker;

  document.getElementById("player-move").style.display = "inline";
  document.getElementById("ai-move").style.display = "inline";
  document.getElementById("result-img").style.display = "inline";
}

function displayHidden (){
  document.getElementById("result").style.display="block";
  document.getElementById("message").style.display="block";
}
function stayHidden (){
  document.getElementById("result").style.display="none";
  document.getElementById("message").style.display="none";
}

document.getElementById("reset").addEventListener("click",()=>{
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  objectFinder();
  textReset();
  stayHidden();
});

let result = "";
let aiMove = "";
let playerMove = "";
let emojiPng = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
     playerMove = button.getAttribute("data-move");

    const computer = Math.random();

    if (computer <= (1/3) && computer >= 0) {
      aiMove = "rock";
    } else if (computer <= (2/3) && (1/3) >= computer) {
      aiMove = "paper";
    } else {
      aiMove = "scissors";
    }

    if (aiMove === playerMove) {
      score.ties += 1;
      result = "It's a tie!";
      emojiPng = "tie";
    } else if (
      (aiMove === "rock" && playerMove === "scissors") ||
      (aiMove === "paper" && playerMove === "rock") ||
      (aiMove === "scissors" && playerMove === "paper")
    ) {
      result = "You lose!";
      emojiPng = "lose";
      score.losses += 1;
    } else {
      result = "You win!";
      score.wins += 1;
      emojiPng = "win";
    }

    document.getElementById("result-text").textContent = result;

    objectFinder();
    statusChecker();
    displayHidden();
    displayImages();
  });
});