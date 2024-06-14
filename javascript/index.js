// dont start the game and timer if game is not started yet
let isGameStarted = true;

// put your questions in array with JSON object
// do not put 0 to ID => start from 1 and more // Make sure each ID is uniqe
// id will help us to track which question we are working on.
let questions = [
  {
    id: 1,
    question: "Qual a cor do céu?",
    answer: "azul",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 2,
    question: "Se você congelar água, o que você obtém?",
    answer: "gelo",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 3,
    question: "Qual estado é famoso por Hollywood?",
    answer: "Califórnia",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 4,
    question: "Quantos pares de asas as abelhas têm?",
    answer: "Dois",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 5,
    question: "Onde está a Grande Pirâmide de Gizé?",
    answer: "Egito",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 6,
    question: "Qual é o maior planeta do nosso sistema solar?",
    answer: "Júpiter",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 7,
    question: "Qual é a capital da França?",
    answer: "Paris",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 8,
    question: "Qual é o símbolo químico da água?",
    answer: "H2O",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 9,
    question: "Em que ano o Titanic afundou?",
    answer: "1912",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 10,
    question: "Qual é o menor país do mundo?",
    answer: "Cidade do Vaticano",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 11,
    question: "Qual é a substância natural mais dura da Terra?",
    answer: "Diamante",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 12,
    question: "Quantos continentes existem?",
    answer: "Sete",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 13,
    question: "Quem escreveu 'Romeu e Julieta'?",
    answer: "William Shakespeare",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 14,
    question: "Qual é o ingrediente principal do sushi?",
    answer: "Arroz",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 15,
    question: "Quantos dentes tem um humano adulto?",
    answer: "32",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 16,
    question: "Qual é a montanha mais alta do mundo?",
    answer: "Monte Everest",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 17,
    question: "Qual planeta é conhecido como o Planeta Vermelho?",
    answer: "Marte",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 18,
    question: "Qual é o maior oceano da Terra?",
    answer: "Pacífico",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 19,
    question: "Quantos ossos há no corpo humano?",
    answer: "206",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 20,
    question: "Qual é a capital do Japão?",
    answer: "Tóquio",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 21,
    question: "Quem fez o filme Terminador do Futuro?",
    answer: "Arnold Schwarzenegger",
    isAnswered: false,
    userInput: "",
  },
];

let currentQuestion = 0;

// Score
let score = 0;

// coundown game time second
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
  // get unAnswered awaiting questions
  const nextQuestion = questions.filter((question) => !question.isAnswered);
  // if all questions answered go to result page
  if (!nextQuestion || nextQuestion.length < 1) {
    return (window.location.href = `./result.html?score=${score}&total=${questions.length}`);
  }

  // Random question
  // display random question if unAnswered questions are more then 1
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
    const isAnswerCorrect = checkAnswer(question.answer, inpUser.value);
    if (isAnswerCorrect) score++;

    // clear input
    inpUser.value = "";
    // focus to input after submit button clicked
    inpUser.focus();
  });

  displayNextQuestion();
};

// Check user answer and update the data.
const checkAnswer = (correctAnswer, userAnswer) => {
  if (correctAnswer.toLowerCase() === userAnswer.toLowerCase()) return true;
  return false;
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
