const dinosaur = document.getElementById('dinosaur');
const cactus = document.getElementById('cactus');

let isJumping = false;
let gravity = 0.9;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let position = 0;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                position *= gravity;
                dinosaur.style.bottom = position + 'px';
            }, 20);
        }
        position += 20;
        dinosaur.style.bottom = position + 'px';
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

function moveCactus() {
    let cactusPosition = 1000;
    let timer = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -50) {
            cactusPosition = 1000;
        }

        const dinoRect = dinosaur.getBoundingClientRect();
        const cactusRect = cactus.getBoundingClientRect();

        if (
            dinoRect.right > cactusRect.left &&
            dinoRect.left < cactusRect.right &&
            dinoRect.bottom > cactusRect.top
        ) {
            clearInterval(timer);
            alert('Game Over!');
            document.location.reload();
        }
    }, 20);
}

moveCactus();
