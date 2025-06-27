import { shuffle } from './common.js';

// 가타카나 단어와 한글 정답 예시 데이터 (실제 데이터는 필요에 따라 확장 가능)
const wordList = [
  { kata: "アイス", answer: ["아이스"] },
  { kata: "バナナ", answer: ["바나나"] },
  { kata: "テレビ", answer: ["텔레비전", "티비"] },
  { kata: "コーヒー", answer: ["커피"] },
  { kata: "パン", answer: ["빵"] },
  { kata: "ホテル", answer: ["호텔"] },
  { kata: "タクシー", answer: ["택시"] },
  { kata: "サッカー", answer: ["축구"] },
  { kata: "コンピュータ", answer: ["컴퓨터"] },
  { kata: "ジュース", answer: ["주스"] },
];

let wordOrder = [];
let currentIdx = 0;
let correctCount = 0;
let wrongCount = 0;

function startWordGame() {
  wordOrder = Array.from({length: wordList.length}, (_, i) => i);
  shuffle(wordOrder);
  currentIdx = 0;
  correctCount = 0;
  wrongCount = 0;
  showWordQuestion();
}

function showWordQuestion() {
  const wordDiv = document.getElementById('katakana-word');
  const answerInput = document.getElementById('word-answer-input');
  const feedback = document.getElementById('word-feedback');
  const progress = document.getElementById('word-progress');
  if (!wordDiv || !answerInput || !feedback || !progress) return;
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
  wordDiv.textContent = wordList[idx].kata;
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
  const answer = wordList[idx].answer;
  let isCorrect = false;
  if (Array.isArray(answer)) {
    isCorrect = answer.includes(input);
  } else {
    isCorrect = input === answer;
  }
  if (isCorrect) {
    feedback.textContent = '정답!';
    feedback.style.color = '#2a8';
    correctCount++;
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 700);
  } else {
    feedback.textContent = `오답! 정답: ${Array.isArray(answer) ? answer.join(', ') : answer}`;
    feedback.style.color = '#e55';
    wrongCount++;
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 1200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 동적으로 단어 게임 UI가 없는 경우(기존 html 구조와 다를 때) 대비
  if (!document.getElementById('katakana-word')) {
    // 동적으로 UI 생성 (최소 보장)
    const quizArea = document.createElement('div');
    quizArea.id = 'quiz-area';
    quizArea.innerHTML = `
      <div id="katakana-word" style="font-size:2.5rem; margin-bottom:24px;"></div>
      <input type="text" id="word-answer-input" placeholder="한글로 답을 입력하세요..." style="font-size:1.3rem; padding:8px 16px; width:260px; border-radius:8px; border:2px solid #aaa; text-align:center;" />
      <button id="word-submit-answer" style="font-size:1.1rem; margin-left:12px;">확인</button>
      <div id="word-feedback" style="margin-top:20px; min-height:32px; font-size:1.2rem; font-weight:bold;"></div>
      <div id="word-progress" style="margin-top:16px; color:#888;"></div>
      <button id="word-restart-btn" style="display:none; margin-top:24px;">다시하기</button>
    `;
    document.body.prepend(quizArea);
  }
  document.getElementById('word-submit-answer').onclick = checkWordAnswer;
  document.getElementById('word-answer-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkWordAnswer();
  });
  document.getElementById('word-restart-btn').onclick = startWordGame;
  startWordGame();
});
