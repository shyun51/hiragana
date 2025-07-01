import { shuffle } from './common.js';

// 가타카나 문자 배열 (기본 46자)
const katakanaList = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ',       'ユ',      'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ',                'ヲ',
  'ン'
];

const romajiList = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'shi', 'su', 'se', 'so',
  'ta', 'chi', 'tsu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'fu', 'he', 'ho',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya',      'yu',      'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa',                'wo',
  'n'
];

let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;

// 오답 기록용
let wrongCounts = JSON.parse(localStorage.getItem('katakanaTextWrongCounts') || '{}');

function saveWrongCounts() {
  localStorage.setItem('katakanaTextWrongCounts', JSON.stringify(wrongCounts));
}

function startGame() {
  currentIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  // 문제 순서 섞기
  const indices = Array.from({length: katakanaList.length}, (_, i) => i);
  shuffle(indices);
  window.katakanaOrder = indices;
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById('game-container');
  if (currentIndex >= katakanaList.length) {
    container.innerHTML = `<h2>게임 종료!</h2><p>정답: ${correctCount} / 오답: ${wrongCount}</p><button onclick="startGame()">다시하기</button>`;
    return;
  }
  const idx = window.katakanaOrder[currentIndex];
  container.innerHTML = `
    <div style="font-size:5rem; margin-bottom:24px;">${katakanaList[idx]}</div>
    <input id="answer" type="text" placeholder="로마자 입력" style="font-size:1.5rem; padding:8px 16px;" autofocus />
    <button onclick="checkAnswer()" style="font-size:1.1rem; margin-left:12px;">확인</button>
    <div id="result" style="margin-top:20px; height:32px;"></div>
    <div style="margin-top:16px; color:#888;">${currentIndex+1} / ${katakanaList.length}</div>
  `;
  document.getElementById('answer').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkAnswer();
  });
}

function checkAnswer() {
  const idx = window.katakanaOrder[currentIndex];
  const input = document.getElementById('answer').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  if (input === romajiList[idx]) {
    resultDiv.textContent = '정답!';
    resultDiv.style.color = '#2a8';
    correctCount++;
    setTimeout(() => {
      currentIndex++;
      showQuestion();
    }, 700);
  } else {
    resultDiv.textContent = `오답! 정답: ${romajiList[idx]}`;
    resultDiv.style.color = '#e55';
    wrongCount++;
    setTimeout(() => {
      currentIndex++;
      showQuestion();
    }, 1200);
    // 오답 기록
    const key = katakanaList[idx] + '|' + romajiList[idx];
    wrongCounts[key] = (wrongCounts[key] || 0) + 1;
    saveWrongCounts();
  }
}

document.addEventListener('DOMContentLoaded', startGame);

