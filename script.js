document.addEventListener('DOMContentLoaded', function () {
    const inputArea = document.getElementById('inputArea');
    const outputArea = document.getElementById('outputArea');
    const copyBtn = document.getElementById('copyAll');

    inputArea.value =
        "To jest długi tekst z nadmiarowymi spacjami,\n" +
        "inteligentnymi 'cudzysłowami' i twardymi spacjami.\n" +
        "Musimy go wyczyścić i zamienić entery na \\n.";

    formatText();

    inputArea.addEventListener('input', formatText);

    function formatText() {
        let text = inputArea.value;

        text = text.replace(/[\u2018\u2019]/g, "'");
        text = text.replace(/[\u201C\u201D]/g, '"');
        text = text.replace(/\u00A0|\t/g, ' ');

       
        text = text
            .split('\n')
            .map(line => line.replace(/\s+/g, ' ').trim())
            .join('\n');

       
        const oneLine = text.replace(/\n/g, '\\n');

        outputArea.value = oneLine;
    }

    copyBtn.addEventListener('click', function () {
        outputArea.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Skopiowano!';
        setTimeout(() => (copyBtn.textContent = 'Kopiuj całość'), 1200);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const steve = document.getElementById("drifting-steve");

    let x = 50;
    let y = 50;
    let vx = 0.03;
    let vy = -0.02;

    function randomDirection() {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.02 + Math.random() * 0.03; 
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


