// Timer handles
var timeEl = document.querySelector(".timer");
var secondsLeft = 75;
timeEl.textContent = secondsLeft;

// Document handles
var main = document.querySelector("main");
var pages = [document.querySelector("#titlePage"), document.querySelector("#quizPage"), document.querySelector("#resultsPage"), document.querySelector("#highscores")];

// Title page handles
var titlePage = document.querySelector("#titlePage");
var startGame = document.querySelector("#startGame");


var quizQuestion1 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    correctAnswerIndex: 3,
    answers: ["Javascript", "Terminal/Bash", "For Loops", "console.log"]
}

var quizQuestion2 = {
    question: "What HTML tag is used to define a list item?:",
    correctAnswerIndex: 0,
    answers: ["<li>", "<s>", "<u>", "<ul>"]
}

var quizQuestion3 = {
    question: "What is a JavaScript element that represents either TRUE or FALSE values?",
    correctAnswerIndex: 2,
    answers: ["RegExp", "Condition", "Boolean", "Event"]
}

var quizQuestion4 = {
    question: "What is the name of CSS design that calls for fluid and adaptable elements based on the device resolution or size?",
    correctAnswerIndex: 3,
    answers: ["Cascading", "Evolution", "Shifting", "Responsive"]
}

var quizQuestion5 = {
    question: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
    correctAnswerIndex: 1,
    answers: ["Else Loop", "For Loops", "Conditional Loop", "While Loop"]
}


// Removes element on load
window.addEventListener("load", function() {
    var pages = [document.querySelector("#titlePage"), document.querySelector("#quizPage"), document.querySelector("#resultsPage"), document.querySelector("#highscores")];

    for (let i = 0; i < pages.length; i++) {
        var state = pages[i].getAttribute("data-state");

        if (pages[i].state = "hidden"){
            pages[i].style.visibility = "hidden";
        }
    }
});

// Starts Game
startGame.addEventListener("click", function () {    
    titlePage.style.visibility = "hidden";

    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      }
  
    }, 1000);
});

function generateQuizPage() {
    var quizQuestions = [quizQuestion1, quizQuestion2, quizQuestion3, quizQuestion4, quizQuestion5];

    var titleEL = document.createElement("h2");
    titleEL.textContent = quizQuestion1.question;
    main.append(titleEL);
    console.log(titleEL);

    var multipleChoiceEL = document.createElement("ol");
    main.appendChild(multipleChoiceEL);

    for (let i = 0; i < quizQuestion1.answers.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = quizQuestion1.answers[i];
        multipleChoiceEL.append(listItem);
        console.log(listItem);
    }
}
