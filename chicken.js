
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
    gameOverHTML += "<h2 id='score'> Total Nilai Anda: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("Harga total tongkat pemukul baseball dan bolanya adalah Rp.110,000. Harga tongkat pemukulnya Rp.100,000 lebih mahal dari pada bolanya. Berapakah Harga Bolahnya? ", ["Rp.5,000", "Rp.10,000", "Rp.20,000", "Rp.50,000"], "Rp.5,000"),
    new Question("Dalam 5 menit, 5 mesin bisa membuat 5 alat. Kalau ada 100 mesin, berapa lama yang dibutuhnya untuk membuat 100 alat?", ["10 menit", "20 menit", "100 menit", "5 menit"], "5 menit"),
    new Question("Didalam sebuah danau, ada daun lily yang bertumbuh 2 kali lipat setiap hari. Kalau daun lilynya bisa menutupi seluruh danau dalam 48 hari, berapa hari yang diperlukan untuk menutupi setengah danau tersebut?", ["12 Hari", "47 Hari", "36 Hari", "24 Hari"], "47 Hari"),
    new Question("Ada 4 buah apel, kamu menggambil 3 apel, berapa yang kamu punya?", ["2 apel", "1 apel", "3 apel", "0 apel"], "3 apel"),
    new Question("Daniel mempunyai 4 putri, setiap putrinya mempunyai kakak yang sama, berapa total anak-anak Daniel?", ["5 Anak", "4 Anak", "8 Anak", "2 Anak"], "5 Anak"),
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