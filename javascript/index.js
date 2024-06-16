// don't start the game and timer if game is not started yet
let isGameStarted = true;

// put your questions in array with JSON object
// do not put 0 to ID => start from 1 and more // Make sure each ID is unique
// id will help us to track which question we are working on.
let questions = [
  {
    id: 1,
    question: "Qual a cor do céu?",
    answers: ["azul"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 2,
    question: "Se você congelar água, o que você obtém?",
    answers: ["gelo", "ice"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 3,
    question: "Qual estado é famoso por Hollywood?",
    answers: ["Califórnia", "California"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 4,
    question: "Quantos pares de asas as abelhas têm?",
    answers: ["Dois", "2"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 5,
    question: "Onde está a Grande Pirâmide de Gizé?",
    answers: ["Egito", "Egypt"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 6,
    question: "Qual é o maior planeta do nosso sistema solar?",
    answers: ["Júpiter", "Jupiter"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 7,
    question: "Qual é a capital da França?",
    answers: ["Paris"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 8,
    question: "Quem fez o filme O Exterminador do Futuro?",
    answers: ["Arnold Schwarzenegger"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 9,
    question: "Qual a empresa que o Edgar tanto ama?",
    answers: ["Unilever"],
    isAnswered: false,
    userInput: "",
  },
  {
    id: 10,
    question: "O que o Vitão mais ama Dar?",
    answers: ["Aula"],
    isAnswered: false,
    userInput: "",
  },
];

let currentQuestion = 0;

// Score
let score = 0;

// countdown game time second
let time = 60;
let timeID = 0;

// Document Elements
const divQuestion = document.querySelector(".question");
const inpUser = document.querySelector("#userInput");
let btnSubmit = document.querySelector(".submit");
let divScore = document.querySelector(".score");
let divTimer = document.querySelector(".timer");
let audio = document.getElementById("audio");

// Get the modal
var modal = document.getElementById("myModal");

// events
btnSubmit.addEventListener("click", () => onSubmit());
inpUser.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onSubmit();
  }
});

const displayNextQuestion = () => {
  // get unanswered awaiting questions
  const nextQuestion = questions.filter((question) => !question.isAnswered);
  // if all questions answered go to result page
  if (!nextQuestion || nextQuestion.length < 1) {
    return (window.location.href = `./result.html?score=${score}&total=${questions.length}`);
  }

  // Random question
  // display random question if unanswered questions are more than 1
  if (nextQuestion.length > 1) {
    const randomIndex = generateRandomNumber(nextQuestion.length);
    divQuestion.textContent = nextQuestion[randomIndex].question;
    currentQuestion = nextQuestion[randomIndex].id;
    return nextQuestion[randomIndex];
  }

  divQuestion.textContent = nextQuestion[0].question;
  currentQuestion = nextQuestion[0].id;
  return nextQuestion[0];
};

const timerStart = () => {
  if (!isGameStarted) return clearInterval(timeID);
  timeID = setInterval(() => {
    time = time - 1;
    divTimer.textContent = time;

    // stop timer when hits 0
    if (time === 0) {
      isGameStarted = false;
      modal.style.display = "block";
      clearInterval(timeID);
    }
  }, 1000);
};

// on button Click
const onSubmit = () => {
  soundClicked();

  if (inpUser.value.length < 1 || inpUser.value === "" || inpUser.value === " ")
    return null;
  if (!isGameStarted) return null;
  questions.map((question) => {
    if (question.id !== currentQuestion) return null;
    question.userInput = inpUser.value;
    question.isAnswered = true;

    // update answer
    const isAnswerCorrect = checkAnswer(question.answers, inpUser.value);
    if (isAnswerCorrect) score++;

    // clear input
    inpUser.value = "";
    // focus to input after submit button clicked
    inpUser.focus();
  });

  displayNextQuestion();
};

// Check user answer and update the data.
const checkAnswer = (correctAnswers, userAnswer) => {
  return correctAnswers.some((answer) => answer.toLowerCase() === userAnswer.toLowerCase());
};

// button click sound
const soundClicked = () => {
  audio.pause();
  audio.currentTime = -1;
  audio.play();
};

// Random number for random question
const generateRandomNumber = (limit) => {
  return Math.floor(Math.random() * limit);
};

displayNextQuestion();
timerStart();
inpUser.value = "";