document.addEventListener("DOMContentLoaded", function() {
    const katakanaData = {
      // 기본 10개 행
      "ア行": [
        { char: "ア", answers: ["a","아"], row: "아행 (ア行)" },
        { char: "イ", answers: ["i","이"], row: "아행 (ア行)" },
        { char: "ウ", answers: ["u","우"], row: "아행 (ア行)" },
        { char: "エ", answers: ["e","에"], row: "아행 (ア行)" },
        { char: "オ", answers: ["o","오"], row: "아행 (ア行)" }
      ],
      "カ行": [
        { char: "カ", answers: ["ka","카"], row: "카행 (カ行)" },
        { char: "キ", answers: ["ki","키"], row: "카행 (カ行)" },
        { char: "ク", answers: ["ku","쿠"], row: "카행 (カ行)" },
        { char: "ケ", answers: ["ke","케"], row: "카행 (カ行)" },
        { char: "コ", answers: ["ko","코"], row: "카행 (カ行)" }
      ],
      "サ行": [
        { char: "サ", answers: ["sa","사"], row: "사행 (サ行)" },
        { char: "シ", answers: ["shi","si","시"], row: "사행 (サ行)" },
        { char: "ス", answers: ["su","수","스"], row: "사행 (サ行)" },
        { char: "セ", answers: ["se","세"], row: "사행 (サ行)" },
        { char: "ソ", answers: ["so","소"], row: "사행 (サ行)" }
      ],
      "タ行": [
        { char: "タ", answers: ["ta","타"], row: "타행 (タ行)" },
        { char: "チ", answers: ["chi","ti","치"], row: "타행 (タ行)" },
        { char: "ツ", answers: ["tsu","츠"], row: "타행 (タ行)" },
        { char: "テ", answers: ["te","테"], row: "타행 (タ行)" },
        { char: "ト", answers: ["to","토"], row: "타행 (タ行)" }
      ],
      "ナ行": [
        { char: "ナ", answers: ["na","나"], row: "나행 (ナ行)" },
        { char: "ニ", answers: ["ni","니"], row: "나행 (ナ行)" },
        { char: "ヌ", answers: ["nu","누"], row: "나행 (ナ行)" },
        { char: "ネ", answers: ["ne","네"], row: "나행 (ナ行)" },
        { char: "ノ", answers: ["no","노"], row: "나행 (ナ行)" }
      ],
      "ハ行": [
        { char: "ハ", answers: ["ha","하"], row: "하행 (ハ行)" },
        { char: "ヒ", answers: ["hi","히"], row: "하행 (ハ行)" },
        { char: "フ", answers: ["fu","후","hu"], row: "하행 (ハ行)" },
        { char: "ヘ", answers: ["he","헤"], row: "하행 (ハ行)" },
        { char: "ホ", answers: ["ho","호"], row: "하행 (ハ行)" }
      ],
      "マ行": [
        { char: "マ", answers: ["ma","마"], row: "마행 (マ行)" },
        { char: "ミ", answers: ["mi","미"], row: "마행 (マ行)" },
        { char: "ム", answers: ["mu","무"], row: "마행 (マ行)" },
        { char: "メ", answers: ["me","메"], row: "마행 (マ行)" },
        { char: "モ", answers: ["mo","모"], row: "마행 (マ行)" }
      ],
      "ヤ行": [
        { char: "ヤ", answers: ["ya","야"], row: "야행 (ヤ行)" },
        { char: "ユ", answers: ["yu","유"], row: "야행 (ヤ行)" },
        { char: "ヨ", answers: ["yo","요"], row: "야행 (ヤ行)" }
      ],
      "ラ行": [
        { char: "ラ", answers: ["ra","라"], row: "라행 (ラ行)" },
        { char: "リ", answers: ["ri","리"], row: "라행 (ラ行)" },
        { char: "ル", answers: ["ru","루"], row: "라행 (ラ行)" },
        { char: "レ", answers: ["re","레"], row: "라행 (ラ行)" },
        { char: "ロ", answers: ["ro","로"], row: "라행 (ラ行)" }
      ],
      "ワ行": [
        { char: "ワ", answers: ["wa","와"], row: "와행 (ワ行)" },
        { char: "ヲ", answers: ["wo","오","o"], row: "와행 (ワ行)" }
      ],
      // 특수음
      "탁음": [
        { char:"ガ",answers:["ga","가"],row:"탁음" },
        { char:"ギ",answers:["gi","기"],row:"탁음" },
        { char:"グ",answers:["gu","구"],row:"탁음" },
        { char:"ゲ",answers:["ge","게"],row:"탁음" },
        { char:"ゴ",answers:["go","고"],row:"탁음" },
        { char:"ザ",answers:["za","자"],row:"탁음" },
        { char:"ジ",answers:["ji","지"],row:"탁음" },
        { char:"ズ",answers:["zu","즈"],row:"탁음" },
        { char:"ゼ",answers:["ze","제"],row:"탁음" },
        { char:"ゾ",answers:["zo","조"],row:"탁음" },
        { char:"ダ",answers:["da","다"],row:"탁음" },
        { char:"ヂ",answers:["ji","지"],row:"탁음" },
        { char:"ヅ",answers:["zu","즈"],row:"탁음" },
        { char:"デ",answers:["de","데"],row:"탁음" },
        { char:"ド",answers:["do","도"],row:"탁음" },
        { char:"バ",answers:["ba","바"],row:"탁음" },
        { char:"ビ",answers:["bi","비"],row:"탁음" },
        { char:"ブ",answers:["bu","부"],row:"탁음" },
        { char:"ベ",answers:["be","베"],row:"탁음" },
        { char:"ボ",answers:["bo","보"],row:"탁음" }
      ],
      "반탁음": [
        { char:"パ",answers:["pa","파"],row:"반탁음" },
        { char:"ピ",answers:["pi","피"],row:"반탁음" },
        { char:"プ",answers:["pu","푸"],row:"반탁음" },
        { char:"ペ",answers:["pe","페"],row:"반탁음" },
        { char:"ポ",answers:["po","포"],row:"반탁음" }
      ],
      "요음": [
        { char:"キャ",answers:["kya","캬"],row:"요음" },
        { char:"キュ",answers:["kyu","큐"],row:"요음" },
        { char:"キョ",answers:["kyo","쿄"],row:"요음" },
        { char:"シャ",answers:["sha","샤"],row:"요음" },
        { char:"シュ",answers:["shu","슈"],row:"요음" },
        { char:"ショ",answers:["sho","쇼"],row:"요음" },
        { char:"チャ",answers:["cha","챠"],row:"요음" },
        { char:"チュ",answers:["chu","츄"],row:"요음" },
        { char:"チョ",answers:["cho","쵸"],row:"요음" },
        { char:"ニャ",answers:["nya","냐"],row:"요음" },
        { char:"ニュ",answers:["nyu","뉴"],row:"요음" },
        { char:"ニョ",answers:["nyo","뇨"],row:"요음" },
        { char:"ヒャ",answers:["hya","햐"],row:"요음" },
        { char:"ヒュ",answers:["hyu","휴"],row:"요음" },
        { char:"ヒョ",answers:["hyo","효"],row:"요음" },
        { char:"ミャ",answers:["mya","먀"],row:"요음" },
        { char:"ミュ",answers:["myu","뮤"],row:"요음" },
        { char:"ミョ",answers:["myo","묘"],row:"요음" },
        { char:"リャ",answers:["rya","랴"],row:"요음" },
        { char:"リュ",answers:["ryu","류"],row:"요음" },
        { char:"リョ",answers:["ryo","료"],row:"요음" },
        { char:"ギャ",answers:["gya","갸"],row:"요음" },
        { char:"ギュ",answers:["gyu","규"],row:"요음" },
        { char:"ギョ",answers:["gyo","교"],row:"요음" },
        { char:"ジャ",answers:["ja","쟈"],row:"요음" },
        { char:"ジュ",answers:["ju","쥬"],row:"요음" },
        { char:"ジョ",answers:["jo","죠"],row:"요음" },
        { char:"ビャ",answers:["bya","뱌"],row:"요음" },
        { char:"ビュ",answers:["byu","뷰"],row:"요음" },
        { char:"ビョ",answers:["byo","뵤"],row:"요음" },
        { char:"ピャ",answers:["pya","퍄"],row:"요음" },
        { char:"ピュ",answers:["pyu","퓨"],row:"요음" },
        { char:"ピョ",answers:["pyo","표"],row:"요음" }
      ],
      "촉음": [
        { char:"カッタ",answers:["katta","캇타","칻타"],row:"촉음" },
        { char:"キッテ",answers:["kitte","킫테"],row:"촉음" },
        { char:"サッカ",answers:["sakka","삭카"],row:"촉음" },
        { char:"ニッポン",answers:["nippon","닙폰","닙퐁"],row:"촉음" },
        { char:"ガッコウ",answers:["gakkou","각코-"],row:"촉음" },
        { char:"イッショ",answers:["issho","잇쇼"],row:"촉음" },
        { char:"キップ",answers:["kippu","킵푸"],row:"촉음" },
        { char:"ザッシ",answers:["zasshi","잣시"],row:"촉음" },
        { char:"ケッコン",answers:["kekkon","켑콘"],row:"촉음" },
        { char:"シッパイ",answers:["shippai","십파이"],row:"촉음" },
        { char:"ジッケン",answers:["jikken","직켄","직켕"],row:"촉음" },
        { char:"チットモ",answers:["chittomo","칟토모"],row:"촉음" },
        { char:"ニッキ",answers:["nikki","닉키"],row:"촉음" },
        { char:"ハッパ",answers:["happa","합파"],row:"촉음" },
        { char:"マッスグ",answers:["massugu","맛스구","맛수구","맛스그","맛수그"],row:"촉음" },
        { char:"ヤッコ",answers:["yakko","약코"],row:"촉음" },
        { char:"ラッカ",answers:["rakka","락카"],row:"촉음" },
        { char:"ワッショイ",answers:["wasshoi","왓쇼이"],row:"촉음" },
        { char:"ガッチ",answers:["gacchi","갇치"],row:"촉음" },
        { char:"ザッショク",answers:["zasshoku","잣쇼쿠"],row:"촉음" }
      ],
      "장음": [
        { char:"オバーサン",answers:["obaasan","오바-상"],row:"장음" },
        { char:"オジイサン",answers:["ojiisan","오지-상"],row:"장음" },
        { char:"センセイ",answers:["sensei","센세-"],row:"장음" },
        { char:"オトウサン",answers:["otousan","오토-상"],row:"장음" },
        { char:"オカーサン",answers:["okaasan","오카-상"],row:"장음" },
        { char:"キョウト",answers:["kyouto","쿄-토"],row:"장음" },
        { char:"トウキョウ",answers:["toukyou","토-쿄-"],row:"장음" },
        { char:"コウコウ",answers:["koukou","코-코-"],row:"장음" },
        { char:"ユウメイ",answers:["yuumei","유-메-"],row:"장음" },
        { char:"エイゴ",answers:["eigo","에-고"],row:"장음" },
        { char:"オーキイ",answers:["ookii","오-키-"],row:"장음" },
        { char:"チーサイ",answers:["chiisai","치-사이"],row:"장음" },
        { char:"スウガク",answers:["suugaku","수-가쿠"],row:"장음" },
        { char:"リュウガク",answers:["ryuugaku","류-가쿠"],row:"장음" },
        { char:"キョウシツ",answers:["kyoushitsu","쿄-시츠","쿄-시추"],row:"장음" },
        { char:"ジュウドウ",answers:["juudou","주-도-","쥬-도-"],row:"장음" },
        { char:"キュウリ",answers:["kyuuri","큐-리"],row:"장음" },
        { char:"ビョウイン",answers:["byouin","뵤-인","뵤-잉"],row:"장음" },
        { char:"リョウリ",answers:["ryouri","료-리"],row:"장음" },
        { char:"ショウガッコウ",answers:["shougakkou","쇼-각코-"],row:"장음" }
      ]
    };

    let selectedCharacters = [];
    let pendingCharacters = [];
    let currentCharacter = null;
    let streak = 0;
    let bestStreak = parseInt(localStorage.getItem("katakana_bestStreak")) || 0;
    let incorrectCount = 0;
    let isFirstAttempt = true;
    let humorMode = false;

    const selectionScreen = document.getElementById("selection-screen");
    const quizScreen      = document.getElementById("quiz-screen");
    const startQuizBtn    = document.getElementById("start-quiz");
    const katakanaDisp    = document.getElementById("katakana-display");
    const answerInput     = document.getElementById("answer-input");
    const submitBtn       = document.getElementById("submit-answer");
    const feedback        = document.getElementById("feedback");
    const homeBtn         = document.getElementById("home-button");
    const selectAllBtn    = document.getElementById("select-all");
    const deselectAllBtn  = document.getElementById("deselect-all");
    const streakCtr       = document.getElementById("streak-counter");
    const bestCtr         = document.getElementById("best-counter");
    const humorBtn        = document.getElementById("humor-button");
    const currentSel      = document.getElementById("current-selection");
    const comboBestCtr    = document.getElementById("combo-best-counter");
    const showSelectedRowsBtn = document.getElementById("show-selected-rows");
    const selectedRowsList = document.getElementById("selected-rows-list");
    const toggleRowSelectionBtn = document.getElementById("toggle-row-selection");
    const rowSelectionAccordion = document.getElementById("row-selection-accordion");

    let currentComboKey = "";

    function getComboKey(rows) {
      return rows.slice().sort().join(",");
    }
    function getComboBest(key) {
      return parseInt(localStorage.getItem("katakana_bestStreak_" + key)) || 0;
    }
    function setComboBest(key, value) {
      localStorage.setItem("katakana_bestStreak_" + key, value);
    }
    function getAllComboBests() {
      let max = 0;
      for (let k in localStorage) {
        if (k.startsWith("katakana_bestStreak_")) {
          const v = parseInt(localStorage.getItem(k)) || 0;
          if (v > max) max = v;
        }
      }
      return max;
    }
    function updateCounters(selectedRows, comboBest) {
      streakCtr.textContent = `연속 정답: ${streak}`;
      bestCtr.textContent   = `전체 최고 기록: ${getAllComboBests()}`;
      if (selectedRows) {
        currentSel.textContent = `현재 선택: ${selectedRows.join(", ")}`;
      }
      if (comboBest !== undefined) {
        comboBestCtr.textContent = `이 조합의 최고 기록: ${comboBest}`;
      } else {
        comboBestCtr.textContent = "";
      }
    }
    updateCounters();

    humorBtn.addEventListener("click", () => {
      humorMode = !humorMode;
      humorBtn.textContent = humorMode ? "유머모드 On" : "유머모드 Off";
      feedback.style.fontSize = "";
      feedback.style.color    = "";
      feedback.style.animation= "";
    });

    selectAllBtn.addEventListener("click", () => {
      document.querySelectorAll('input[name="rows"]').forEach(cb => cb.checked = true);
    });
    deselectAllBtn.addEventListener("click", () => {
      document.querySelectorAll('input[name="rows"]').forEach(cb => cb.checked = false);
    });

    startQuizBtn.addEventListener("click", () => {
      const checked = Array.from(document.querySelectorAll('input[name="rows"]:checked'))
                           .map(cb => cb.value);
      if (checked.length === 0) {
        alert("하나 이상의 행을 선택하세요.");
        return;
      }
      selectedCharacters = [];
      checked.forEach(key => {
        if (katakanaData[key]) selectedCharacters.push(...katakanaData[key]);
      });
      pendingCharacters = shuffle(selectedCharacters.slice());
      streak = 0;
      incorrectCount = 0;
      currentComboKey = getComboKey(checked);
      const comboBest = getComboBest(currentComboKey);
      updateCounters(checked, comboBest);
      feedback.textContent = "";
      feedback.style.fontSize = "";
      feedback.style.color    = "";
      feedback.style.animation= "";
      selectionScreen.style.display = "none";
      quizScreen.style.display      = "block";
      startQuizBtn.style.display    = "none";
      answerInput.focus();
      nextCharacter();
    });

    homeBtn.addEventListener("click", () => {
      pendingCharacters = [];
      selectedCharacters = [];
      quizScreen.style.display      = "none";
      selectionScreen.style.display = "block";
      startQuizBtn.style.display    = "block";
      feedback.textContent = "";
      answerInput.value    = "";
      streak = 0;
      incorrectCount = 0;
      updateCounters();
      currentSel.textContent = "";
      comboBestCtr.textContent = "";
      currentComboKey = "";
    });

    function nextCharacter() {
      feedback.textContent = "";
      feedback.style.fontSize = "";
      feedback.style.color    = "";
      feedback.style.animation= "";
      answerInput.value   = "";
      isFirstAttempt      = true;
      incorrectCount      = 0;
      if (pendingCharacters.length === 0) {
        pendingCharacters = shuffle(selectedCharacters.slice());
      }
      currentCharacter = pendingCharacters.pop();
      katakanaDisp.textContent = currentCharacter.char;
    }

    function checkAnswer() {
      const ans = answerInput.value.trim().toLowerCase();
      
      // 빈 답안일 때는 아무 상호작용 없음
      if (ans === "") {
        return;
      }
      
      if (currentCharacter.answers.includes(ans)) {
        if (isFirstAttempt) streak++;
        else streak = 1;
        let comboBest = getComboBest(currentComboKey);
        if (streak > comboBest) {
          setComboBest(currentComboKey, streak);
          comboBest = streak;
        }
        updateCounters(currentComboKey ? currentComboKey.split(",") : undefined, comboBest);
        nextCharacter();
      } else {
        incorrectCount++;
        isFirstAttempt = false;
        streak = 0;
        updateCounters(currentComboKey ? currentComboKey.split(",") : undefined, getComboBest(currentComboKey));
        let msg = "틀렸습니다" + "!".repeat(incorrectCount);
        if (humorMode) {
          const size = 20 + incorrectCount * 5;
          const colors = ["#FFCC99","#FFA500","#FF0000","#A52A2A","#000000"];
          const idx = Math.min(incorrectCount - 1, colors.length - 1);
          feedback.style.fontSize = size + "px";
          feedback.style.color    = colors[idx];
          feedback.style.animation= "shake 0.5s";
        } else {
          feedback.style.fontSize = "";
          feedback.style.color    = "";
          feedback.style.animation= "";
        }
        feedback.textContent = msg;
        if (incorrectCount >= 5) {
          feedback.textContent += ` 힌트: 이 문자는 '${currentCharacter.row}'에 속합니다.`;
        }
        // 오답 기록
        const key = katakanaList[currentIndex] + '|' + romajiList[currentIndex];
        wrongCounts[key] = (wrongCounts[key] || 0) + 1;
        saveWrongCounts();
      }
    }

    submitBtn.addEventListener("click", checkAnswer);
    answerInput.addEventListener("keyup", e => {
      if (e.key === "Enter") checkAnswer();
    });

    showSelectedRowsBtn.addEventListener("click", function() {
      const checked = document.querySelectorAll('.row-selection-container input[type="checkbox"]:checked');
      if (checked.length === 0) {
        selectedRowsList.textContent = "선택된 행이 없습니다.";
      } else {
        selectedRowsList.innerHTML = Array.from(checked).map(cb => {
          const label = document.querySelector('label[for="' + cb.id + '"]');
          return label ? label.textContent : cb.value;
        }).join(', ');
      }
      if (selectedRowsList.style.display === "none" || selectedRowsList.style.display === "") {
        selectedRowsList.style.display = "block";
        showSelectedRowsBtn.textContent = "닫기";
      } else {
        selectedRowsList.style.display = "none";
        showSelectedRowsBtn.textContent = "현재 선택한 행 보기";
      }
    });

    toggleRowSelectionBtn.addEventListener("click", function() {
      if (rowSelectionAccordion.style.display === "none" || rowSelectionAccordion.style.display === "") {
        rowSelectionAccordion.style.display = "block";
        toggleRowSelectionBtn.textContent = "행 선택 접기";
      } else {
        rowSelectionAccordion.style.display = "none";
        toggleRowSelectionBtn.textContent = "행 선택 펼치기";
      }
    });
});
