import { shuffle } from '../../common/js/common.js';
import { wordList as allWords } from './hiragana_word_data.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameState = {
        words: [],
        currentWordIndex: 0,
        correctCount: 0,
        wrongCount: 0,
        wrongWords: JSON.parse(localStorage.getItem('hiraganaWordWrongCounts') || '{}')
    };

    const elements = {
        wordDisplay: document.getElementById('hiragana-word'),
        answerInput: document.getElementById('word-answer-input'),
        submitBtn: document.getElementById('word-submit-answer'),
        showAnswerBtn: document.getElementById('word-show-answer'),
        feedback: document.getElementById('word-feedback'),
        progress: document.getElementById('word-progress'),
        restartBtn: document.getElementById('word-restart-btn')
    };

    function startGame() {
        const gameMode = localStorage.getItem('hiraganaGameMode');
        if (gameMode === 'wrongOnly') {
            const wrongWordKeys = Object.keys(gameState.wrongWords);
            gameState.words = allWords.filter(word => wrongWordKeys.includes(word.hira + '|' + word.answer[0]));
        } else {
            gameState.words = [...allWords];
        }

        if (gameState.words.length === 0) {
            endGame(true); // true: 단어 없음
            return;
        }

        shuffle(gameState.words);
        gameState.currentWordIndex = 0;
        gameState.correctCount = 0;
        gameState.wrongCount = 0;

        elements.restartBtn.style.display = 'none';
        elements.submitBtn.style.display = 'inline-block';
        elements.showAnswerBtn.style.display = 'inline-block';
        elements.answerInput.style.display = 'inline-block';

        elements.answerInput.disabled = false; // Enable input
        elements.submitBtn.disabled = false; // Enable submit button
        elements.showAnswerBtn.disabled = false; // Enable show answer button

        showNextWord();
    }

    function showNextWord() {
        if (gameState.currentWordIndex >= gameState.words.length) {
            endGame();
            return;
        }

        const currentWord = gameState.words[gameState.currentWordIndex];
        elements.wordDisplay.textContent = currentWord.hira;
        elements.answerInput.value = '';
        elements.feedback.textContent = '';
        elements.progress.textContent = `${gameState.currentWordIndex + 1} / ${gameState.words.length}`;
        elements.answerInput.focus();

        elements.answerInput.disabled = false; // Enable input
        elements.submitBtn.disabled = false; // Enable submit button
        elements.showAnswerBtn.disabled = false; // Enable show answer button
    }

    function checkAnswer() {
        const userAnswer = elements.answerInput.value.trim();
        if (userAnswer === '') return;

        elements.answerInput.disabled = true; // Disable input
        elements.submitBtn.disabled = true; // Disable submit button
        elements.showAnswerBtn.disabled = true; // Disable show answer button

        const currentWord = gameState.words[gameState.currentWordIndex];
        const isCorrect = currentWord.answer.includes(userAnswer);

        if (isCorrect) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }

        setTimeout(() => {
            gameState.currentWordIndex++;
            showNextWord();
        }, isCorrect ? 700 : 1200);
    }

    function handleCorrectAnswer() {
        elements.feedback.textContent = '✔️ 정답!';
        elements.feedback.className = 'correct';
        gameState.correctCount++;
    }

    function handleWrongAnswer() {
        const currentWord = gameState.words[gameState.currentWordIndex];
        elements.feedback.textContent = `❌ 오답! 정답: ${currentWord.answer.join(', ')}`;
        elements.feedback.className = 'wrong';
        gameState.wrongCount++;

        const key = currentWord.hira + '|' + currentWord.answer[0];
        gameState.wrongWords[key] = (gameState.wrongWords[key] || 0) + 1;
        localStorage.setItem('hiraganaWordWrongCounts', JSON.stringify(gameState.wrongWords));
    }

    function showAnswer() {
        elements.answerInput.disabled = true; // Disable input
        elements.submitBtn.disabled = true; // Disable submit button
        elements.showAnswerBtn.disabled = true; // Disable show answer button

        const currentWord = gameState.words[gameState.currentWordIndex];
        elements.feedback.textContent = `💡 정답: ${currentWord.answer.join(', ')}`;
        elements.feedback.className = 'info';

        setTimeout(() => {
            gameState.currentWordIndex++;
            showNextWord();
        }, 3000);
    }

    function endGame(noWords = false) {
        elements.wordDisplay.textContent = '';
        elements.answerInput.style.display = 'none';
        elements.submitBtn.style.display = 'none';
        elements.showAnswerBtn.style.display = 'none';
        elements.progress.textContent = '';

        if (noWords) {
            elements.feedback.textContent = '학습할 단어가 없습니다. 전체 단어 학습을 시작합니다.';
            localStorage.removeItem('hiraganaGameMode');
            setTimeout(startGame, 2000);
        } else {
            elements.feedback.textContent = `게임 종료! 정답: ${gameState.correctCount} / 오답: ${gameState.wrongCount}`;
            elements.restartBtn.style.display = 'inline-block';
        }
        elements.answerInput.disabled = true; // Ensure disabled at end of game
        elements.submitBtn.disabled = true; // Ensure disabled at end of game
        elements.showAnswerBtn.disabled = true; // Ensure disabled at end of game
    }

    elements.submitBtn.addEventListener('click', checkAnswer);
    elements.answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    elements.restartBtn.addEventListener('click', startGame);
    elements.showAnswerBtn.addEventListener('click', showAnswer);

    // 오답노트 모드 버튼 (예시 - hiragana.html에 추가 필요)
    const wrongOnlyBtn = document.getElementById('wrong-only-mode-btn');
    if(wrongOnlyBtn) {
        wrongOnlyBtn.addEventListener('click', () => {
            localStorage.setItem('hiraganaGameMode', 'wrongOnly');
            startGame();
        });
    }

    startGame();
});