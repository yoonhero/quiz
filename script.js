const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const gotoButton = document.getElementById("goTo");
const title = document.getElementById("title");
const questionContainerElement = document.getElementById("question-container");
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

gotoButton.classList.add("hide");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestion, currentQuestionIndex;

const scoreText = document.getElementById("score");
var score = 0;
var count = 0;

var start_music = new Audio("start.mp3");
var end_music = new Audio("end.mp3");

var O_audio = new Audio("O.mp3");
var X_audio = new Audio("X.mp3");

function startGame() {
    start_music.currentTime = 0;
    end_music.currentTime = 0;
    start_music.play();
    end_music.pause();
    score = 0;
    scoreText.innerText = String(score);
    title.classList.add("hide");
    startButton.classList.add("hide");
    shuffledQuestion = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question) {
    O_audio.pause();
    X_audio.pause();
    count++;
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.classList.add("problems");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
        button.disabled = false;
    });
}

function resetState() {
    start_music.play();
    clearStatusClass(document.body);

    nextButton.classList.add("hide");
    gotoButton.classList.add("hide");

    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    X_audio.currentTime = 0;
    O_audio.currentTime = 0;
    var problems = document.getElementById("answer-buttons").childNodes;
    for (var i = 0; i < problems.length; i++) {
        problems[i].disabled = true;
    }
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score += 1;
        scoreText.innerText = String(score);

        O_audio.play();
    } else {
        X_audio.play();
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });
    if (count < 5) {
        nextButton.classList.remove("hide");
    } else {
        count = 0;
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        gotoButton.classList.remove("hide");
        start_music.pause();
        end_music.play();
    }
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

