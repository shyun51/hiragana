import { shuffle } from '../../common/js/common.js';

// 히라가나 단어와 한글 정답 예시 데이터
let wordList = [
  { hira: "さくら", answer: ["벚꽃"] },
  { hira: "ねこ", answer: ["고양이"] },
  { hira: "いぬ", answer: ["개"] },
  { hira: "みず", answer: ["물"] },
  { hira: "やま", answer: ["산"] },
  { hira: "ともだち", answer: ["친구"] },
  { hira: "はな", answer: ["꽃"] },
  { hira: "くるま", answer: ["자동차"] },
  { hira: "ひと", answer: ["사람"] },
  { hira: "そら", answer: ["하늘"] },
  { hira: "おはようございます", answer: ["안녕하세요"] },
  { hira: "こんにちは", answer: ["안녕하세요"] },
  { hira: "こんばんは", answer: ["안녕하세요"] },
  { hira: "さようなら", answer: ["안녕히 가세요"] },
  { hira: "わたし", answer: ["나"] },
  { hira: "あなた", answer: ["당신","너"] },
  { hira: "さん", answer: ["님", "셋", "3", "삼","씨씨"] },
  { hira: "から", answer: ["에서"] },
  { hira: "まで", answer: ["까지"] },
  { hira: "にほん", answer: ["일본"] },
  { hira: "かんこく", answer: ["한국"] },
  { hira: "あめりか", answer: ["미국"] },
  { hira: "にほんご", answer: ["일본어"] },
  { hira: "かんこくご", answer: ["한국어"] },
  { hira: "えいご", answer: ["영어"] },
  { hira: "かぞく", answer: ["가족"] },
  { hira: "おとうさん", answer: ["아버지"] },
  { hira: "おかあさん", answer: ["어머니"] },
  { hira: "おにいさん", answer: ["형","오빠"] },
  { hira: "おねえさん", answer: ["누나","언니"] },
  { hira: "おとうと", answer: ["남동생"] },
  { hira: "いもうと", answer: ["여동생"] },
  { hira: "がくせい", answer: ["학생"] },
  { hira: "せんせい", answer: ["선생님","쌤"] },
  { hira: "こうこう", answer: ["고등학교"] },
  { hira: "だいがく", answer: ["대학교"] },
  { hira: "いち", answer: ["하나", "1", "일"] },
  { hira: "に", answer: ["둘", "2", "이", "-에"] },
  { hira: "さん", answer: ["셋", "3", "삼", "님"] },
  { hira: "よん", answer: ["넷", "4", "사"] },
  { hira: "し", answer: ["넷", "4", "사"] },
  { hira: "よ", answer: ["넷", "4", "사"] },
  { hira: "ご", answer: ["다섯", "5", "오"] },
  { hira: "ろく", answer: ["여섯", "6", "육"] },
  { hira: "なな", answer: ["일곱", "7", "칠"] },
  { hira: "ちち", answer: ["일곱", "7", "칠"] },
  { hira: "はち", answer: ["여덟", "8", "팔"] },
  { hira: "きゅう", answer: ["아홉", "9", "구"] },
  { hira: "じゅう", answer: ["열", "10", "십"] },
  { hira: "がっこう", answer: ["학교"] },
  { hira: "べんきょう", answer: ["공부"] },
  { hira: "しゅくだい", answer: ["숙제"] },
  { hira: "としょかん", answer: ["도서관"] },
  { hira: "うち", answer: ["집"] },
  { hira: "きょうしつ", answer: ["교실"] },
  { hira: "じゅぎょう", answer: ["수업"] },
  { hira: "かいもの", answer: ["쇼핑"] },
  { hira: "しょくどう", answer: ["학생식당"] },
  { hira: "レストラン", answer: ["레스토랑"] },
  { hira: "とも", answer: ["함께"] },
  { hira: "かいしゃ", answer: ["회사"] },
  { hira: "バス", answer: ["버스"] },
  { hira: "じかん", answer: ["시간"] },
  // 새로 추가된 단어들
  { hira: "あかい", answer: ["빨갛다","붉다","빨간색색"] },
  { hira: "いえ", answer: ["집"] },
  { hira: "えき", answer: ["역"] },
  { hira: "かお", answer: ["얼굴"] },
  { hira: "いす", answer: ["의자"] },
  { hira: "すし", answer: ["초밥"] },
  { hira: "ちかてつ", answer: ["지하철"] },
  { hira: "つくえ", answer: ["책상"] },
  { hira: "みせ", answer: ["가게"] },
  { hira: "なまえ", answer: ["이름"] },
  { hira: "やさい", answer: ["채소","야채"] },
  { hira: "ふゆ", answer: ["겨울"] },
  { hira: "おふろ", answer: ["목욕/욕조"] },
  { hira: "くすり", answer: ["약"] },
  { hira: "にわ", answer: ["정원"] },
  { hira: "しろい", answer: ["하얗다"] },
  { hira: "ほん", answer: ["책"] },
  { hira: "ぶかつ", answer: ["동아리"] },
  { hira: "ここ", answer: ["여기"] },
  { hira: "ごご", answer: ["오후"] },
  { hira: "あし", answer: ["다리"] },
  { hira: "あじ", answer: ["맛"] },
  { hira: "いしゃ", answer: ["의사"] },
  { hira: "じゆう", answer: ["자유"] },
  { hira: "りよう", answer: ["이용","이용하다"] },
  { hira: "りょうり", answer: ["요리"] },
  { hira: "けっせき", answer: ["결석"] },
  { hira: "きって", answer: ["우표"] },
  { hira: "いっぱい", answer: ["가득"] },
  { hira: "きて", answer: ["오고/와서"] },
  { hira: "おと", answer: ["소리"] },
  { hira: "おっと", answer: ["남편"] },
  { hira: "さんぽ", answer: ["산책"] },
  { hira: "かんじ", answer: ["한자"] },
  { hira: "おんがく", answer: ["음악"] },
  { hira: "かばん", answer: ["가방"] },
  { hira: "かさい", answer: ["화재"] },
  { hira: "て", answer: ["손"] },
  { hira: "あに", answer: ["형","오빠"] },
  { hira: "すうがく", answer: ["수학"] },
  { hira: "あね", answer: ["누나", "언니"] },
  { hira: "おおさか", answer: ["오사카"] },
  { hira: "おばさん", answer: ["아주머니"] },
  { hira: "おばあさん", answer: ["할머니"] },
  { hira: "ちゅうごく", answer: ["중국"] },
  { hira: "アメリカ", answer: ["미국"] },
  { hira: "はじめまして", answer: ["처음 뵙겠습니다"] },
  { hira: "ねんせい", answer: ["학년"] },
  { hira: "よろしくおねがいします", answer: ["잘 부탁드립니다"] },
  { hira: "ちゅうがっこう", answer: ["중학교"] },
  { hira: "これ", answer: ["이것"] },
  { hira: "しゃしん", answer: ["사진"] },
  { hira: "はい", answer: ["네"] },
  { hira: "そうです", answer: ["그렇습니다"] },
  { hira: "ただいまかえりました", answer: ["다녀왔습니다"] },
  { hira: "ようこそ", answer: ["어서 와"] },
  { hira: "プレゼント", answer: ["선물"] },
  { hira: "ほんとうにありがとう", answer: ["정말 고마워"] },
  { hira: "これから", answer: ["이제부터","앞으로"] },
  { hira: "いちねんかん", answer: ["1년간"] },
  { hira: "ぜひ", answer: ["부디/아무쪼록"] },
  { hira: "こちら", answer: ["이쪽","이분"] },
  { hira: "こちらこそ", answer: ["저야말로"] },
  { hira: "いってらっしゃい", answer: ["다녀오세요"] },
  { hira: "いちじ", answer: ["1시","한 시"] },
  { hira: "にじ", answer: ["2시","두 시"] },
  { hira: "さんじ", answer: ["3시","세 시"] },
  { hira: "よじ", answer: ["4시", "네 시"] },
  { hira: "ごじ", answer: ["5시", "다섯 시"] },
  { hira: "ろくじ", answer: ["6시", "여섯 시"] },
  { hira: "しちじ", answer: ["7시", "일곱 시"] },
  { hira: "はちじ", answer: ["8시", "여덟 시"] },
  { hira: "くじ", answer: ["9시","아홉 시"] },
  { hira: "じゅうじ", answer: ["10시","열 시"] },
  { hira: "じゅういちじ", answer: ["11시","열한 시"] },
  { hira: "じゅうにじ", answer: ["12시", "열두 시"] },
  { hira: "デパート", answer: ["백화점"] },
  { hira: "がくいん", answer: ["학원"] },
  { hira: "ゆうびんきょく", answer: ["우체국"] },
  { hira: "ぎんこう", answer: ["은행"] },
  { hira: "すいえい", answer: ["수영"] },
  { hira: "さんじゅっぷん", answer: ["30분"] },
  { hira: "クラス", answer: ["반"] },
  { hira: "しゅみ", answer: ["취미"] },
  { hira: "りょこう", answer: ["여행"] },
  { hira: "バスケットボール", answer: ["농구"] },
  { hira: "えいが", answer: ["영화"] },
  { hira: "やきゅう", answer: ["야구"] },
  { hira: "くん", answer: ["군"] },
  { hira: "まだ", answer: ["아직"] },
  { hira: "つぎだよ", answer: ["다음이야"] },
  { hira: "わたしたち", answer: ["우리들"] },
  { hira: "バンドぶ", answer: ["밴드부"] },
  { hira: "れんしゅう", answer: ["연습"] },
  { hira: "げつようび", answer: ["월요일"] },
  { hira: "かようび", answer: ["화요일"] },
  { hira: "すいようび", answer: ["수요일"] },
  { hira: "もくようび", answer: ["목요일"] },
  { hira: "きんようび", answer: ["금요일"] },
  { hira: "どようび", answer: ["토요일"] },
  { hira: "にちようび", answer: ["일요일"] },
  { hira: "ばしょ", answer: ["장소"] },
  { hira: "おんがくしつ", answer: ["음악실"] },
  { hira: "さくねん", answer: ["작년"] },
  { hira: "コンサート", answer: ["콘서트"] },
  { hira: "まいとし", answer: ["매년"] },
  { hira: "ぶんかさい", answer: ["문화제"] },
  { hira: "にんき", answer: ["인기"] },
  { hira: "みんな", answer: ["모두"] },
  { hira: "に", answer: ["-에","에"] }
];

