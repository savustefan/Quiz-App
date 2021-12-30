// quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// displays the questions
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// answers
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// score
function showScores() {
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// questions pool
let questions = [
    new Question(
        "Where is The School of the Wolf Located?", ["Gwenllech", "Kaer Morhen", "Ard Carraigh", "Kovir"], "Kaer Morhen"
    ),
    new Question(
        "Which of these is NOT One of Geralt's Nicknames?", ["The Butcher of Blaviken", "The White Wolf", "Zireal", "Gwynbleidd"], "Zireal"
    ),
    new Question(
        "In Fallout games, what does V.A.T.S stand for?", ["Very Accurate Targeting System", "Vault-Tec Assisted Targeting System", "Vault-Tec Automatic Targeting System", "ault-Tec Actually Targets Stuff"], "Vault-Tec Assisted Targeting System"
    ),
    new Question(
        "What is the name of the first quest in Fallout 3?", ["One Small Step for Man", "Vault-Dweller's First Day", "Starting Off on the Right Foot", "Baby Steps"], "Baby Steps"
    ),
    new Question(
        "Who is the Protagonist of Dragon Age: Inquisition?", ["The Inquisitor", "Hawke", "Shepard", "Hero of Ferelden"], "The Inquisitor"
    )
];

// start quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// countdown for the quiz
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();