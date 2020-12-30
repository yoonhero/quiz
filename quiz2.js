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
    X_audio.currentTime = 0;
    O_audio.currentTime = 0;
    var currentTime = Date.now();

    interval = setInterval(() => {
        clock_audio.currentTime = 0;
        clock_audio.play();
        var thisTime = Date.now();
        if (time > 0) {
            time = 10 - Math.floor((thisTime - currentTime) / 1000);
            timeText.innerText = String(time);
        }

        if (time < 7) {
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
    X_audio.currentTime = 0;
    O_audio.currentTime = 0;
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
}

function showHardQuestion(question) {
    X_audio.currentTime = 0;
    O_audio.currentTime = 0;
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
        question: "타이타닉의 구명 보트에는 몇 명이 탈수 있을까?",
        answer: "구명",
        hints: "ㄱㅁ",
    },
    {
        question: "서울시민 모두가 동시에 외치면 무슨 말이 될까?",
        answer: "천만의 말씀",
        hints: "ㅊㅁㅇ ㅁㅆ",
    },
    {
        question: "고기 먹을 때마다 따라오는 개는?",
        answer: "이쑤시개",
        hints: "ㅇ쑤ㅅㄱ",
    },
    {
        question: " 별 중에 가장 슬픈 별은?",
        answer: "이별",
        hints: "ㅇ별",
    },
    {
        question: " 진짜 새의 이름은 무엇일까요?",
        answer: "참새",
        hints: "ㅊ새",
    },
    {
        question: "붉은 길에 동전 하나가 떨어져 있다. 그 동전의 이름은?",
        answer: "홍길동전",
        hints: "ㅎㄱ동전",
    },
    {
        question: "세상에서 가장 추운 바다는 어디일까요?",
        answer: "썰렁해",
        hints: "ㅆㄹㅎ",
    },
    {
        question: "중학생과 고등학생이 타는 차는?",
        answer: "중고차",
        hints: "ㅈㄱ차",
    },
    {
        question: "왕이 넘어지면 뭐가될까?",
        answer: "킹콩",
        hints: "ㅋㅋ",
    },
    {
        question: "초등학생이 가장 좋아하는 동네는?",
        answer: "방학동",
        hints: "ㅂㅎ동",
    },
    {
        question: "스타들이 싸우는 모습을 뭐라고 할까?",
        answer: "스타워즈",
        hints: "ㅅㅌㅇㅈ",
    },
    {
        question: "진짜 문제투성이인 것은? ",
        answer: "시험지",
        hints: "ㅅㅎㅈ",
    },
    {
        question: "세 사람만 탈 수 있는 차는?",
        answer: "인삼차",
        hints: "ㅇㅅㅊ",
    },
    {
        question: "폭력배가 많은 나라는?",
        answer: "칠레",
        hints: "ㅊㄹ",
    },
    {
        question: "차도가 없는 나라는?",
        answer: "인도",
        hints: "ㅇㄷ",
    },
    {
        question: "사람이 일생동안 가장 많이 하는 소리는?",
        answer: "숨소리",
        hints: "ㅅ소리",
    },
    {
        question: "병아리가 제일 잘 먹는 약은?",
        answer: "삐약",
        hints: "ㅃ약",
    },
    {
        question: "개 중에 가장 아름다운 개는?",
        answer: "무지개",
        hints: "ㅁㅈㄱ",
    },
    {
        question: "걱정이 많은 사람이 오르는 산은?",
        answer: "태산",
        hints: "ㅌㅅ",
    },
    {
        question: "묵은 묵인데 먹지 못하는 묵은?",
        answer: "침묵",
        hints: "ㅊㅁ",
    },
    {
        question: "문은 문인데 닫지 못하는 문은?",
        answer: "소문",
        hints: "ㅅㅁ",
    },
    {
        question: "물고기 중에서 가장 학벌이 좋은 물고기는? ",
        answer: "고등어",
        hints: "ㄱㄷㅇ",
    },
    {
        question: " 물은 물인데 사람들이 가장 무서워하는 물은?",
        answer: "괴물",
        hints: "ㄱ물",
    },
    {
        question: "물은 물인데 사람들이 가장 좋아하는 물은?",
        answer: "선물",
        hints: "ㅅㅁ",
    },
    {
        question: " 바닷가에서는 해도 되는 욕은?",
        answer: "해수욕",
        hints: "ㅎㅅㅇ",
    },
    {
        question: "아홉 명의 자식을 세자로 줄이면? ",
        answer: "아이구",
        hints: "ㅇㅇㄱ",
    },
    {
        question: "전쟁 중에 장군이 가장 받고 싶어하는 복은?",
        answer: "항복",
        hints: "ㅎㅂ",
    },
    {
        question: "창으로 찌르려고 할 때 하는 말은?",
        answer: "창피해",
        hints: "ㅊㅍㅎ",
    },
    {
        question: " 탈 중에 쓰지 못하는 탈은?",
        answer: "배탈",
        hints: "ㅂ탈",
    },
    {
        question: "파리 중에 가장 무거운 파리는? ",
        answer: "돌팔이",
        hints: "ㄷㅍㅇ",
    },
    {
        question: "청소하는 여자를 세 자로 줄이면?",
        answer: "청소년",
        hints: "ㅊㅅㄴ",
    },
    {
        question: "남이 먹어야 맛있는 것은?",
        answer: "골탕",
        hints: "ㄱ탕",
    },
    {
        question: "이상한 사람들이 모이는 곳은? ",
        answer: "치과",
        hints: "ㅊㄱ",
    },
    {
        question: "날마다 가슴에 흑심을 품고 있는 것은?",
        answer: "연필",
        hints: "ㅇㅍ",
    },
    {
        question: "인정도 없고, 눈물도 없는 몹쓸 아버지는?",
        answer: "허수아비",
        hints: "ㅎㅅ아비",
    },
    {
        question: "슈퍼맨과 하늘을 같이 날고 있는 말은 무슨 말일까?",
        answer: "슈퍼마리오",
        hints: "ㅅㅍ마리오",
    },
    {
        question: "도둑이 가장 좋아하는 아이스크림은?",
        answer: "보석바",
        hints: "ㅂㅅㅂ",
    },
    {
        question: "도둑이 가장 싫어하는 아이스크림은? ",
        answer: "누가바",
        hints: "ㄴㄱ바",
    },
    {
        question: "먹을수록 덜덜 떨리는 음식은? ",
        answer: "추어탕",
        hints: "ㅊㅇ탕",
    },
    {
        question: "직장에서 가장 무서운 상사는?",
        answer: "불상사",
        hints: "ㅂㅅㅅ",
    },
    {
        question: " 세상 사람들이 가장 좋아하는 영화는?",
        answer: "부귀영화",
        hints: "ㅂㄱ영화",
    },
    {
        question: "찾아오는 손님들 모두와 이상한 관계로 만날 수밖에 없는 의사는?",
        answer: "치과의사",
        hints: "ㅊㄱ의사",
    },
    {
        question: "먹으면 죽는데 안 먹을 수 없는 것은?",
        answer: "나이",
        hints: "ㄴㅇ",
    },
    {
        question: "집에서 매일 먹는 약은?",
        answer: "치약",
        hints: "ㅊ약",
    },
    {
        question: "물 중에서 가장 좋은 물은?",
        answer: "선물",
        hints: "ㅅ물",
    },
    {
        question: "물 없는 사막에서도 할 수 있는 물놀이는? ",
        answer: "사물놀이",
        hints: "ㅅ물놀이",
    },
    {
        question: "도둑이 훔친 돈을 뭐라고 할까?",
        answer: "슬그머니",
        hints: "ㅅㄱ머니",
    },
    {
        question: " 유일하게 날로 먹을 수 있는 오리? ",
        answer: "회오리",
        hints: "ㅎ오리",
    },
    {
        question: "소는 소인데 도저히 무슨 소인지 알 수 없는 소를 4자로 줄이면?",
        answer: "모르겠소",
        hints: "ㅁㄹ겠소",
    },
    {
        question: "처음 만나는 소가 하는 말은?",
        answer: "반갑소",
        hints: "ㅂㄱ소",
    },
    {
        question: "잠자는 소는?",
        answer: "주무소",
        hints: "ㅈㅁ소",
    },
    {
        question: "'미소'의 반대말은?",
        answer: "당기소",
        hints: "ㄷㄱ소",
    },
    {
        question: "쥐가 네 마리 모이면 무엇이 될까? ",
        answer: "쥐포",
        hints: "쥐ㅍ",
    },
    {
        question: " IQ 30이 생각하는 산토끼의 반대말은?",
        answer: "끼토산",
        hints: "ㄲㅌㅅ",
    },
    {
        question: "IQ 60이 생각하는 산토끼의 반대말은? ",
        answer: "집토끼",
        hints: "ㅈㅌㄲ",
    },
    {
        question: "IQ 80이 생각하는 산토끼의 반대말은?",
        answer: "죽은토끼",
        hints: "ㅈㅇ토끼",
    },
    {
        question: "IQ 100이 생각하는 산토끼의 반대말은?",
        answer: "바다토끼",
        hints: "ㅂㄷ토끼",
    },
    {
        question: "IQ 110이 생각하는 산토끼의 반대말은? ",
        answer: "판토끼",
        hints: "ㅍ토끼",
    },
    {
        question: "IQ 120이 생각하는 산토끼의 반대말은? ",
        answer: "알칼리토끼",
        hints: "ㅇㅋㄹ토끼",
    },
    {
        question: "꽃이 제일 좋아하는 벌은? ",
        answer: "재벌",
        hints: "ㅈ벌",
    },
    {
        question: "호주의 술은?",
        answer: "호주",
        hints: "ㅎㅈ",
    },
    {
        question: "호주의 떡은?",
        answer: "호떡",
        hints: "ㅎ떡",
    },
    {
        question: "호주의 돈은? ",
        answer: "호주머니",
        hints: "ㅎㅈㅁㄴ",
    },
    {
        question: " 가장 쓸모없는 구리는?",
        answer: "멍텅구리",
        hints: "ㅁㅌ구리",
    },
    {
        question: "서울에 있는 대학은 무엇이라 하는가? ",
        answer: "서울대",
        hints: "ㅅㅇㄷ",
    },
    {
        question: "서울에서 약간 먼 대학은 무엇이라 하는가? ",
        answer: "서울약대",
        hints: "ㅅㅇㅇㄷ",
    },
    {
        question: "물고기의 반대말은?",
        answer: "불고기",
        hints: "ㅂㄱㄱ",
    },
    {
        question: "노인들이 가장 좋아하는 폭포는?",
        answer: "나이아가라폭포",
        hints: "ㄴㅇㅇㄱㄹ폭포",
    },
    {
        question: "사자를 끓이면?",
        answer: "동물의왕국",
        hints: "ㄷㅁㅇㅇㄱ",
    },
    {
        question: "뽀가 지구를 떠나면",
        answer: "뽀빠이",
        hints: "ㅃㅃㅇ",
    },
    {
        question: "금성에 사는 나나가 지구에 온것을 5글자",
        answer: "지구온난화",
        hints: "ㅈㄱㅇㄴㅎ",
    },
    {
        question: "잘생긴 부처는?",
        answer: "부처핸섬",
        hints: "부처ㅎㅅ",
    },
    {
        question: "정말 멋진 신사가 자기 소개하는것은",
        answer: "신사임당",
        hints: "신사ㅇㄷ",
    },
    {
        question: "어부가 제일 싫어 하는 연예인은?",
        answer: "배철수",
        hints: "ㅂㅊㅅ",
    },
    {
        question: "세상에서 제일 뜨거운 과일은?",
        answer: "천도복숭아",
        hints: "ㅊㄷ복ㅅㅇ",
    },
    {
        question: "꽃이 가장 싫어하는 도시는?",
        answer: "시드니",
        hints: "ㅅㄷㄴ",
    },
];