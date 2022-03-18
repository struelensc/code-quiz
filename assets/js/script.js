// Timer handles
var timeEl = document.querySelector(".timer");
var secondsLeft = 75;
timeEl.textContent = secondsLeft;

// Document handles
var main = document.querySelector("main");
var titlePage = document.querySelector("#titlePage");
var quizPage = document.querySelector("#quizPage");
var resultsPage = document.querySelector("#resultsPage");
var highscores = document.querySelector("#highscores");
var pages = [titlePage, quizPage, resultsPage, highscores];
var correctAnswers = 0;
var submitEL = main.querySelector("#submit");
var score = resultsPage.querySelector("#score");

// Quiz question objects
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

var questionArr = [quizQuestion1, quizQuestion2, quizQuestion3, quizQuestion4, quizQuestion5];
var questionArrState = 0;

// Generates title page on load and adds event listener for starting the game for the start game button
window.addEventListener("load", function() {
for (let i = 0; i < pages.length; i++) {
        var state = pages[i].getAttribute("data-state")
        
        if (state === "none"){
            pages[i].style.display = "none";
        }
    }


    // Starts game and timer
    startGame.addEventListener("click", function () {    
        var titlePage = main.querySelector("#titlePage");
        titlePage.style.display = "none";

        var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
    
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            // generate results page
        }
    
        }, 1000);

        generateQuizPage(questionArrState);
    });
});

// Generates looping quiz questions
function generateQuizPage(index) {
    quizPage.style.display = "block";
    var questionAnswers = main.querySelector("#multipleChoice");
    var questionTitle = main.querySelector("#question");
    questionTitle.textContent = questionArr[index].question;

    var options = questionArr[index].answers;

    for (let i = 0; i < options.length; i++) {
        var listItem = document.createElement("li");
        listItem.setAttribute("id", i);
        listItem.textContent = options[i];
        questionAnswers.appendChild(listItem);

        listItem.addEventListener("click", questionResult);
    }
}

function questionResult (event){
    var element = event.target;
    var i = element.getAttribute("id");
    var result = quizPage.querySelector("#questionResult");

    if (questionArrState < (questionArr.length - 1)) {
        // If answer is correct
        if (i == questionArr[questionArrState].correctAnswerIndex){
            result.textContent = "Correct!";
            correctAnswers = correctAnswers + 1;
        // If answer is wrong
        } else {
            secondsLeft = secondsLeft - 10;
            result.textContent = "Wrong!";
        }
    // Terminates if all questions have been answered
    } else {
        console.log("end of game");
        generateResults(correctAnswers);
        return;
    }

    quizPage.style.display = "none";
    quizPage.querySelector("ol").innerHTML = "";

    questionArrState++;
    generateQuizPage(questionArrState);
}

function generateResults() {
    quizPage.style.display = "none";
    resultsPage.style.display = "block";

    score.textContent = correctAnswers * 20;
    submitEL.addEventListener("click", formHandler);
    localStorage.setItem("score", score);
}

function formHandler(event) {
    event.preventDefault();
    var initialsEl = main.querySelector("#initials");

    var initials = initialsEl.value;
    localStorage.setItem("initials", initials);
}
