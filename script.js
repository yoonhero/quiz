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
        question: "다음산중 두번째로 높은 산?",
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
    {
        question: "조선의 제14대 왕입니다 고종과 함께 무능한 왕으로 알려졌으며, 재위 후반에 임진왜란이 발발하였습니다. 이 왕은?",
        answers: [
            { text: "인조", correct: false },
            { text: "광해군", correct: false },
            { text: "선조", correct: true },
        ],
    },
    {
        question: "조선 중기에 지었다고 하는 고전소설인 '홍길동전'의 저자는?",
        answers: [
            { text: "허균", correct: true },
            { text: "허난설현", correct: false },
            { text: "홍길동", correct: false },
        ],
    },
    {
        question: "이탈리아의 물리학자 및 천문학자. '그래도 지구는 돈다' 라는 명언을 남긴 이 인물은?",
        answers: [
            { text: "뉴턴", correct: false },
            { text: "허블", correct: false },
            { text: "갈릴레오 갈릴레이", correct: true },
            { text: "갈릴레이 갈릴레오", correct: false },
        ],
    },
    {
        question: "노벨문학상을 수상한 미국의 소설가이자, 소설 '노인과 바다'의 저자는?",
        answers: [
            { text: "JK 롤링", correct: false },
            { text: "허밍웨이", correct: true },
            { text: "쥘 베른", correct: false },
        ],
    },
    {
        question: "음악의 아버지는 바흐입니다. 그렇다면 의학의 아버지는 누구일까요?",
        answers: [
            { text: "허준", correct: false },
            { text: "히포크라테스", correct: true },
        ],
    },
    {
        question: "화폐가치가 하락하여 물가가 전반적·지속적으로 상승하는 경제적 현상은?",
        answers: [
            { text: "인플레이션", correct: true },
            { text: "구제금융", correct: false },
        ],
    },
    {
        question: "삼국지에서 유비·관우·장비가 복숭아 밭에서 의형제를 맺은데서 비롯된 이 고사성어는?",
        answers: [
            { text: "인과응보", correct: false },
            { text: "종두득두", correct: false },
            { text: "도원결의", correct: true },
        ],
    },
    {
        question: "곤충의 몸통은 세 가지의 부분으로 나뉩니다. 이 세가지의 기준은?",
        answers: [
            { text: "머리, 배, 꼬리", correct: false },
            { text: "머리, 가슴, 꼬리", correct: false },
            { text: "머리, 가슴, 배", correct: true },
        ],
    },
    {
        question: "조선시대 서울에 설치했던 최고의 교육기관은?",
        answers: [
            { text: "규장각", correct: false },
            { text: "성균관", correct: true },
            { text: "경연", correct: false },
        ],
    },
    {
        question: "해커집단이 밝힌 전세계적으로 가장 흔하게 쓰인 최악의 패스워드는 무엇일까요? (6글자)",
        answers: [
            { text: "000000", correct: false },
            { text: "123456", correct: true },
        ],
    },
    {
        question: "정식 명칭은 중앙공안정보기관. 1951년 총리 직속기관으로 설립된 이스라엘의 비밀정보기관은?",
        answers: [
            { text: "모사드", correct: true },
            { text: "FBI", correct: false },
            { text: "CIA", correct: false },
        ],
    },
    {
        question: "2차세계대전 당시에 연합군 최고사령관으로 노르망디 상륙작전을 총 지휘한 이 인물은?",
        answers: [
            { text: "맥아더", correct: false },
            { text: "드와이트 아이젠하워", correct: true },
        ],
    },
    {
        question: "'하루라도 책을 읽지 않으면 입속에 가시다 돋는다'라는 명언을 남긴 우리나라 독립운동가는?",
        answers: [
            { text: "윤봉길", correct: false },
            { text: "안중근", correct: true },
            { text: "김구", correct: false },
        ],
    },
    {
        question: "숙종과 장희빈의 아들로 출생한 조선의 제 20대왕. 재위동안 노론, 소론 당쟁의 절정기였다.",
        answers: [
            { text: "숙종", correct: false },
            { text: "철종", correct: false },
            { text: "경종", correct: true },
        ],
    },
    {
        question: "수학의 아버지는 누구일까요?",
        answers: [
            { text: "피타고라스", correct: true },
            { text: "가우스", correct: false },
            { text: "유클리드", correct: false },
        ],
    },
    {
        question: "컴퓨터간에 정보를 주고 받을 때의 통신 방법에 대한 규칙과 약속. 통신의 규약을 의미하는 이것은?",
        answers: [
            { text: "네트워크", correct: false },
            { text: "인터넷", correct: false },
            { text: "프로토콜", correct: true },
        ],
    },
    {
        question: "고대 게르만족의 신으로, 던지기만 하면 반드시 적을 쓰러트린다는 '묠니르'라는 철퇴를 사용한다. 이 인물은?",
        answers: [
            { text: "토르", correct: true },
            { text: "로키", correct: false },
        ],
    },
    {
        question: "1498년(연산군) 김일손 등 신진사류가 유자광 중심의 훈구파에게 화를 입은 사건.",
        answers: [
            { text: "갑자사화", correct: false },
            { text: "기묘사화", correct: false },
            { text: "무오사화", correct: true },
        ],
    },
    {
        question: "제우스와 세멜레 사이에서 태어난 아들로 로마신화에서는 바카스라고도 하며, 술의 신이라고 불리는 이 인물은?",
        answers: [
            { text: "디오니소스", correct: true },
            { text: "아폴론", correct: false },
        ],
    },
    {
        question: "하드디스크 전문 업체인 웨스턴디지털이 지난 2015년 10월에 플래시 메모리 강자인 이 기업을 약 21조에 인수했다 이 기업은?",
        answers: [
            { text: "WD", correct: false },
            { text: "샌디스크", correct: true },
        ],
    },
    {
        question: "척추동물의 적혈구 속에 있는 색소 단백질로 혈액이 붉은것은 적혈구 속 이것의 색깔 때문이다.",
        answers: [
            { text: "하모글로빈", correct: false },
            { text: "케모글로빈", correct: false },
            { text: "헤모글로빈", correct: true },
        ],
    },
    {
        question: "현실적으로는 아무데도 존재하지 않는 이상한 나라. 이상향을 가리키는 말로 꿈의 장소를 일컫는다.",
        answers: [
            { text: "라퓨타", correct: false },
            { text: "유토피아", correct: true },
            { text: "이상한 나라의 엘리스", correct: false },
        ],
    },
    {
        question: "해열·소염 진통제이자 혈전예방약으로 혈관 질환의 위험성을 감소시키는 목적으로 사용되는 이약은?",
        answers: [
            { text: "장티푸스", correct: false },
            { text: "마약", correct: false },
            { text: "아스피린", correct: true },
        ],
    },
    {
        question: "2017년 10월 인텔에서 공식 출시한 CPU 8세대 아키텍처의 코드명 이름은? ",
        answers: [
            { text: "커피레이크", correct: true },
            { text: "아이스레이크", correct: false },
        ],
    },
    {
        question: "영국과 탈퇴를 뜻하는 합성어로 2016년 6월에 진행되었으며 영국의 유럽연합(EU) 탈퇴를 뜻하는 이 말은?",
        answers: [
            { text: "브로크시트", correct: false },
            { text: "브렉시트", correct: true },
        ],
    },
    {
        question: "1871년(고종 8) 미국 아시아함대가 강화도에 쳐들어온 제국주의적 침략전쟁 사건.",
        answers: [
            { text: "신미양요", correct: true },
            { text: "병인양요", correct: false },
        ],
    },
    {
        question: "이 바이러스를 가진 동물에 사람이 물렸을 때 발생되는 급성 뇌척수염으로 치사율 100%의 무서운 전염병이다.",
        answers: [
            { text: "코로나바이러스", correct: false },
            { text: "심장마비", correct: false },
            { text: "공수병", correct: true },
        ],
    },
    {
        question: "공공의 이익은 되지만 위험시설 등이 자기지역에 유치되는것을 반대하는 지역 이기주의현상.",
        answers: [
            { text: "님비현상", correct: true },
            { text: "냄비현상", correct: false },
        ],
    },
    {
        question: " 말초 혈액내에 존재하며 혈액의 응고나 지혈작용에 관여하는 혈액의 유형성분인 이 혈구는?",
        answers: [
            { text: "백혈구", correct: false },
            { text: "적혈구", correct: false },
            { text: "혈소판", correct: true },
        ],
    },
    {
        question: " 체온조절의 이상증세로 열이나 감정적인 자극으로 인해 비정상적으로 땀이 많이 흐르는 이 질환은?",
        answers: [
            { text: "수련증", correct: false },
            { text: "다한증", correct: true },
        ],
    },
    {
        question: "2019년도의 최저임금 <시급>은 얼마일까요?",
        answers: [
            { text: "8,330원", correct: false },
            { text: "8,340원", correct: false },
            { text: "8,350원", correct: true },
        ],
    },
    {
        question: "소화 효소와 호르몬을 분비하며, 위의 뒤쪽 부근에 위치해 있는 이 장기의 이름은?",
        answers: [
            { text: "이자", correct: true },
            { text: "간", correct: false },
            { text: "쓸개", correct: false },
        ],
    },
    {
        question: " 형광성 유기화합물에 전류를 흐르면 빛을 내는 전계발광현상을 이용하여 스스로 빛을 내는 이 자체발광형 유기물질은?",
        answers: [
            { text: "FHD", correct: false },
            { text: "QHD", correct: false },
            { text: "OLED", correct: true },
        ],
    },
    {
        question: "현대그룹의 창업자는?",
        answers: [
            { text: "이건희", correct: false },
            { text: "이재용", correct: false },
            { text: "정주영", correct: true },
        ],
    },
    {
        question: "다양한 기관, 효소, 호르몬 등 신체를 이루는 주 성분으로 몸에서 물 다음으로 많은 이 것은?",
        answers: [
            { text: "탄수화물", correct: false },
            { text: "단백질", correct: true },
            { text: "지방", correct: false },
        ],
    },
    {
        question: "신경 말단에서 근육수축을 일으키는 신경전달 물질을 억제하여 잔주름을 없애는 이 물질은?",
        answers: [
            { text: "성형수술", correct: false },
            { text: "보톡스", correct: true },
        ],
    },
    {
        question: "다음 중에서 <부치는> 것은?",
        answers: [
            { text: "우표", correct: false },
            { text: "짐", correct: true },
            { text: "밥풀", correct: false },
        ],
    },
    {
        question: "삼겹살은 황사예방 등 먼지제거에 좋은 음식이다.",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: "<정글북>의 주인공은?",
        answers: [
            { text: "아시아인", correct: true },
            { text: "유럽인", correct: false },
            { text: "아메리카인", correct: false },
        ],
    },
    {
        question: "중심 도시의 주변에서 주거지 역할을 하는 도시를 무엇이라고 하는가?",
        answers: [
            { text: "베드타운", correct: true },
            { text: "신도시", correct: false },
            { text: "위성도시", correct: false },
            { text: "우보도시", correct: false },
        ],
    },
    {
        question: "세계 최초로 안락사를 합법화한 나라는?",
        answers: [
            { text: "미국", correct: false },
            { text: "영국", correct: false },
            { text: "네덜란드", correct: true },
            { text: "스위스", correct: false },
        ],
    },
    {
        question: "자본과 노동에 대한 국가의 통제 방식을 일컫는 말은?",
        answers: [
            { text: "코포라티즘", correct: true },
            { text: "컴슈머리즘", correct: false },
            { text: "자기조합주의", correct: false },
            { text: "경제주의", correct: false },
        ],
    },
    {
        question: "헤일로 효과를 방지하기 위해서 배제해야 할 것이 아닌것은?",
        answers: [
            { text: "편견", correct: false },
            { text: "선입관", correct: false },
            { text: "강박 관념", correct: true },
            { text: "고정 관념", correct: false },
        ],
    },
    {
        question: "소음 측정 단위는 어느것인가?",
        answers: [
            { text: "dB", correct: true },
            { text: "ppm", correct: false },
            { text: "BOD", correct: false },
            { text: "COD", correct: false },
        ],
    },
    {
        question: "대기층에서 더운 공기 때문에 그 아래로 찬 공기가 누적해서 나타나는 것은?",
        answers: [
            { text: "온실효과", correct: false },
            { text: "황사현상", correct: false },
            { text: "스모그현상", correct: false },
            { text: "역전층현상", correct: true },
        ],
    },
    {
        question: "신기술의 우수한 상품에 매겨지는 마크는?",
        answers: [
            { text: "GD", correct: false },
            { text: "품", correct: false },
            { text: "KT", correct: true },
            { text: "KS", correct: false },
        ],
    },
    {
        question: "환경보전을 위한 다자간 협상을 무엇이라 하는가?",
        answers: [
            { text: "그린피스", correct: false },
            { text: "녹색운동", correct: false },
            { text: "그린라운드", correct: true },
            { text: "로마클럽", correct: false },
        ],
    },
    {
        question: "우리나라의 자유무역 협정 첫 대상국은?",
        answers: [
            { text: "일본", correct: false },
            { text: "칠레", correct: true },
            { text: "멕시코", correct: false },
            { text: "브라질", correct: false },
        ],
    },
    {
        question: "수자원 보전 지역으로 연안의 수자원을 오염으로 부터 보존하기 위해 설정한 오염제한 구역을 무엇이라고 하는가 ? ",
        answers: [
            { text: "그린벨트", correct: false },
            { text: "폐쇄성 수역", correct: false },
            { text: "블루벨트", correct: true },
        ],
    },
    {
        question: "친고죄는?",
        answers: [
            { text: "절도죄", correct: false },
            { text: "모욕죄", correct: true },
            { text: "횡령죄", correct: false },
            { text: "재물 훼손죄", correct: false },
        ],
    },
    {
        question: "마카오가 중국으로 반환된 시기는?",
        answers: [
            { text: "1998", correct: false },
            { text: "1999", correct: true },
            { text: "2000", correct: false },
        ],
    },
    {
        question: "북유럽 신화에서는 최고신 오딘에게 세상 동정을 알려주고, 아랍세계에서는 날아가는 방향을 통해 좋은 징조와 나쁜 조짐을 알려주는 것으로 유명한 동물은?",
        answers: [
            { text: "비둘기", correct: false },
            { text: "까마귀", correct: true },
            { text: "독수리", correct: false },
            { text: "까치", correct: false },
        ],
    },
    {
        question: "위진 남북조 시기에 고개지의 여사잠도 도연명의 귀거래사를 볼 수있었다.",
        answers: [
            { text: "O", correct: true },
            { text: "X", correct: false },
        ],
    },
    {
        question: "원나라때 홍루몽 유림외사등을 볼 수 있었다.",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: "당나라 때는 불교가 선종 정토종 등이 등장하여 중국화되었다.",
        answers: [
            { text: "O", correct: true },
            { text: "X", correct: false },
        ],
    },
    {
        question: "금나라에게 패하여 임안으로 천도한 남송에서 왕안석이 계속되는 세폐문제등을 해결하고자 개혁을 주장하였다.",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: "영국 스튜어트 왕조시기에 내각 책임제가 도입되엇다(기출)",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: "명에혁명 시기에 토리당 휘그당이라는 정당이 발생하고 심사법 인신 보호법 등이 제정되었다.",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: "러시아의 알렉산드로 2세는 데카브르스트의 난을 진압하였다.",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: "프랑스 7월 혁명의 결과 영국의 1차 선거법 개정에 영향을 주엇다.",
        answers: [
            { text: "O", correct: true },
            { text: "X", correct: false },
        ],
    },
    {
        question: "아바스 왕조는 바그다드에 도읍을 두고 당과 탈라스 전투를 하였으며 시아파의 후원으로 성립하였다. ",
        answers: [
            { text: "O", correct: true },
            { text: "X", correct: false },
        ],
    },
    {
        question: "링컨이 노예를 해방을 발표하자 남부 7주고 독립하였다.",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: "후스 위클리프등이 교회의 대분열 시기를 틈타 교회를 비판하자 트리엔트 공의회를 개최하고 예수회등을 설립하여 대응하고자하였다. ",
        answers: [
            { text: "O", correct: false },
            { text: "X", correct: true },
        ],
    },
    {
        question: " 미국은 남북전쟁 통일후에 대륙횡단 철도를 완성하여 자본주의의 급속한 발전을 이루었다. ",
        answers: [
            { text: "O", correct: true },
            { text: "X", correct: false },
        ],
    },
];