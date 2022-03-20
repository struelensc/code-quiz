// Timer handles
var timeEl = document.querySelector(".timer");
var timerInterval;
var secondsLeft = 75;
timeEl.textContent = secondsLeft;

// Page specific handles
var main = document.querySelector("main");
var titlePage = document.querySelector("#titlePage");
var quizPage = document.querySelector("#quizPage");
var resultsPage = document.querySelector("#resultsPage");
var highscoresPage = document.querySelector("#highscores");
var pages = [titlePage, quizPage, resultsPage, highscoresPage];

// Document handles
var correctAnswers = 0;
var submitEL = main.querySelector("#submit");
var score = resultsPage.querySelector("#score");
var highscoresEL = document.querySelector("#highscoresEL");
var highscoresTable = main.querySelector("#highscoreList");
var goBack = main.querySelector("#goBack");
var clearHS = main.querySelector("#clearHS");

// Quiz question objects and variables
var quizQuestion1 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    correctAnswerIndex: 3,
    answers: ["Javascript", "Terminal/Bash", "For Loops", "console.log"]
};

var quizQuestion2 = {
    question: "What HTML tag is used to define a list item?:",
    correctAnswerIndex: 0,
    answers: ["<li>", "<s>", "<u>", "<ul>"]
};

var quizQuestion3 = {
    question: "What is a JavaScript element that represents either TRUE or FALSE values?",
    correctAnswerIndex: 2,
    answers: ["RegExp", "Condition", "Boolean", "Event"]
};

var quizQuestion4 = {
    question: "What is the name of CSS design that calls for fluid and adaptable elements based on the device resolution or size?",
    correctAnswerIndex: 3,
    answers: ["Cascading", "Evolution", "Shifting", "Responsive"]
};

var quizQuestion5 = {
    question: "What continues through a block of code as long as the specified condition remains TRUE?",
    correctAnswerIndex: 1,
    answers: ["Else Loop", "For Loops", "Functions", "If Statements"]
};

var questionArr = [quizQuestion1, quizQuestion2, quizQuestion3, quizQuestion4, quizQuestion5];
var questionArrState = 0;

// Generates title page on load and adds event listener for starting the game for the start game button
window.addEventListener("load", generateTitlePage);

function generateTitlePage() {
    quizPage.style.display = "none";
    resultsPage.style.display = "none";
    highscoresPage.style.display = "none";
    titlePage.style.display = "block"

    highscoresEL.addEventListener("click", generateHighscores);

    // Starts game and timer
    startGame.addEventListener("click", function () {    
        var titlePage = main.querySelector("#titlePage");
        titlePage.style.display = "none";

        timerInterval = setInterval(function() {
            secondsLeft--;
            timeEl.textContent = secondsLeft;
        
            if(secondsLeft === 0) {
                clearInterval(timerInterval);
                generateResults(correctAnswers);
            };
        }, 1000);

        generateQuizPage(questionArrState);
    });
};

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
    };
};

// Handles keeping track of score
function questionResult (event){
    var element = event.target;
    var i = element.getAttribute("id");
    var result = quizPage.querySelector("#questionResult");

    if (questionArrState < (questionArr.length - 1)) {
        // If answer is correct
        if (i == questionArr[questionArrState].correctAnswerIndex){
            result.textContent = "Correct!";
            correctAnswers++;
        // If answer is wrong
        } else {
            secondsLeft = secondsLeft - 10;
            result.textContent = "Wrong!";
        };
    // Terminates if all questions have been answered
    } else {
        if (i == questionArr[questionArrState].correctAnswerIndex){
            result.textContent = "Correct!";
            correctAnswers++;
        } else {
            secondsLeft = secondsLeft - 10;
            result.textContent = "Wrong!";
        }
        clearInterval(timerInterval);
        generateResults(correctAnswers);
        return;
    };

    quizPage.style.display = "none";
    quizPage.querySelector("ol").innerHTML = "";

    questionArrState++;
    generateQuizPage(questionArrState);
};

// Generates the results page and form for adding to the highscores
function generateResults() {
    quizPage.style.display = "none";
    resultsPage.style.display = "block";

    var finalScore = correctAnswers * 20;
    score.textContent = finalScore;

    submitEL.addEventListener("click", (event)=> {
        event.preventDefault();
    
        var initialsEl = main.querySelector("#initials");
        var initials = initialsEl.value;

        // Validates that the user entered in something
        if (initials === ""){
            return;
        } else {
            var userInfo = {initials, finalScore};    
            var highscores = [];  
    
            if (!localStorage.getItem("highscores")){
                highscores.push(userInfo);
                localStorage.setItem("highscores", JSON.stringify(highscores));
            } else {
                var existingHighscores = localStorage.getItem("highscores");
    
                highscores = JSON.parse(existingHighscores);
                highscores.push(userInfo);
    
                localStorage.setItem("highscores", JSON.stringify(highscores));
            };
            
            generateHighscores();
        };
    });
};

// Generated highscore page
function generateHighscores() {
    titlePage.style.display = "none";
    quizPage.style.display = "none";
    resultsPage.style.display = "none";

    // Button for Go Back
    goBack.addEventListener("click", function() {
        titlePage.style.display = "block";
        quizPage.style.display = "none";
        resultsPage.style.display = "none";
        highscoresPage.style.display = "none";
    })

    // Button for Clear Highscores
    clearHS.addEventListener("click", function() {
        localStorage.clear();

        while (highscoresTable.lastChild) {
            highscoresTable.removeChild(highscoresTable.lastChild);
        }

        var headers = document.createElement("tr");
        var headerPlayer = document.createElement("th");
        headerPlayer.setAttribute("class", "header");
        var headerScore = document.createElement("th");
        headerScore.setAttribute("class", "header");

        headerPlayer.textContent = "Player";
        headerScore.textContent = "Score";
        headers.appendChild(headerPlayer);
        headers.appendChild(headerScore);

        highscoresTable.appendChild(headers);
    })

    // Checks to see if page is already loaded so it doesn't display local storage information again
    if (highscoresPage.style.display === "none") {
        highscoresPage.style.display = "block";
        var scoreList = [];
        var existingHighscores = localStorage.getItem("highscores");
        scoreList = JSON.parse(existingHighscores);

        if (!localStorage.getItem("highscores")) {
            return;
        } else {
            for (let i = 0; i < scoreList.length; i++) {
                var userLine = document.createElement("tr");
                var userName = document.createElement("th");
                var userScore = document.createElement("th");
    
                userName.textContent = scoreList[i].initials;
                userScore.textContent = scoreList[i].finalScore;
    
                userLine.appendChild(userName);
                userLine.appendChild(userScore);
                highscoresTable.appendChild(userLine);
            };
        }
    } else {
        return;
    }
};