import { wordList as allHiraganaWords } from './hiragana_word_data.js';

document.addEventListener('DOMContentLoaded', function() {
    renderLibrary();

    document.getElementById('delete-all').onclick = deleteAll;
    document.getElementById('play-wrong-items').onclick = playWrongItems;

    function renderLibrary() {
        // 글자
        const wrongChar = JSON.parse(localStorage.getItem('hiraganaTextWrongCounts') || '{}');
        const charList = document.getElementById('char-list');
        let charHtml = '';
        for (const key in wrongChar) {
            if (wrongChar[key] >= 5) {
                const [char, pron] = key.split('|');
                charHtml += `<div class='card' data-key='${key}'><button class='del-btn' title='삭제' onclick='deleteChar("${key}")'>&times;</button><div class='main'>${char}</div><div class='pron'>발음: ${pron}</div><div class='wrong'>틀린 횟수: ${wrongChar[key]}</div></div>`;
            }
        }
        charList.innerHTML = charHtml || '<div class="empty-msg">5회 이상 틀린 글자가 없습니다.</div>';

        // 단어
        const wrongWord = JSON.parse(localStorage.getItem('hiraganaWordWrongCounts') || '{}');
        const wordList = document.getElementById('word-list');
        let wordHtml = '';
        for (const key in wrongWord) {
            if (wrongWord[key] >= 5) {
                const [word, pron] = key.split('|');
                wordHtml += `<div class='card' data-key='${key}'><button class='del-btn' title='삭제' onclick='deleteWord("${key}")'>&times;</button><div class='main'>${word}</div><div class='pron'>발음: ${pron}</div><div class='mean'>뜻: -</div><div class='wrong'>틀린 횟수: ${wrongWord[key]}</div></div>`;
            }
        }
        wordList.innerHTML = wordHtml || '<div class="empty-msg">5회 이상 틀린 단어가 없습니다.</div>';
    }

    window.deleteChar = function(key) {
        const wrongChar = JSON.parse(localStorage.getItem('hiraganaTextWrongCounts') || '{}');
        delete wrongChar[key];
        localStorage.setItem('hiraganaTextWrongCounts', JSON.stringify(wrongChar));
        renderLibrary();
    };

    window.deleteWord = function(key) {
        const wrongWord = JSON.parse(localStorage.getItem('hiraganaWordWrongCounts') || '{}');
        delete wrongWord[key];
        localStorage.setItem('hiraganaWordWrongCounts', JSON.stringify(wrongWord));
        renderLibrary();
    };

    function deleteAll() {
        if(confirm('정말 모든 오답 기록을 삭제하시겠습니까?')) {
            localStorage.removeItem('hiraganaTextWrongCounts');
            localStorage.removeItem('hiraganaWordWrongCounts');
            renderLibrary();
        }
    }

    function playWrongItems() {
        const wrongChars = Object.entries(JSON.parse(localStorage.getItem('hiraganaTextWrongCounts') || '{}'))
                               .filter(([k, v]) => v >= 5)
                               .map(([key, count]) => {
                                   const [char, pron] = key.split('|');
                                   return { hira: char, answer: [pron, char] };
                               });

        const wrongWords = Object.entries(JSON.parse(localStorage.getItem('hiraganaWordWrongCounts') || '{}'))
                               .filter(([k, v]) => v >= 5)
                               .map(([key, count]) => {
                                   const [word, pron] = key.split('|');
                                   const found = allHiraganaWords.find(w => w.hira === word);
                                   if (found) return { hira: word, answer: found.answer.concat([pron, word]) };
                                   return { hira: word, answer: [pron, word] };
                               });

        const total = wrongChars.length + wrongWords.length;
        if (total < 8) {
            alert('단어와 글자 수의 합이 8개 이상이 되어야 합니다.');
            return;
        }

        localStorage.setItem('hiraganaGameMode', 'wrongOnly');
        localStorage.setItem('hiraganaGameWrongChars', JSON.stringify(wrongChars));
        localStorage.setItem('hiraganaGameWrongWords', JSON.stringify(wrongWords));
        
        location.href = 'hiragana_word.html';
    }
});