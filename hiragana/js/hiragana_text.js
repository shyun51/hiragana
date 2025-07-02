import { shuffle } from './common.js';

document.addEventListener("DOMContentLoaded", function() {
    const hiraganaData = {
      /* 기본 10개 행 */
      "あ行": [
        { char: "あ", answers: ["a","아"], row: "아행 (あ行)" },
        { char: "い", answers: ["i","이"], row: "아행 (あ行)" },
        { char: "う", answers: ["u","우"], row: "아행 (あ行)" },
        { char: "え", answers: ["e","에"], row: "아행 (あ行)" },
        { char: "お", answers: ["o","오"], row: "아행 (あ行)" }
      ],
      "か行": [
        { char: "か", answers: ["ka","카"], row: "카행 (か行)" },
        { char: "き", answers: ["ki","키"], row: "카행 (か行)" },
        { char: "く", answers: ["ku","쿠"], row: "카행 (か行)" },
        { char: "け", answers: ["ke","케"], row: "카행 (か行)" },
        { char: "こ", answers: ["ko","코"], row: "카행 (か行)" }
      ],
      "さ行": [
        { char: "さ", answers: ["sa","사"], row: "사행 (さ行)" },
        { char: "し", answers: ["shi","si","시"], row: "사행 (さ行)" },
        { char: "す", answers: ["su","수","스"], row: "사행 (さ行)" },
        { char: "せ", answers: ["se","세"], row: "사행 (さ行)" },
        { char: "そ", answers: ["so","소"], row: "사행 (さ行)" }
      ],
      "た行": [
        { char: "た", answers: ["ta","타"], row: "타행 (た行)" },
        { char: "ち", answers: ["chi","ti","치"], row: "타행 (た行)" },
        { char: "つ", answers: ["tsu","츠"], row: "타행 (た行)" },
        { char: "て", answers: ["te","테"], row: "타행 (た行)" },
        { char: "と", answers: ["to","토"], row: "타행 (た行)" }
      ],
      "な行": [
        { char: "な", answers: ["na","나"], row: "나행 (な行)" },
        { char: "に", answers: ["ni","니"], row: "나행 (な行)" },
        { char: "ぬ", answers: ["nu","누"], row: "나행 (な行)" },
        { char: "ね", answers: ["ne","네"], row: "나행 (な行)" },
        { char: "の", answers: ["no","노"], row: "나행 (な行)" }
      ],
      "は行": [
        { char: "は", answers: ["ha","하"], row: "하행 (は行)" },
        { char: "ひ", answers: ["hi","히"], row: "하행 (는行)" },
        { char: "ふ", answers: ["fu","후","hu"], row: "하행 (は行)" },
        { char: "へ", answers: ["he","헤"], row: "하행 (는行)" },
        { char: "ほ", answers: ["ho","호"], row: "하행 (는行)" }
      ],
      "ま行": [
        { char: "ま", answers: ["ma","마"], row: "마행 (ま行)" },
        { char: "み", answers: ["mi","미"], row: "마행 (ま行)" },
        { char: "む", answers: ["mu","무"], row: "마행 (ま行)" },
        { char: "め", answers: ["me","메"], row: "마행 (ま行)" },
        { char: "も", answers: ["mo","모"], row: "마행 (ま행)" }
      ],
      "や行": [
        { char: "や", answers: ["ya","야"], row: "야행 (や行)" },
        { char: "ゆ", answers: ["yu","유"], row: "야행 (や行)" },
        { char: "よ", answers: ["yo","요"], row: "야행 (や行)" }
      ],
      "ら行": [
        { char: "ら", answers: ["ra","라"], row: "라행 (ら行)" },
        { char: "り", answers: ["ri","리"], row: "라행 (ら行)" },
        { char: "る", answers: ["ru","루"], row: "라행 (ら行)" },
        { char: "れ", answers: ["re","레"], row: "라행 (ら行)" },
        { char: "ろ", answers: ["ro","로"], row: "라행 (ら行)" }
      ],
      "わ行": [
        { char: "わ", answers: ["wa","와"], row: "와행 (わ行)" },
        { char: "を", answers: ["wo","오","o"], row: "와행 (わ行)" }
      ],
  
      /* 특수음 */
      "탁음": [
        { char:"が",answers:["ga","가"],row:"탁음" },
        { char:"ぎ",answers:["gi","기"],row:"탁음" },
        { char:"ぐ",answers:["gu","구"],row:"탁음" },
        { char:"げ",answers:["ge","게"],row:"탁음" },
        { char:"ご",answers:["go","고"],row:"탁음" },
        { char:"ざ",answers:["za","자"],row:"탁음" },
        { char:"じ",answers:["ji","지"],row:"탁음" },
        { char:"ず",answers:["zu","즈"],row:"탁음" },
        { char:"ぜ",answers:["ze","제"],row:"탁음" },
        { char:"ぞ",answers:["zo","조"],row:"탁음" },
        { char:"だ",answers:["da","다"],row:"탁음" },
        { char:"ぢ",answers:["ji","지"],row:"탁음" },
        { char:"づ",answers:["zu","즈"],row:"탁음" },
        { char:"で",answers:["de","데"],row:"탁음" },
        { char:"ど",answers:["do","도"],row:"탁음" },
        { char:"ば",answers:["ba","바"],row:"탁음" },
        { char:"び",answers:["bi","비"],row:"탁음" },
        { char:"ぶ",answers:["bu","부"],row:"탁음" },
        { char:"べ",answers:["be","베"],row:"탁음" },
        { char:"ぼ",answers:["bo","보"],row:"탁음" }
      ],
      "반탁음": [
        { char:"ぱ",answers:["pa","파"],row:"반탁음" },
        { char:"ぴ",answers:["pi","피"],row:"반탁음" },
        { char:"ぷ",answers:["pu","푸"],row:"반탁음" },
        { char:"ぺ",answers:["pe","페"],row:"반탁음" },
        { char:"ぽ",answers:["po","포"],row:"반탁음" }
      ],
      "요음": [
        { char:"きゃ",answers:["kya","캬"],row:"요음" },
        { char:"きゅ",answers:["kyu","큐"],row:"요음" },
        { char:"きょ",answers:["kyo","쿄"],row:"요음" },
        { char:"しゃ",answers:["sha","샤"],row:"요음" },
        { char:"しゅ",answers:["shu","슈"],row:"요음" },
        { char:"しょ",answers:["sho","쇼"],row:"요음" },
        { char:"ちゃ",answers:["cha","챠"],row:"요음" },
        { char:"ちゅ",answers:["chu","츄"],row:"요음" },
        { char:"ちょ",answers:["cho","쵸"],row:"요음" },
        { char:"にゃ",answers:["nya","냐"],row:"요음" },
        { char:"にゅ",answers:["nyu","뉴"],row:"요음" },
        { char:"にょ",answers:["nyo","뇨"],row:"요음" },
        { char:"ひゃ",answers:["hya","햐"],row:"요음" },
        { char:"ひゅ",answers:["hyu","휴"],row:"요음" },
        { char:"ひょ",answers:["hyo","효"],row:"요음" },
        { char:"みゃ",answers:["mya","먀"],row:"요음" },
        { char:"みゅ",answers:["myu","뮤"],row:"요음" },
        { char:"みょ",answers:["myo","묘"],row:"요음" },
        { char:"りゃ",answers:["rya","랴"],row:"요음" },
        { char:"りゅ",answers:["ryu","류"],row:"요음" },
        { char:"りょ",answers:["ryo","료"],row:"요음" },
        { char:"ぎゃ",answers:["gya","갸"],row:"요음" },
        { char:"ぎゅ",answers:["gyu","규"],row:"요음" },
        { char:"ぎょ",answers:["gyo","교"],row:"요음" },
        { char:"じゃ",answers:["ja","쟈"],row:"요음" },
        { char:"じゅ",answers:["ju","쥬"],row:"요음" },
        { char:"じょ",answers:["jo","죠"],row:"요음" },
        { char:"びゃ",answers:["bya","뱌"],row:"요음" },
        { char:"びゅ",answers:["byu","뷰"],row:"요음" },
        { char:"びょ",answers:["byo","뵤"],row:"요음" },
        { char:"ぴゃ",answers:["pya","퍄"],row:"요음" },
        { char:"ぴゅ",answers:["pyu","퓨"],row:"요음" },
        { char:"ぴょ",answers:["pyo","표"],row:"요음" }
      ],
      "촉음": [
        { char:"かった",answers:["katta","캇타","칻타"],row:"촉음" },
        { char:"きって",answers:["kitte","킫테"],row:"촉음" },
        { char:"さっか",answers:["sakka","삭카"],row:"촉음" },
        { char:"にっぽん",answers:["nippon","닙폰","닙퐁"],row:"촉음" },
        { char:"がっこう",answers:["gakkou","각코-"],row:"촉음" },
        { char:"いっしょ",answers:["issho","잇쇼"],row:"촉음" },
        { char:"きっぷ",answers:["kippu","킵푸"],row:"촉음" },
        { char:"ざっし",answers:["zasshi","잣시"],row:"촉음" },
        { char:"けっこん",answers:["kekkon","켑콘"],row:"촉음" },
        { char:"しっぱい",answers:["shippai","십파이"],row:"촉음" },
        { char:"じっけん",answers:["jikken","직켄","직켕"],row:"촉음" },
        { char:"ちっとも",answers:["chittomo","칟토모"],row:"촉음" },
        { char:"にっき",answers:["nikki","닉키"],row:"촉음" },
        { char:"はっぱ",answers:["happa","합파"],row:"촉음" },
        { char:"まっすぐ",answers:["massugu","맛스구","맛수구","맛스그","맛수그"],row:"촉음" },
        { char:"やっこ",answers:["yakko","약코"],row:"촉음" },
        { char:"らっか",answers:["rakka","락카"],row:"촉음" },
        { char:"わっしょい",answers:["wasshoi","왓쇼이"],row:"촉음" },
        { char:"がっち",answers:["gacchi","갇치"],row:"촉음" },
        { char:"ざっしょく",answers:["zasshoku","잣쇼쿠"],row:"촉음" }
      ],
      "장음": [
        { char:"おばあさん",answers:["obaasan","오바-상"],row:"장음" },
        { char:"おじいさん",answers:["ojiisan","오지-상"],row:"장음" },
        { char:"せんせい",answers:["sensei","센세-"],row:"장음" },
        { char:"おとうさん",answers:["otousan","오토-상"],row:"장음" },
        { char:"おかあさん",answers:["okaasan","오카-상"],row:"장음" },
        { char:"きょうと",answers:["kyouto","쿄-토"],row:"장음" },
        { char:"とうきょう",answers:["toukyou","토-쿄-"],row:"장음" },
        { char:"こうこう",answers:["koukou","코-코-"],row:"장음" },
        { char:"ゆうめい",answers:["yuumei","유-메-"],row:"장음" },
        { char:"えいご",answers:["eigo","에-고"],row:"장음" },
        { char:"おおきい",answers:["ookii","오-키-"],row:"장음" },
        { char:"ちいさい",answers:["chiisai","치-사이"],row:"장음" },
        { char:"すうがく",answers:["suugaku","수-가쿠","스-가쿠"],row:"장음" },
        { char:"りゅうがく",answers:["ryuugaku","류-가쿠"],row:"장음" },
        { char:"きょうしつ",answers:["kyoushitsu","쿄-시츠","쿄-시추"],row:"장음" },
        { char:"じゅうどう",answers:["juudou","주-도-","쥬-도-"],row:"장음" },
        { char:"きゅうり",answers:["kyuuri","큐-리"],row:"장음" },
        { char:"びょういん",answers:["byouin","뵤-인","뵤-잉"],row:"장음" },
        { char:"りょうり",answers:["ryouri","료-리"],row:"장음" },
        { char:"しょうがっこう",answers:["shougakkou","쇼-각코-"],row:"장음" },
        { char:"とらがひとをかもうとするときのうなりごえ",answers:["토라가히토오카모-토스루토키노우나리고에","토라가히토오카모-토스루토키노-나리고에"],row:"장음" },
        { char:"りゅうぐうのおとひめのもとゆいのはずし",answers:["류-구-노오토히메노모토유이노하즈시","류-구-노-토히메노모토유이노하즈시"],row:"장음" }
  
      ]
    };
  
    let selectedCharacters = [];
    let pendingCharacters = [];
    let currentCharacter = null;
    let streak = 0;
    let bestStreak = parseInt(localStorage.getItem("bestStreak")) || 0;
    let incorrectCount = 0;
    let isFirstAttempt = true;
    let humorMode = false;
  
    const selectionScreen = document.getElementById("selection-screen");
    const quizScreen      = document.getElementById("quiz-screen");
    const startQuizBtn    = document.getElementById("start-quiz");
    const hiraganaDisp    = document.getElementById("hiragana-display");
    const answerInput     = document.getElementById("answer-input");
    const submitBtn       = document.getElementById("submit-answer");
    const feedback        = document.getElementById("feedback");
    const homeBtn         = document.getElementById("home-button");
    const selectAllBtn    = document.getElementById("select-all");
    const deselectAllBtn  = document.getElementById("deselect-all");
    const streakCtr       = document.getElementById("streak-counter");
    const bestCtr         = document.getElementById("best-counter");
    const humorBtn        = document.getElementById("humor-button");
    const humorHelpBtn    = document.getElementById("humor-help-button");
    const currentSel      = document.getElementById("current-selection");
    const comboBestCtr    = document.getElementById("combo-best-counter");
    const showSelectedRowsBtn = document.getElementById("show-selected-rows");
    const selectedRowsList = document.getElementById("selected-rows-list");
    const toggleRowSelectionBtn = document.getElementById("toggle-row-selection");
    const rowSelectionAccordion = document.getElementById("row-selection-accordion");
  
    let currentComboKey = "";
  
    // 오답 기록용
    let wrongCounts = JSON.parse(localStorage.getItem('hiraganaTextWrongCounts') || '{}');
  
    function getComboKey(rows) {
      // 조합을 정렬해서 항상 같은 key가 되도록
      return rows.slice().sort().join(",");
    }
  
    function getComboBest(key) {
      return parseInt(localStorage.getItem("bestStreak_" + key)) || 0;
    }
  
    function setComboBest(key, value) {
      localStorage.setItem("bestStreak_" + key, value);
    }
  
    function getAllComboBests() {
      // localStorage에서 bestStreak_로 시작하는 값 중 최대값 반환
      let max = 0;
      for (let k in localStorage) {
        if (k.startsWith("bestStreak_")) {
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

    humorHelpBtn.addEventListener("click", () => {
      const helpText = `😆 유머모드 도움말 😆

틀릴 때마다 피드백이 점점 더 커지고 색이 변해요!
- 1번 틀림: 주황색으로 커짐
- 2번 틀림: 빨간색으로 더 커짐  
- 3번 틀림: 진한 빨간색으로 더더 커짐
- 4번 틀림: 검은색으로 최대 크기!

그리고 흔들리는 애니메이션도 추가돼요! 😄`;
      
      if (confirm(helpText + "\n\n이 도움말을 다시 보시겠어요?")) {
        // 사용자가 확인을 누르면 다시 보여줌
        setTimeout(() => humorHelpBtn.click(), 100);
      }
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
        if (hiraganaData[key]) selectedCharacters.push(...hiraganaData[key]);
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
      hiraganaDisp.textContent = currentCharacter.char;
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
        const key = currentCharacter.char + '|' + currentCharacter.answers[0];
        wrongCounts[key] = (wrongCounts[key] || 0) + 1;
        saveWrongCounts();
      }
    }
  
    submitBtn.addEventListener("click", checkAnswer);
    answerInput.addEventListener("keyup", e => {
      if (e.key === "Enter") checkAnswer();
    });
  
    showSelectedRowsBtn.addEventListener("click", function() {
      // 체크된 행 라벨만 모아서 보여주기
      const checked = document.querySelectorAll('.row-selection-container input[type="checkbox"]:checked');
      if (checked.length === 0) {
        selectedRowsList.textContent = "선택된 행이 없습니다.";
      } else {
        selectedRowsList.innerHTML = Array.from(checked).map(cb => {
          const label = document.querySelector('label[for="' + cb.id + '"]');
          return label ? label.textContent : cb.value;
        }).join(', ');
      }
      // 토글
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
  
    function saveWrongCounts() {
      localStorage.setItem('hiraganaTextWrongCounts', JSON.stringify(wrongCounts));
    }
  });
  