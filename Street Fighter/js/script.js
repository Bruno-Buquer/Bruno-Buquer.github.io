const ryu = document.getElementById('ryu');
const raduqui = document.getElementById('raduqui');
const hadoukenSound = document.getElementById('hadouken-sound');

let ryuPosition = { left: 50, bottom: 50 };
let isJumping = false;

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
        case 'D':
            ryuPosition.left += 10;
            break;
        case 'a':
        case 'A':
            ryuPosition.left -= 10;
            break;
        case 'w':
        case 'W':
            if (!isJumping) jump();
            break;
        case ' ':
            throwraduqui();
            break;
    }
    updateRyuPosition();
});

function updateRyuPosition() {
    ryu.style.left = `${ryuPosition.left}px`;
}

function jump() {
    isJumping = true;
    let jumpHeight = 100;
    let jumpUp = setInterval(() => {
        if (jumpHeight <= 0) {
            clearInterval(jumpUp);
            let jumpDown = setInterval(() => {
                jumpHeight += 5;
                ryuPosition.bottom -= 5;
                updateRyuPosition();
                if (jumpHeight >= 100) {
                    clearInterval(jumpDown);
                    isJumping = false;
                }
            }, 20);
        } else {
            jumpHeight -= 5;
            ryuPosition.bottom += 5;
            updateRyuPosition();
        }
    }, 20);
}

function throwraduqui() {
    raduqui.style.display = 'block';
    raduqui.style.left = `${ryuPosition.left + 50}px`;
    hadoukenSound.play();

    let raduquiMove = setInterval(() => {
        raduqui.style.left = `${parseInt(raduqui.style.left) + 10}px`;
        if (parseInt(raduqui.style.left) > window.innerWidth) {
            clearInterval(raduquiMove);
            raduqui.style.display = 'none';
        }
    }, 20);
}
