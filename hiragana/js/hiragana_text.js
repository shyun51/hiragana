import { shuffle } from '../../common/js/common.js';
import { hiraganaData } from './hiragana_text_data.js';

document.addEventListener("DOMContentLoaded", function() {
    const gameState = {
        selectedCharacters: [],
        pendingCharacters: [],
        currentCharacter: null,
        streak: 0,
        bestStreak: parseInt(localStorage.getItem("bestStreak")) || 0,
        incorrectCount: 0,
        isFirstAttempt: true,
        humorMode: false,
        wrongCounts: JSON.parse(localStorage.getItem('hiraganaTextWrongCounts') || '{}'),
        currentComboKey: ""
    };

    const elements = {
        selectionScreen: document.getElementById("selection-screen"),
        quizScreen: document.getElementById("quiz-screen"),
        startQuizBtn: document.getElementById("start-quiz"),
        hiraganaDisp: document.getElementById("hiragana-display"),
        answerInput: document.getElementById("answer-input"),
        submitBtn: document.getElementById("submit-answer"),
        feedback: document.getElementById("feedback"),
        homeBtn: document.getElementById("home-button"),
        selectAllBtn: document.getElementById("select-all"),
        deselectAllBtn: document.getElementById("deselect-all"),
        streakCtr: document.getElementById("streak-counter"),
        bestCtr: document.getElementById("best-counter"),
        humorBtn: document.getElementById("humor-button"),
        humorHelpBtn: document.getElementById("humor-help-button"),
        currentSel: document.getElementById("current-selection"),
        comboBestCtr: document.getElementById("combo-best-counter"),
        showSelectedRowsBtn: document.getElementById("show-selected-rows"),
        selectedRowsList: document.getElementById("selected-rows-list"),
        toggleRowSelectionBtn: document.getElementById("toggle-row-selection"),
        rowSelectionAccordion: document.getElementById("row-selection-accordion"),
        rowCheckboxes: document.querySelectorAll('input[name="rows"]')
    };

    function getComboKey(rows) {
        return rows.slice().sort().join(",");
    }

    function getComboBest(key) {
        return parseInt(localStorage.getItem("bestStreak_" + key)) || 0;
    }

    function setComboBest(key, value) {
        localStorage.setItem("bestStreak_" + key, value);
    }

    function getAllComboBests() {
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
        elements.streakCtr.textContent = `연속 정답: ${gameState.streak}`;
        elements.bestCtr.textContent = `전체 최고 기록: ${getAllComboBests()}`;
        if (selectedRows) {
            elements.currentSel.textContent = `현재 선택: ${selectedRows.join(", ")}`;
        }
        if (comboBest !== undefined) {
            elements.comboBestCtr.textContent = `이 조합의 최고 기록: ${comboBest}`;
        } else {
            elements.comboBestCtr.textContent = "";
        }
    }
    updateCounters();

    elements.humorBtn.addEventListener("click", () => {
        gameState.humorMode = !gameState.humorMode;
        elements.humorBtn.textContent = gameState.humorMode ? "유머모드 On" : "유머모드 Off";
        elements.feedback.style.fontSize = "";
        elements.feedback.style.color = "";
        elements.feedback.style.animation = "";
    });

    elements.humorHelpBtn.addEventListener("click", () => {
        const helpText = `😆 유머모드 도움말 😆\n\n틀릴 때마다 피드백이 점점 더 커지고 색이 변해요!\n- 1번 틀림: 주황색으로 커짐\n- 2번 틀림: 빨간색으로 더 커짐  \n- 3번 틀림: 진한 빨간색으로 더더 커짐\n- 4번 틀림: 검은색으로 최대 크!\n\n그리고 흔들리는 애니메이션도 추가돼요! 😄`;
        
        if (confirm(helpText + "\n\n이 도움말을 다시 보시겠어요?")) {
            setTimeout(() => elements.humorHelpBtn.click(), 100);
        }
    });

    elements.selectAllBtn.addEventListener("click", () => {
        elements.rowCheckboxes.forEach(cb => cb.checked = true);
    });
    elements.deselectAllBtn.addEventListener("click", () => {
        elements.rowCheckboxes.forEach(cb => cb.checked = false);
    });

    elements.startQuizBtn.addEventListener("click", () => {
        const checked = Array.from(elements.rowCheckboxes)
                             .filter(cb => cb.checked)
                             .map(cb => cb.value);
        if (checked.length === 0) {
            alert("하나 이상의 행을 선택하세요.");
            return;
        }
        gameState.selectedCharacters = [];
        checked.forEach(key => {
            if (hiraganaData[key]) gameState.selectedCharacters.push(...hiraganaData[key]);
        });
        gameState.pendingCharacters = shuffle(gameState.selectedCharacters.slice());
        gameState.streak = 0;
        gameState.incorrectCount = 0;
        gameState.currentComboKey = getComboKey(checked);
        const comboBest = getComboBest(gameState.currentComboKey);
        updateCounters(checked, comboBest);
        elements.feedback.textContent = "";
        elements.feedback.style.fontSize = "";
        elements.feedback.style.color = "";
        elements.feedback.style.animation = "";
        elements.selectionScreen.style.display = "none";
        elements.quizScreen.style.display = "flex"; // Use flex for quiz screen
        elements.startQuizBtn.style.display = "none";
        elements.answerInput.focus();
        nextCharacter();
    });

    elements.homeBtn.addEventListener("click", () => {
        gameState.pendingCharacters = [];
        gameState.selectedCharacters = [];
        elements.quizScreen.style.display = "none";
        elements.selectionScreen.style.display = "block";
        elements.startQuizBtn.style.display = "block";
        elements.feedback.textContent = "";
        elements.answerInput.value = "";
        gameState.streak = 0;
        gameState.incorrectCount = 0;
        updateCounters();
        elements.currentSel.textContent = "";
        elements.comboBestCtr.textContent = "";
        gameState.currentComboKey = "";
    });

    function nextCharacter() {
        elements.feedback.textContent = "";
        elements.feedback.style.fontSize = "";
        elements.feedback.style.color = "";
        elements.feedback.style.animation = "";
        elements.answerInput.value = "";
        gameState.isFirstAttempt = true;
        gameState.incorrectCount = 0;
        if (gameState.pendingCharacters.length === 0) {
            gameState.pendingCharacters = shuffle(gameState.selectedCharacters.slice());
        }
        gameState.currentCharacter = gameState.pendingCharacters.pop();
        elements.hiraganaDisp.textContent = gameState.currentCharacter.char;
        elements.answerInput.focus();
    }

    function checkAnswer() {
        const ans = elements.answerInput.value.trim().toLowerCase();
        
        if (ans === "") {
            return;
        }
        
        if (gameState.currentCharacter.answers.includes(ans)) {
            if (gameState.isFirstAttempt) gameState.streak++;
            else gameState.streak = 1;
            let comboBest = getComboBest(gameState.currentComboKey);
            if (gameState.streak > comboBest) {
                setComboBest(gameState.currentComboKey, gameState.streak);
                comboBest = gameState.streak;
            }
            updateCounters(gameState.currentComboKey ? gameState.currentComboKey.split(",") : undefined, comboBest);
            nextCharacter();
        } else {
            gameState.incorrectCount++;
            gameState.isFirstAttempt = false;
            gameState.streak = 0;
            updateCounters(gameState.currentComboKey ? gameState.currentComboKey.split(",") : undefined, getComboBest(gameState.currentComboKey));
            let msg = "틀렸습니다" + "!".repeat(gameState.incorrectCount);
            if (gameState.humorMode) {
                const size = 20 + gameState.incorrectCount * 5;
                const colors = ["#FFCC99","#FFA500","#FF0000","#A52A2A","#000000"];
                const idx = Math.min(gameState.incorrectCount - 1, colors.length - 1);
                elements.feedback.style.fontSize = size + "px";
                elements.feedback.style.color = colors[idx];
                elements.feedback.style.animation = "shake 0.5s";
            } else {
                elements.feedback.style.fontSize = "";
                elements.feedback.style.color = "";
                elements.feedback.style.animation = "";
            }
            elements.feedback.textContent = msg;
            if (gameState.incorrectCount >= 5) {
                elements.feedback.textContent += ` 힌트: 이 문자는 '${gameState.currentCharacter.row}'에 속합니다.`;
            }
            const key = gameState.currentCharacter.char + '|' + gameState.currentCharacter.answers[0];
            gameState.wrongCounts[key] = (gameState.wrongCounts[key] || 0) + 1;
            saveWrongCounts();
        }
    }

    elements.submitBtn.addEventListener("click", checkAnswer);
    elements.answerInput.addEventListener("keyup", e => {
        if (e.key === "Enter") checkAnswer();
    });

    elements.showSelectedRowsBtn.addEventListener("click", function() {
        const checked = Array.from(elements.rowCheckboxes).filter(cb => cb.checked);
        if (checked.length === 0) {
            elements.selectedRowsList.textContent = "선택된 행이 없습니다.";
        } else {
            elements.selectedRowsList.innerHTML = checked.map(cb => {
                const label = document.querySelector('label[for="' + cb.id + '"]');
                return label ? label.textContent : cb.value;
            }).join(', ');
        }
        if (elements.selectedRowsList.style.display === "none" || elements.selectedRowsList.style.display === "") {
            elements.selectedRowsList.style.display = "block";
            elements.showSelectedRowsBtn.textContent = "닫기";
        } else {
            elements.selectedRowsList.style.display = "none";
            elements.showSelectedRowsBtn.textContent = "현재 선택한 행 보기";
        }
    });

    elements.toggleRowSelectionBtn.addEventListener("click", function() {
        if (elements.rowSelectionAccordion.style.display === "none" || elements.rowSelectionAccordion.style.display === "") {
            elements.rowSelectionAccordion.style.display = "block";
            elements.toggleRowSelectionBtn.textContent = "행 선택 접기";
        } else {
            elements.rowSelectionAccordion.style.display = "none";
            elements.toggleRowSelectionBtn.textContent = "행 선택 펼치기";
        }
    });

    function saveWrongCounts() {
        localStorage.setItem('hiraganaTextWrongCounts', JSON.stringify(gameState.wrongCounts));
    }
});