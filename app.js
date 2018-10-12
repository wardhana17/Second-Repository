
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " out of  " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("A baseball stick and a ball cost $1.10. The baseball stick cost $1 more than the ball. How much does the ball cost?", ["$0.10", "$0.20", "$1.00", "$0.05"], "$0.05"),
    new Question("If it takes 5 machines 5 minutes to make 5 tools, than how long would it take 100 machines to make 100 tools?", ["10 minutes", "5 minutes", "100 minutes", "50 minutes"], "5 minutes"),
    new Question("In a lake, there is a patch of lilypads. Everyday, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take to cover half the lake?", ["12 Days", "24 Days", "36 Days", "47 Days"], "47 Days"),
    new Question("If there are four apples, and you took three apples, how many do you have?", ["3 apples", "1 apple", "2 apples", "no apples"], "3 apples"),
    new Question("Daniel has 4 daughters, each of his daughters has a brother, How many children does Daniel have?", ["8 children", "4 children", "5 children", "8 children"], "5 children"),
];

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();