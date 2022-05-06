// API address: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
// API docs address: https://opentdb.com/api_config.php
// xx
// Declare variables

//Define variables for HTML elements
let box1 = document.getElementById("Box1")
let box2 = document.getElementById("Box2")
let box3 = document.getElementById("Box3")
let box4 = document.getElementById("Box4")
let submitButton = document.getElementById("Submit");
let questionText = document.getElementById("question");
let questionNumber = document.getElementById("questionnumber");

let nextQuestionButton = document.querySelector("#Next");
let correctAnswerText = document.querySelector("#correctText");
let playerAnswerText = document.querySelector("#playerAns");
let scoreText = document.querySelector("#score");


//Define variables for current question and score
let currentQuestion = 1;
let score = 0;

async function getToken() {
    let tokenresponse = await fetch("https://opentdb.com/api_token.php?command=request");
    dataToken = await tokenresponse.json();
    apiURL = ("https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple&token=" + dataToken.token);
}

getToken();

// Function to get questions from API
async function getData() {
    wait = await getToken();
    let response = await fetch(apiURL);
    data = await response.json();
    getQuestions();
}

function getQuestions() {    
    question = data.results[(currentQuestion - 1)].question
    correctAnswer = data.results[(currentQuestion - 1)].correct_answer;
    wrongAnswer1 = data.results[(currentQuestion - 1)].incorrect_answers[0];
    wrongAnswer2 = data.results[(currentQuestion - 1)].incorrect_answers[1];
    wrongAnswer3 = data.results[currentQuestion - 1].incorrect_answers[2];
    questionNumber.innerHTML = `Question ${currentQuestion}`;
    questionText.innerHTML = question;
    randomiser();}

// Function to randomise which box contains the correct answer
function randomiser() {
    let randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 0.25){
        box1.innerHTML = correctAnswer;
        box2.innerHTML = wrongAnswer1;
        box3.innerHTML = wrongAnswer2;
        box4.innerHTML = wrongAnswer3;}

    if (randomNumber >= 0.25 && randomNumber < 0.50){
        box1.innerHTML = wrongAnswer1;
        box2.innerHTML = correctAnswer;
        box3.innerHTML = wrongAnswer2;
        box4.innerHTML = wrongAnswer3;}
    
    if (randomNumber >= 0.50 && randomNumber < 0.75){
        box1.innerHTML = wrongAnswer1;
        box2.innerHTML = wrongAnswer2;
        box3.innerHTML = correctAnswer;
        box4.innerHTML = wrongAnswer3;}
    
    if (randomNumber >= 0.75 && randomNumber <= 1){
        box1.innerHTML = wrongAnswer1;
        box2.innerHTML = wrongAnswer2;
        box3.innerHTML = wrongAnswer3;
        box4.innerHTML = correctAnswer;}
    }

//Function to show the correct answer
function showAnswer () {
    correctAnswerText.innerHTML = `The answer is ${correctAnswer}`;
    correctAnswerText.style.visibility = "initial";
    nextQuestionButton.style.visibility = "initial";
    playerAnswerText.style.visibility = "initial";
}

//Function to show the answer boxes at the start of each round
function showAnswerBoxes () {
    box1.style.visibility = "initial";
    box2.style.visibility = "initial";
    box3.style.visibility = "initial";
    box4.style.visibility = "initial";
}

//Function to hide the answer boxes when question is submitted
function hideAnswerBoxes () {
    box1.style.visibility = "hidden";
    box2.style.visibility = "hidden";
    box3.style.visibility = "hidden";
    box4.style.visibility = "hidden";
}

//Function to handle the submission of the answer once player clicks on a box 
function submitAnswer(){
    hideAnswerBoxes();
    showAnswer();
    if (playerAnswer === correctAnswer) {
        playerAnswerText.innerText = `Correct!`;
        score++;
    } else {
        playerAns.innerHTML = `Wrong. You chose ${playerAnswer}`;
    }
}
//Function to hide the result of each round
function hideResult () {
    nextQuestionButton.style.visibility = "hidden";
    correctAnswerText.style.visibility = "hidden";
    playerAnswerText.style.visibility = "hidden";}

//Function to advance to next question
function nextQuestion(){
    currentQuestion++;
    if (currentQuestion === 11) {
        endGame();
    } else {
        showAnswerBoxes();
        hideResult();
        getQuestions();
    };
}

//Listening for clicks on Submit and next question buttons
nextQuestionButton.addEventListener("click", nextQuestion);

//Listening for clicks on boxes
//Functions to assign playerAnswer based on button that's clicked
box1.addEventListener("click", function onClick() {
    playerAnswer = box1.innerHTML;
    submitAnswer();
});

box2.addEventListener("click", function onClick() {
    playerAnswer = box2.innerHTML;
    submitAnswer();
});
box3.addEventListener("click", function onClick() {
    playerAnswer = box3.innerHTML;
    submitAnswer();
});
box4.addEventListener("click", function onClick() {
    playerAnswer = box4.innerHTML;
    submitAnswer();
});

function restartGame(){
    currentQuestion = 1;
    score = 0;
    getToken();
    getData(); 
}
function endGame(){
    questionText.style.visibility = "hidden";
    questionNumber.style.visibility = "hidden";
    hideResult();
    hideAnswerBoxes();
//    scoreText.innerHTML = `Score: ${score}`;
    alert(`End of quiz.\nYou scored ${score} out of 10.`);
    if (confirm("Would you like to play again?") === true) {
        questionText.style.visibility = "initial";
        questionNumber.style.visibility = "initial";
            showAnswerBoxes();
        restartGame();

    } else {
        return
    }
}

hideResult();
getData();