const questions = [{
        question: "그리스 신화에서 나오는 티탄족 이아페토스의 아들이며, '먼저 생각하는 사람'이라는 뜻의 이름인 이 인물은?",
        answers: [
            { text: "프로메테우스", correct: true },
            { text: "아폴론", correct: false },
            { text: "제우스", correct: false },
            { text: "하데스", correct: false },
        ],
    },
    {
        question: "18세기 중엽 영국에서 시작된 기술혁신과 이에 수반하여 일어난 사회 · 경제 구조의 변혁을 무엇이라 할까요?",
        answers: [
            { text: "농업혁명", correct: false },
            { text: "산업혁명", correct: true },
            { text: "상업혁명", correct: false },
        ],
    },
    {
        question: "1627년(인조 때) 만주에 본거를 둔 후금의 침입으로 일어난 조선과 후금 사이의 전쟁인 이것은 무엇일까요?",
        answers: [
            { text: "병자호란", correct: false },

            { text: "임진왜란", correct: false },
            { text: "정묘호란", correct: true },
        ],
    },
    {
        question: "한 입 크기로 만든 중국의 만두로 3,000년 전 부터 중국 남부 광둥(광동)지방에서 만들어 먹기 시작한 이것은 무엇일까요?",
        answers: [
            { text: "만두", correct: false },
            { text: "딤섬", correct: true },
        ],
    },
    {
        question: " 뇌의 신경세포 손상으로 손과 팔에 경련이 일어나고, 보행이 어려워지는 손상을 입는 이 질병은 무엇일까요?",
        answers: [
            { text: "파킨스병", correct: true },
            { text: "백혈병", correct: false },

            { text: "심장마비", correct: false },
        ],
    },
    {
        question: " 타인의 기대나 관심으로 인하여 능률이 오르거나 결과가 좋아지는 현상인 이 효과는 무엇일까요? (교육학 용어로는 로젠탈효과)",
        answers: [
            { text: "나비효과", correct: false },
            { text: "피그말리온효과", correct: true },
            { text: "조명효과", correct: false },
        ],
    },
    {
        question: " 흉측한 얼굴을 가면으로 가린 괴신사가 아름다운 프리마돈나를 짝사랑하는 내용이 담긴 이 뮤지컬의 이름은 무엇일까요?",
        answers: [
            { text: "피터펜", correct: false },
            { text: "걸리버 여행기", correct: false },
            { text: "오페라의 유령", correct: true },
            { text: "노인의 바다", correct: false },
        ],
    },
    {
        question: "이스라엘의 종교적 지도자이자 민족적 영웅으로, 이집트 파라오와 싸워 이겨서 민족 해방을 이룩한 이 인물은 누구일까요?",
        answers: [
            { text: "예수", correct: false },
            { text: "모세", correct: true },
            { text: "부다", correct: false },
            { text: "맹자", correct: false },
        ],
    },
    {
        question: "대한민국에서 면적이 가장 큰 지역은 어디일까요?",
        answers: [
            { text: "경기도", correct: false },

            { text: "강원도", correct: false },
            { text: "경상북도", correct: true },
            { text: "강화도", correct: false },
        ],
    },
    {
        question: "용액의 산성, 염기성을 판단하는데 쓰이는 '종이의 이름'으로 산성은 붉은색, 염기성은 푸른색을 띠운다 이 종이의 이름은?",
        answers: [
            { text: "리트먼스", correct: false },
            { text: "라트머스", correct: false },
            { text: "로트머스", correct: false },
            { text: "리트머스", correct: true },
        ],
    },
    {
        question: "스포츠 종목 중 '마라톤'을 금지하는 페르시아의 후예인 이 나라는 어디일까요? ",
        answers: [
            { text: "이란", correct: true },
            { text: "대한민국", correct: false },
            { text: "터키", correct: false },
            { text: "이집트", correct: false },
        ],
    },
    {
        question: "축구 경기에서 공격팀 선수가 상대편 진영에서 공보다 앞쪽에 있을 때 적용되는 반칙인 이것은 무엇일까요?",
        answers: [
            { text: "오버사이드", correct: false },
            { text: "오프사이드", correct: true },
        ],
    },
    {
        question: " 1997년 12월에 체결 된 지구온난화 온실가스 감축목표의 관한 기후변화 협약서인 이것은 무엇일까요?",
        answers: [
            { text: "도쿄의 정서", correct: false },
            { text: "교토의 정서", correct: true },
            { text: "람사르 협약", correct: false },
        ],
    },
    {
        question: "레오나르도 다빈치가 그린 '최후의 만찬'에서 예수를 포함하여 나오는 인물은 총 몇명일까요?",
        answers: [
            { text: "13명", correct: true },
            { text: "14명", correct: false },
            { text: "12명", correct: false },
            { text: "10명", correct: false },
        ],
    },
    {
        question: "아시아 서남부에 있는 공화국인 '이스라엘'의 수도는 어디일까요?",
        answers: [
            { text: "이스라엘", correct: false },
            { text: "서울", correct: false },
            { text: "카이로", correct: false },
            { text: "예루살렘", correct: true },
        ],
    },
    {
        question: "사자와 친척이 되는 동물은?",
        answers: [
            { text: "늑대", correct: false },
            { text: "개", correct: false },
            { text: "고양이", correct: true },
        ],
    },
    {
        question: "사자가 처음으로 한국으로 들어온 시기는?",
        answers: [
            { text: "고려시대", correct: false },
            { text: "조선시대초", correct: false },
            { text: "대한제국", correct: true },
        ],
    },
    {
        question: "하마가 큰 하품을 하는 이유는?",
        answers: [
            { text: "졸음", correct: false },
            { text: "위협", correct: true },
            { text: "식사", correct: false },
        ],
    },
    {
        question: "기린의 뿔의 개수는?",
        answers: [
            { text: "1개", correct: false },
            { text: "2개", correct: false },
            { text: "5개", correct: true },
        ],
    },
    {
        question: "코알라가 자립할때까지 식사를 하는 곳은?",
        answers: [
            { text: "어미의 입", correct: false },
            { text: "아비의 입", correct: false },
            { text: "어미의 항문", correct: true },
        ],
    },
    {
        question: "고릴라가 먹는 것은?",
        answers: [
            { text: "고기나 곤충", correct: false },
            { text: "나뭇잎 풀", correct: true },
            { text: "모두", correct: false },
        ],
    },
    {
        question: "다람쥐 원숭이가 사는 곳은?",
        answers: [
            { text: "아이슬랜드", correct: false },
            { text: "북한", correct: false },
            { text: "시베리아", correct: false },
            { text: "마다가스카르", correct: true },
        ],
    },
    {
        question: "일각고래의 뿔은 무엇일까요?",
        answers: [
            { text: "턱이 길어진 것", correct: false },
            { text: "이가 길어진 것", correct: true },
            { text: "코가 길어진 것", correct: false },
        ],
    },
    {
        question: "북극곰은 물속에서 얼마나 잠수할 수 있을까?",
        answers: [
            { text: "1분", correct: false },
            { text: "2분", correct: true },
            { text: "5분", correct: false },
        ],
    },
    {
        question: "별자리는 모두 88개이다. 우리나라에서 볼 수 없는 것은?",
        answers: [
            { text: "카멜레온 자리", correct: true },
            { text: "천칭자리", correct: false },
            { text: "전갈자리", correct: false },
        ],
    },
    {
        question: "겨울에 유명한 별자리는?",
        answers: [
            { text: "처녀자리", correct: false },
            { text: "안드로메다 자리", correct: false },
            { text: "오리온 자리", correct: true },
        ],
    },
    {
        question: "항성의 온도가 가장 높을 때 일어나는 빛깔은?",
        answers: [
            { text: "붉은색", correct: false },
            { text: "흰색", correct: false },
            { text: "푸른색", correct: true },
        ],
    },
    {
        question: "태양의 나이는?",
        answers: [
            { text: "약 5000천만년", correct: false },
            { text: "약 5억년", correct: false },
            { text: "약 50억년", correct: true },
        ],
    },
    {
        question: "태양의 지구 사이의 거리는?",
        answers: [
            { text: "약 1억 km", correct: false },
            { text: "약 1.5억 km", correct: true },
            { text: "약 2억 km", correct: false },
        ],
    },
    {
        question: "태양은 무엇이 타서 빛을 낼까?",
        answers: [
            { text: "우라늄", correct: false },
            { text: "티타늄", correct: false },
            { text: "수소가스", correct: true },
        ],
    },
    {
        question: "거미는 우주선에서 거미줄을 칠 수 있을까?",
        answers: [
            { text: "O", correct: true },
            { text: "X", correct: false },
            { text: "작은 거미만 O", correct: false },
        ],
    },
    {
        question: "우주선에서 내리는 눈의 결정은?",
        answers: [
            { text: "십이각형", correct: false },
            { text: "원", correct: true },
            { text: "모양이 가지 각색", correct: false },
        ],
    },
    {
        question: "최초로 우주비행한 동물은?",
        answers: [
            { text: "침팬지", correct: false },
            { text: "개", correct: true },
            { text: "고양이", correct: false },
        ],
    },
    {
        question: "현재 실존하는 자동차는?",
        answers: [
            { text: "전기자동차", correct: true },
            { text: "원자력자동차", correct: false },
            { text: "수력자동차", correct: false },
        ],
    },
    {
        question: "다음산중 제이일 높은 산?",
        answers: [
            { text: "한라산", correct: false },
            { text: "지리산", correct: true },
            { text: "태백산", correct: false },
        ],
    },
    {
        question: "세계에서 가장 큰 섬은?",
        answers: [
            { text: "그린랜드", correct: true },
            { text: "오세아니아", correct: false },
            { text: "마다가스카르", correct: false },
        ],
    },
    {
        question: "세계에서 제이일 긴 강?",
        answers: [
            { text: "나일강", correct: true },
            { text: "아마존강", correct: false },
            { text: "미시시피간", correct: false },
        ],
    },
    {
        question: "본래 다이아몬드와 같은 것은?",
        answers: [
            { text: "석탄", correct: true },
            { text: "수정", correct: false },
            { text: "금", correct: false },
        ],
    },
    {
        question: "남극과 북극 어디가 더 추울까?",
        answers: [
            { text: "남극", correct: true },
            { text: "북극", correct: false },
            { text: "같다", correct: false },
        ],
    },
    {
        question: "비가 내릴때 어떤 모양으로 내릴까?",
        answers: [
            { text: "원", correct: false },
            { text: "물방울", correct: false },
            { text: "호빵모양", correct: true },
        ],
    },
    {
        question: "눈의 결정은 어떤 모양을 하고 있을까?",
        answers: [
            { text: "삼각형", correct: false },
            { text: "육각형", correct: true },
            { text: "여러가지", correct: false },
        ],
    },
    {
        question: "1m에 눈이 녹으면 물의 높이는?",
        answers: [
            { text: "약 1m", correct: false },
            { text: "약 50cm", correct: false },
            { text: "약 10cm", correct: true },
        ],
    },
    {
        question: "아프리카에서 가장 높은 산은 눈이 내릴까?",
        answers: [
            { text: "안내린다", correct: false },
            { text: "1년에 1번 정도", correct: false },
            { text: "만년설", correct: true },
        ],
    },
    {
        question: "막대자석에 못을 붙게 했을때 가장 많이 붙는 곳은?",
        answers: [
            { text: "양쪽끝", correct: true },
            { text: "중앙", correct: false },
            { text: "모두 같다", correct: false },
        ],
    },
    {
        question: "자석에 열을 가하면?",
        answers: [
            { text: "N극 S극이 뒤바뀐다", correct: false },
            { text: "힘이 없어진다", correct: true },
            { text: "변화가 없다", correct: false },
        ],
    },
    {
        question: "다음중 실제로 있는 식물은?",
        answers: [
            { text: "개미지옥", correct: false },
            { text: "파리지옥", correct: true },
            { text: "모기지옥", correct: false },
        ],
    },
    {
        question: "다음중 실제로 있는 나무는?",
        answers: [
            { text: "캐멜", correct: false },
            { text: "사포딜라", correct: true },
            { text: "홉슨즈", correct: false },
        ],
    },
    {
        question: "냉장고는 어떻게 냉각시킬까?",
        answers: [
            { text: "얼음덩어리", correct: false },
            { text: "파이프 속 물", correct: false },
            { text: "특수 가스", correct: true },
        ],
    },
];