// 히라가나 단어와 한글 정답 예시 데이터
const wordList = [
  { hira: "さくら", answer: "벚꽃" },
  { hira: "ねこ", answer: "고양이" },
  { hira: "いぬ", answer: "개" },
  { hira: "みず", answer: "물" },
  { hira: "やま", answer: "산" },
  { hira: "ともだち", answer: "친구" },
  { hira: "はな", answer: "꽃" },
  { hira: "くるま", answer: "자동차" },
  { hira: "ひと", answer: "사람" },
  { hira: "そら", answer: "하늘" },
  { hira: "おはようございます", answer: "안녕하세요"},
  { hira: "こんにちは", answer: "안녕하세요" },
  { hira: "こんばんは", answer: "안녕하세요" },
  { hira: "さようなら", answer: "안녕히 가세요" },
  { hira: "わたし", answer: "나" },
  { hira: "あなた", answer: "당신" },
  { hira: "さん", answer: "님" },
  { hira: "から", answer: "에서" },
  { hira: "まで", answer: "까지" },
  { hira: "にほん", answer: "일본" },
  { hira: "かんこく", answer: "한국" },
  { hira: "あめりか", answer: "미국" },
  { hira: "にほんご", answer: "일본어" },
  { hira: "かんこくご", answer: "한국어" },
  { hira: "えいご", answer: "영어" },
  { hira: "かぞく", answer: "가족" },
  { hira: "おとうさん", answer: "아버지" },
  { hira: "おかあさん", answer: "어머니" },
  { hira: "おにいさん", answer: "형" },
  { hira: "おねえさん", answer: "누나" },
  { hira: "おとうと", answer: "남동생" },
  { hira: "いもうと", answer: "여동생" },
  { hira: "がくせい", answer: "학생" },
  { hira: "せんせい", answer: "선생님" },
  { hira: "こうこう", answer: "고등학교" },
  { hira: "だいがく", answer: "대학교" },
  { hira: "いち", answer: "하나" },
  { hira: "に", answer: "둘" },
  { hira: "さん", answer: "셋" },
  { hira: "よん", answer: "넷" },
  { hira: "し", answer: "넷" },
  { hira: "よ", answer: "넷" },
  { hira: "ご", answer: "다섯" },
  { hira: "ろく", answer: "여섯" },
  { hira: "なな", answer: "일곱" },
  { hira: "ちち", answer: "일곱" }, 
  { hira: "はち", answer: "여덟" },
  { hira: "きゅう", answer: "아홉" },
  { hira: "じゅう", answer: "열" },
  { hira: "がっこう", answer: "학교" },
  { hira: "べんきょう", answer: "공부" },
  { hira: "しゅくだい", answer: "숙제" },
  { hira: "としょかん", answer: "도서관" },
  { hira: "うち", answer: "집" },
  { hira: "きょうしつ", answer: "교실" },
  { hira: "じゅぎょう", answer: "수업" },
  { hira: "かいもの", answer: "쇼핑" },
  { hira: "しょくどう", answer: "학생식당" },
  { hira: "レストラン", answer: "레스토랑" },
  { hira: "とも", answer: "함께" },
  { hira: "いく", answer: "가다" },
  { hira: "くる", answer: "오다" },
  { hira: "かえる", answer: "돌아가다" },
  { hira: "たべる", answer: "먹다" },
  { hira: "のむ", answer: "마시다" },
  { hira: "みる", answer: "보다" },
  { hira: "きく", answer: "듣다" },
  { hira: "はなす", answer: "말하다" },
  { hira: "かく", answer: "쓰다" },
  { hira: "よむ", answer: "읽다" },
  { hira: "かいしゃ", answer: "회사" },
  { hira: "でんしゃ", answer: "전철" },
  { hira: "バス", answer: "버스" },
  { hira: "じかん", answer: "시간" }
];

let wordOrder = [];
let currentIdx = 0;
let correctCount = 0;
let wrongCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startWordGame() {
  wordOrder = Array.from({length: wordList.length}, (_, i) => i);
  shuffle(wordOrder);
  currentIdx = 0;
  correctCount = 0;
  wrongCount = 0;
  document.getElementById('word-restart-btn').style.display = 'none';
  showWordQuestion();
}

function showWordQuestion() {
  const quizArea = document.getElementById('quiz-area');
  const wordDiv = document.getElementById('hiragana-word');
  const answerInput = document.getElementById('word-answer-input');
  const feedback = document.getElementById('word-feedback');
  const progress = document.getElementById('word-progress');
  if (currentIdx >= wordList.length) {
    wordDiv.textContent = '';
    answerInput.style.display = 'none';
    document.getElementById('word-submit-answer').style.display = 'none';
    feedback.textContent = `게임 종료! 정답: ${correctCount} / 오답: ${wrongCount}`;
    document.getElementById('word-restart-btn').style.display = 'inline-block';
    progress.textContent = '';
    return;
  }
  const idx = wordOrder[currentIdx];
  wordDiv.textContent = wordList[idx].hira;
  answerInput.value = '';
  answerInput.style.display = '';
  document.getElementById('word-submit-answer').style.display = '';
  feedback.textContent = '';
  progress.textContent = `${currentIdx+1} / ${wordList.length}`;
  answerInput.focus();
}

function checkWordAnswer() {
  const idx = wordOrder[currentIdx];
  const input = document.getElementById('word-answer-input').value.trim();
  const feedback = document.getElementById('word-feedback');
  if (input === wordList[idx].answer) {
    feedback.textContent = '정답!';
    feedback.style.color = '#2a8';
    correctCount++;
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 700);
  } else {
    feedback.textContent = `오답! 정답: ${wordList[idx].answer}`;
    feedback.style.color = '#e55';
    wrongCount++;
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 1200);
  }
}

document.getElementById('word-submit-answer').onclick = checkWordAnswer;
document.getElementById('word-answer-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkWordAnswer();
});
document.getElementById('word-restart-btn').onclick = startWordGame;

window.onload = startWordGame;
