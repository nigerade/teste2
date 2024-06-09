const questions = [
  { id: 1, question: "What color is the sky?", answer: "blue" },
  { id: 2, question: "If you freeze water, what do you get?", answer: "ice" },
  { id: 3, question: "Which state is famous for Hollywood?", answer: "California" },
  { id: 4, question: "How many pairs of wings do bees have?", answer: "Two" },
  { id: 5, question: "Where is the Great Pyramid of Giza?", answer: "Egypt" },
];

// Game state
let players = {
  player1: { score: 0, isConnected: false, isGameStarted: false },
  player2: { score: 0, isConnected: false, isGameStarted: false },
};
let currentQuestionIndex = 0;
let timerInterval;
const initialTime = 60;
let remainingTime = initialTime;

// Elements
const audio = document.getElementById("audio");
const modal = document.getElementById("myModal");
const questionElem = document.querySelector(".question");
const userInputElem = document.getElementById("userInput");
const submitButton = document.querySelector(".submit");
const timerElem = document.querySelector(".timer");
const gameContainer = document.getElementById("gameContainer");
const waitingRoom = document.getElementById("waitingRoom");

// Shuffle and store questions in localStorage
function shuffleAndStoreQuestions() {
  const shuffledQuestions = [...questions];
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
  }
  localStorage.setItem('questions', JSON.stringify(shuffledQuestions));
}

// Retrieve questions from localStorage
function getStoredQuestions() {
  return JSON.parse(localStorage.getItem('questions'));
}

// Simulate player connection
function connectPlayer(playerKey) {
  players[playerKey].isConnected = true;
  checkAllPlayersConnected();
}

// Check if both players are connected
function checkAllPlayersConnected() {
  if (players.player1.isConnected && players.player2.isConnected) {
    waitingRoom.style.display = "none";
    gameContainer.style.display = "block";
    startGame();
  }
}

// Start the game
function startGame() {
  if (!localStorage.getItem('questions')) {
    shuffleAndStoreQuestions();
  }
  players.player1.isGameStarted = true;
  players.player2.isGameStarted = true;
  displayNextQuestion();
  startTimer();
}

// Display next question
function displayNextQuestion() {
  const storedQuestions = getStoredQuestions();
  if (currentQuestionIndex >= storedQuestions.length) {
    endGame();
    return;
  }
  const question = storedQuestions[currentQuestionIndex];
  questionElem.textContent = question.question;
}

// Start the timer
function startTimer() {
  remainingTime = initialTime;
  timerElem.textContent = remainingTime;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    remainingTime--;
    timerElem.textContent = remainingTime;
    
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      endGameDueToTime();
    }
  }, 1000);
}

// Submit answer
submitButton.addEventListener("click", onSubmit);
userInputElem.addEventListener("keypress", (e) => {
  if (e.key === "Enter") onSubmit();
});

function onSubmit() {
  playSound();
  const userAnswer = userInputElem.value.trim();
  if (!userAnswer) return;

  const storedQuestions = getStoredQuestions();
  const correctAnswer = storedQuestions[currentQuestionIndex].answer;
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    players.player1.score++;
    players.player2.score++;
  }

  userInputElem.value = "";
  currentQuestionIndex++;
  if (currentQuestionIndex < storedQuestions.length) {
    displayNextQuestion();
    resetTimer();
  } else {
    endGame();
  }
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  remainingTime = initialTime;
  startTimer();
}

// End game due to time over
function endGameDueToTime() {
  players.player1.isGameStarted = false;
  players.player2.isGameStarted = false;
  showTimeOverMessage();
}

function showTimeOverMessage() {
  const resultDiv = document.querySelector(".result-announcement");
  resultDiv.innerHTML = `
    <h2>Time Over</h2>
    <p>You ran out of time!</p>
    <a href="./game.html" class="btn-again">Play Again</a>
  `;
  modal.style.display = "block";
}

// End game and show results
function endGame() {
  players.player1.isGameStarted = false;
  players.player2.isGameStarted = false;
  showResults();
}

function showResults() {
  const resultDiv = document.querySelector(".result-announcement");
  let resultMessage = "";
  if (players.player1.score > players.player2.score) {
    resultMessage = `Player 1 wins with ${players.player1.score} correct answers!`;
  } else if (players.player1.score < players.player2.score) {
    resultMessage = `Player 2 wins with ${players.player2.score} correct answers!`;
  } else {
    resultMessage = "It's a tie!";
  }
  resultDiv.innerHTML = `
    <h2>Game Over</h2>
    <p>${resultMessage}</p>
    <a href="./game.html" class="btn-again">Play Again</a>
  `;
  modal.style.display = "block";
}

// Play sound on submit
function playSound() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

// Initialize game
function initializeGame() {
  if (!localStorage.getItem('questions')) {
    shuffleAndStoreQuestions();
  }

  // Simulate player connections (for testing)
  setTimeout(() => connectPlayer("player1"), 1000);
  setTimeout(() => connectPlayer("player2"), 2000);
}

initializeGame();