import { shuffle } from '../../common/js/common.js';
import { wordList as allWords } from './katakana_word_data.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameState = {
        words: [],
        currentWordIndex: 0,
        correctCount: 0,
        wrongCount: 0,
        wrongWords: JSON.parse(localStorage.getItem('katakanaWordWrongCounts') || '{}')
    };

    const elements = {
        wordDisplay: document.getElementById('katakana-word'),
        answerInput: document.getElementById('word-answer-input'),
        submitBtn: document.getElementById('word-submit-answer'),
        showAnswerBtn: document.getElementById('word-show-answer'),
        feedback: document.getElementById('word-feedback'),
        progress: document.getElementById('word-progress'),
        restartBtn: document.getElementById('word-restart-btn')
    };

    function startGame() {
        const gameMode = localStorage.getItem('katakanaGameMode');
        if (gameMode === 'wrongOnly') {
            const wrongWordKeys = Object.keys(gameState.wrongWords);
            gameState.words = allWords.filter(word => wrongWordKeys.includes(word.kata + '|' + word.answer[0]));
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

        showNextWord();
    }

    function showNextWord() {
        if (gameState.currentWordIndex >= gameState.words.length) {
            endGame();
            return;
        }

        const currentWord = gameState.words[gameState.currentWordIndex];
        elements.wordDisplay.textContent = currentWord.kata;
        elements.answerInput.value = '';
        elements.feedback.textContent = '';
        elements.progress.textContent = `${gameState.currentWordIndex + 1} / ${gameState.words.length}`;
        elements.answerInput.focus();
    }

    function checkAnswer() {
        const userAnswer = elements.answerInput.value.trim();
        if (userAnswer === '') return;

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

        const key = currentWord.kata + '|' + currentWord.answer[0];
        gameState.wrongWords[key] = (gameState.wrongWords[key] || 0) + 1;
        localStorage.setItem('katakanaWordWrongCounts', JSON.stringify(gameState.wrongWords));
    }

    function showAnswer() {
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
            localStorage.removeItem('katakanaGameMode');
            setTimeout(startGame, 2000);
        } else {
            elements.feedback.textContent = `게임 종료! 정답: ${gameState.correctCount} / 오답: ${gameState.wrongCount}`;
            elements.restartBtn.style.display = 'inline-block';
        }
    }

    elements.submitBtn.addEventListener('click', checkAnswer);
    elements.answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    elements.restartBtn.addEventListener('click', startGame);
    elements.showAnswerBtn.addEventListener('click', showAnswer);

    startGame();
});