const hardquestionContainerElement = document.getElementById(
    "hard-question-container"
);
const nextHardButton = document.getElementById("hard-next-btn");
const OKbutton = document.getElementById("btn-ok");
const hardquestion = document.getElementById("hardquestion");
startButtonHard.addEventListener("click", startHardGame);
nextHardButton.addEventListener("click", () => {
    currentQuestionIndex++;
    HardsetNextQuestion();
});
OKbutton.addEventListener("click", confirmAnswer);

gotoButton.classList.add("hide");
const hintsText = document.getElementById("hints");
const hints_container = document.getElementById("hints-container");
const inputText = document.getElementById("value");
var score = 0;
var count = 0;
var time = 10;
var start_music = new Audio("start.mp3");
var end_music = new Audio("end.mp3");

var O_audio = new Audio("O.mp3");
var X_audio = new Audio("X.mp3");
var clock_audio = new Audio("clock.wav");

function startHardGame() {
    startButton.classList.add("hide");
    startButtonHard.classList.add("hide");
    start_music.currentTime = 0;
    end_music.currentTime = 0;
    start_music.play();
    end_music.pause();

    score = 0;
    scoreText.innerText = String(score);
    title.classList.add("hide");
    shuffledQuestion = hardquestions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    hardquestionContainerElement.classList.remove("hide");
    HardsetNextQuestion();
}

function HardsetNextQuestion() {
    HardresetState();
    showHardQuestion(shuffledQuestion[currentQuestionIndex]);
}

function settimer() {
    var currentTime = Date.now();

    interval = setInterval(() => {
        clock_audio.currentTime = 0;
        clock_audio.play();
        var thisTime = Date.now();
        if (time > 0) {
            time = 10 - Math.floor((thisTime - currentTime) / 1000);
            timeText.innerText = String(time);
        }

        if (time < 3) {
            hints_container.classList.remove("hide");
            hintsText.innerText = shuffledQuestion[currentQuestionIndex].hints;
        }
        if (time <= 0) {
            count++;
            clock_audio.pause();
            time = 10;
            OKbutton.classList.add("hide");
            X_audio.play();
            clearInterval(interval);
            setStatusClass(document.body, false);
            if (count < 5) {
                nextHardButton.classList.remove("hide");
            } else {
                count = 0;
                startButtonHard.innerText = "Restart";
                startButtonHard.classList.remove("hide");
                gotoButton.classList.remove("hide");
                start_music.pause();
                end_music.play();
            }
        }
    }, 1000);
}

function confirmAnswer() {
    OKbutton.classList.add("hide");
    count++;
    clearInterval(interval);
    const value = document.getElementById("value").value;
    inputText.value = "";
    if (value == shuffledQuestion[currentQuestionIndex].answer) {
        setStatusClass(document.body, true);
        O_audio.play();
        score++;
        scoreText.innerText = String(score);
    } else {
        X_audio.play();
        setStatusClass(document.body, false);
    }
    if (count < 5) {
        nextHardButton.classList.remove("hide");
    } else {
        count = 0;
        startButtonHard.innerText = "Restart";
        startButtonHard.classList.remove("hide");
        gotoButton.classList.remove("hide");
        start_music.pause();
        end_music.play();
    }
}

function showHardQuestion(question) {
    scoreText.innerText = String(score);
    hints_container.classList.add("hide");
    OKbutton.classList.remove("hide");
    inputText.value = "";
    O_audio.pause();
    X_audio.pause();
    hardquestion.innerText = question.question;
    settimer();
}

function HardresetState() {
    time = 10;
    timeText.innerText = String(time);
    start_music.play();
    clearStatusClass(document.body);

    nextHardButton.classList.add("hide");
    gotoButton.classList.add("hide");
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("wrong");
    element.classList.remove("correct");
}

const hardquestions = [{
        question: "2+2=?",
        answer: "4",
        hints: "ㅅ",
    },
    {
        question: "2+3=?",
        answer: "5",
        hints: "ㅇ",
    },
    {
        question: "2+4=?",
        answer: "6",
        hints: "ㅇ",
    },
    {
        question: "2+1=?",
        answer: "3",
        hints: "ㅅ",
    },
    {
        question: "5+4=?",
        answer: "9",
        hints: "ㄱ",
    },
    {
        question: "0+4=?",
        answer: "4",
        hints: "ㅅ",
    },
];