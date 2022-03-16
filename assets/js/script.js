var timeEl = document.querySelector(".timer");
var secondsLeft = 75;

var page = document.querySelectorAll("");
var main = document.querySelector("body");

console.log(page);

var quizQuestion1 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    correctAnswer: 3,
    answers: ["Javascript", "Terminal/Bash", "For Loops", "console.log"]
}

var quizQuestion2 = {
    question: "What HTML tag is used to define a list item?:",
    correctAnswer: 0,
    answers: ["<li>", "<s>", "<u>", "<ul>"]
}

var quizQuestion3 = {
    question: "What is a JavaScript element that represents either TRUE or FALSE values?",
    correctAnswer: 2,
    answers: ["RegExp", "Condition", "Boolean", "Event"]
}

var quizQuestion4 = {
    question: "What is the name of CSS design that calls for fluid and adaptable elements based on the device resolution or size?",
    correctAnswer: 3,
    answers: ["Cascading", "Evolution", "Shifting", "Responsive"]
}

var quizQuestion5 = {
    question: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
    correctAnswer: 1,
    answers: ["Else Loop", "For Loops", "Conditional Loop", "While Loop"]
}

// Removes element on load
window.addEventListener("load", function() {
    var state = page.dataset.state;

    console.log(state);

    if (state === "hidden"){
        main.removeChild(page);
    };
});

// Timer
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