let wordOrder = [];
let currentIdx = 0;
let correctCount = 0;
let wrongCount = 0;

// 오답 기록용
let wrongCounts = JSON.parse(localStorage.getItem('hiraganaWordWrongCounts') || '{}');

function saveWrongCounts() {
  localStorage.setItem('hiraganaWordWrongCounts', JSON.stringify(wrongCounts));
}

function startWordGame() {
  // 오답 요소만으로 게임하는 모드인지 확인
  if (localStorage.getItem('hiraganaGameMode') === 'wrongOnly') {
    const wrongChars = JSON.parse(localStorage.getItem('hiraganaGameWrongChars') || '[]');
    const wrongWords = JSON.parse(localStorage.getItem('hiraganaGameWrongWords') || '[]');
    // 글자와 단어를 합쳐서 wordList 생성 (글자는 answer를 발음으로, 단어는 answer를 뜻 없이)
    wordList = [
      ...wrongChars.map(([key, count]) => {
        const [char, pron] = key.split('|');
        return { hira: char, answer: [pron] };
      }),
      ...wrongWords.map(([key, count]) => {
        const [word, pron] = key.split('|');
        return { hira: word, answer: [pron] };
      })
    ];
  } else {
    // 기본 wordList로 복원 (초기 데이터)
    wordList = [
      { hira: "さくら", answer: ["벚꽃"] },
      { hira: "ねこ", answer: ["고양이"] },
      { hira: "いぬ", answer: ["개"] },
      { hira: "みず", answer: ["물"] },
      { hira: "やま", answer: ["산"] },
      { hira: "ともだち", answer: ["친구"] },
      { hira: "はな", answer: ["꽃"] },
      { hira: "くるま", answer: ["자동차"] },
      { hira: "ひと", answer: ["사람"] },
      { hira: "そら", answer: ["하늘"] },
      { hira: "おはようございます", answer: ["안녕하세요"] },
      { hira: "こんにちは", answer: ["안녕하세요"] },
      { hira: "こんばんは", answer: ["안녕하세요"] },
      { hira: "さようなら", answer: ["안녕히 가세요"] },
      { hira: "わたし", answer: ["나"] },
      { hira: "あなた", answer: ["당신","너"] },
      { hira: "さん", answer: ["님", "셋", "3", "삼","씨씨"] },
      { hira: "から", answer: ["에서"] },
      { hira: "まで", answer: ["까지"] },
      { hira: "にほん", answer: ["일본"] },
      { hira: "かんこく", answer: ["한국"] },
      { hira: "あめりか", answer: ["미국"] },
      { hira: "にほんご", answer: ["일본어"] },
      { hira: "かんこくご", answer: ["한국어"] },
      { hira: "えいご", answer: ["영어"] },
      { hira: "かぞく", answer: ["가족"] },
      { hira: "おとうさん", answer: ["아버지"] },
      { hira: "おかあさん", answer: ["어머니"] },
      { hira: "おにいさん", answer: ["형","오빠"] },
      { hira: "おねえさん", answer: ["누나","언니"] },
      { hira: "おとうと", answer: ["남동생"] },
      { hira: "いもうと", answer: ["여동생"] },
      { hira: "がくせい", answer: ["학생"] },
      { hira: "せんせい", answer: ["선생님","쌤"] },
      { hira: "こうこう", answer: ["고등학교"] },
      { hira: "だいがく", answer: ["대학교"] },
      { hira: "いち", answer: ["하나", "1", "일"] },
      { hira: "に", answer: ["둘", "2", "이", "-에"] },
      { hira: "さん", answer: ["셋", "3", "삼", "님"] },
      { hira: "よん", answer: ["넷", "4", "사"] },
      { hira: "し", answer: ["넷", "4", "사"] },
      { hira: "よ", answer: ["넷", "4", "사"] },
      { hira: "ご", answer: ["다섯", "5", "오"] },
      { hira: "ろく", answer: ["여섯", "6", "육"] },
      { hira: "なな", answer: ["일곱", "7", "칠"] },
      { hira: "ちち", answer: ["일곱", "7", "칠"] },
      { hira: "はち", answer: ["여덟", "8", "팔"] },
      { hira: "きゅう", answer: ["아홉", "9", "구"] },
      { hira: "じゅう", answer: ["열", "10", "십"] },
      { hira: "がっこう", answer: ["학교"] },
      { hira: "べんきょう", answer: ["공부"] },
      { hira: "しゅくだい", answer: ["숙제"] },
      { hira: "としょかん", answer: ["도서관"] },
      { hira: "うち", answer: ["집"] },
      { hira: "きょうしつ", answer: ["교실"] },
      { hira: "じゅぎょう", answer: ["수업"] },
      { hira: "かいもの", answer: ["쇼핑"] },
      { hira: "しょくどう", answer: ["학생식당"] },
      { hira: "レストラン", answer: ["레스토랑"] },
      { hira: "とも", answer: ["함께"] },
      { hira: "かいしゃ", answer: ["회사"] },
      { hira: "バス", answer: ["버스"] },
      { hira: "じかん", answer: ["시간"] },
      // ... 이하 생략 ...
    ];
  }
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
    // 오답 게임 모드 종료 시 플래그 삭제
    if (localStorage.getItem('hiraganaGameMode') === 'wrongOnly') {
      localStorage.removeItem('hiraganaGameMode');
      localStorage.removeItem('hiraganaGameWrongChars');
      localStorage.removeItem('hiraganaGameWrongWords');
    }
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
  const answer = wordList[idx].answer;
  
  // 빈 답안일 때는 아무 상호작용 없음
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
    feedback.textContent = '✔️ 정답!';
    feedback.classList.add('correct');
    feedback.classList.remove('wrong');
    correctCount++;
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 700);
  } else {
    feedback.textContent = `❌ 오답! 정답: ${Array.isArray(answer) ? answer.join(', ') : answer}`;
    feedback.classList.add('wrong');
    feedback.classList.remove('correct');
    wrongCount++;
    setTimeout(() => {
      currentIdx++;
      showWordQuestion();
    }, 1200);
    // 오답 기록
    const key = wordList[idx].hira + '|' + (wordList[idx].answer[0] || '');
    wrongCounts[key] = (wrongCounts[key] || 0) + 1;
    saveWrongCounts();
  }
}

document.getElementById('word-submit-answer').onclick = checkWordAnswer;
document.getElementById('word-answer-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkWordAnswer();
});
document.getElementById('word-restart-btn').onclick = startWordGame;

// 정답보기 기능 추가
document.getElementById('word-show-answer').onclick = function() {
  const idx = wordOrder[currentIdx];
  const feedback = document.getElementById('word-feedback');
  const answer = wordList[idx].answer;
  
  feedback.textContent = `💡 정답: ${Array.isArray(answer) ? answer.join(', ') : answer}`;
  feedback.style.color = '#0077cc';
  feedback.style.fontWeight = 'bold';
  
  // 3초 후 다음 문제로 넘어가기
  setTimeout(() => {
    currentIdx++;
    showWordQuestion();
  }, 3000);
};

document.addEventListener('DOMContentLoaded', startWordGame);
