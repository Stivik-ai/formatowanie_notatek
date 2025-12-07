document.addEventListener('DOMContentLoaded', function() {
    const inputArea = document.getElementById('inputArea');
    const lineLengthInput = document.getElementById('lineLength');

    inputArea.addEventListener('input', formatText);
    lineLengthInput.addEventListener('input', formatText);


    inputArea.value = "To jest długi tekst z nadmiarowymi   spacjami, \t inteligentnymi 'cudzysłowami' i twardymi spacjami. Musimy go wyczyścić i złamać na krótkie linie dla zegarka.";
    formatText();
});

function formatText() {
    const inputElement = document.getElementById('inputArea');
    const outputElement = document.getElementById('outputArea');
    const maxLen = parseInt(document.getElementById('lineLength').value, 10) || 35;
    
    let text = inputElement.value;

    text = text.replace(/[\u2018\u2019]/g, "'");
    text = text.replace(/[\u201C\u201D]/g, '"');
    text = text.replace(/\u00A0|\t/g, ' '); 
    
    let cleanedText = text.replace(/\s+/g, ' ').trim();
    
    if (cleanedText === "") {
        outputElement.value = "";
        return;
    }
    
    let formattedText = '';
    let currentLine = '';
    
    const words = cleanedText.split(' ');
    
    words.forEach(word => {
        if (word.length === 0) return; 

        let potentialNewLength = (currentLine.length > 0 ? (currentLine + ' ' + word).length : word.length);

        if (potentialNewLength > maxLen && currentLine.length > 0) {
            formattedText += currentLine + '\n';
            currentLine = word;
        } else {
            if (currentLine.length > 0) {
                currentLine += ' ' + word;
            } else {
                currentLine = word;
            }
        }
    });
    
    formattedText += currentLine;
    
    outputElement.value = formattedText;
    
    
}
document.addEventListener("DOMContentLoaded", function () {
    const steve = document.getElementById("drifting-steve");

    let x = 50;
    let y = 50;
    let vx = 0.03; // prędkość w % viewportu na ms (wolniej)
    let vy = -0.02;

    function randomDirection() {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.02 + Math.random() * 0.03; // zakres prędkości
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
    }

    function randomPosition() {
        x = Math.random() * 100;
        y = Math.random() * 100;
    }

    let last = performance.now();

    function tick(now) {
        const dt = now - last;
        last = now;

        x += vx * dt;
        y += vy * dt;

        if (x < -20) x = 120;
        if (x > 120) x = -20;
        if (y < -20) y = 120;
        if (y > 120) y = -20;

        steve.style.transform =
            `translate(-50%, -50%) translate(${x}vw, ${y}vh) rotate(${now / 50}deg)`;

        requestAnimationFrame(tick);
    }

    randomPosition();
    randomDirection();

    setInterval(randomDirection, 4000 + Math.random() * 4000);

    requestAnimationFrame(tick);
});

