import { shuffle } from './common.js';

// 가타카나 단어와 한글 정답 예시 데이터 (실제 데이터는 필요에 따라 확장 가능)
const wordList = [
  { kata: "クラス", answer: ["반"] },
  { kata: "プレゼント", answer: ["선물"] },
  { kata: "バンドぶ", answer: ["밴드부"] },
  { kata: "コンサート", answer: ["콘서트"] },
  { kata: "デパート", answer: ["백화점"] },
  { kata: "アメリカ", answer: ["미국"] },
  { kata: "バス", answer: ["버스"] },
  { kata: "レストラン", answer: ["레스토랑"] },
  { kata: "バスケットボール", answer: ["농구"] },
];

let wordOrder = [];
let currentIdx = 0;
let correctCount = 0;
let wrongCount = 0;

// 사용자 맞춤 학습용 변수 추가
let wrongCounts = JSON.parse(localStorage.getItem('katakanaWordWrongCounts') || '{}');
let correctStreaks = {}; // { idx: 연속 정답 횟수 }
let wrongQueue = []; // 틀린 단어 인덱스 큐

function saveWrongCounts() {
  localStorage.setItem('katakanaWordWrongCounts', JSON.stringify(wrongCounts));
}

function startWordGame() {
  wordOrder = Array.from({length: wordList.length}, (_, i) => i);
  shuffle(wordOrder);
  currentIdx = 0;
  correctCount = 0;
  wrongCount = 0;
  wrongCounts = {};
  correctStreaks = {};
  wrongQueue = [];
  showWordQuestion();
}

function getNextQuestionIdx() {
  // 5~10문제 이내에 틀린 단어가 랜덤하게 다시 출제되도록
  if (wrongQueue.length > 0 && Math.random() < 0.18) { // 약 1/5~1/6 확률
    // wrongQueue에서 랜덤하게 하나 꺼내기
    const randIdx = Math.floor(Math.random() * wrongQueue.length);
    return wrongQueue[randIdx];
  }
  // 일반 순서대로 출제
  return wordOrder[currentIdx];
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
  // 출제할 인덱스 결정
  const idx = getNextQuestionIdx();
  // 현재 출제 인덱스를 저장(정답 체크 시 사용)
  showWordQuestion.currentIdx = idx;
  wordDiv.textContent = wordList[idx].kata;
  answerInput.value = '';
  answerInput.style.display = '';
  document.getElementById('word-submit-answer').style.display = '';
  // 틀린 단어 안내 메시지
  if (wrongCounts[idx] && wrongCounts[idx] > 0) {
    feedback.textContent = `이전에 ${wrongCounts[idx]}번 틀린 단어입니다.`;
    feedback.style.color = '#eaa800';
  } else {
    feedback.textContent = '';
  }
  progress.textContent = `${currentIdx+1} / ${wordList.length}`;
  answerInput.focus();
}

function checkWordAnswer() {
  // 출제된 인덱스는 showWordQuestion.currentIdx에 저장됨
  const idx = showWordQuestion.currentIdx !== undefined ? showWordQuestion.currentIdx : wordOrder[currentIdx];
  const input = document.getElementById('word-answer-input').value.trim();
  const feedback = document.getElementById('word-feedback');
  const answer = wordList[idx].answer;

  if (input === "") {
    return;
  }

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
    // 연속 정답 관리
    correctStreaks[idx] = (correctStreaks[idx] || 0) + 1;
    if (correctStreaks[idx] >= 2) {
      // 두 번 연속 맞추면 틀린 횟수/큐에서 제거
      wrongCounts[idx] = 0;
      wrongQueue = wrongQueue.filter(i => i !== idx);
      correctStreaks[idx] = 0;
    }
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 700);
  } else {
    feedback.textContent = `오답! 정답: ${Array.isArray(answer) ? answer.join(', ') : answer}`;
    feedback.style.color = '#e55';
    wrongCount++;
    // 틀린 횟수/큐 관리
    wrongCounts[idx] = (wrongCounts[idx] || 0) + 1;
    correctStreaks[idx] = 0;
    // wrongQueue에 중복 추가 허용(랜덤 출제용)
    wrongQueue.push(idx);
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 1200);
    // 오답 기록
    const key = wordList[idx].kata + '|' + (wordList[idx].answer[0] || '');
    wrongCounts[key] = (wrongCounts[key] || 0) + 1;
    saveWrongCounts();
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
