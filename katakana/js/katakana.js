document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('show-katakana-library-toggle');
    const libraryContainer = document.getElementById('katakana-library');

    toggleBtn.addEventListener('click', function() {
        if (libraryContainer.style.display === 'none' || libraryContainer.style.display === '') {
            libraryContainer.innerHTML = createLibraryHTML();
            libraryContainer.style.display = 'block';
            toggleBtn.textContent = '나만의 가타카나 도서관 닫기';
        } else {
            libraryContainer.style.display = 'none';
            toggleBtn.textContent = '나만의 가타카나 도서관 보기';
        }
    });

    function createLibraryHTML() {
        const wrongChar = JSON.parse(localStorage.getItem('katakanaTextWrongCounts') || '{}');
        const wrongWord = JSON.parse(localStorage.getItem('katakanaWordWrongCounts') || '{}');

        let html = '<h2>나만의 가타카나 도서관</h2>';

        html += '<h3>자주 틀리는 글자 (5회 이상)</h3>';
        html += createTable(['글자', '발음', '틀린 횟수'], getTableRows(wrongChar, ['char', 'pron', 'count']));

        html += '<h3>자주 틀리는 단어 (5회 이상)</h3>';
        html += createTable(['단어', '발음', '뜻', '틀린 횟수'], getTableRows(wrongWord, ['word', 'pron', 'mean', 'count']));

        return html;
    }

    function createTable(headers, rows) {
        let table = '<table class="library-table">';
        table += '<thead><tr>';
        headers.forEach(header => {
            table += `<th>${header}</th>`;
        });
        table += '</tr></thead>';
        table += '<tbody>';
        if (rows.length > 0) {
            table += rows;
        } else {
            table += `<tr><td colspan="${headers.length}">아직 데이터가 없습니다.</td></tr>`;
        }
        table += '</tbody></table>';
        return table;
    }

    function getTableRows(data, columns) {
        let rows = '';
        for (const key in data) {
            if (data[key] >= 5) {
                const parts = key.split('|');
                rows += '<tr>';
                columns.forEach((col, index) => {
                    let value = '-';
                    if (col === 'count') {
                        value = data[key];
                    } else if (parts[index]) {
                        value = parts[index];
                    }
                    rows += `<td>${value}</td>`;
                });
                rows += '</tr>';
            }
        }
        return rows;
    }
});