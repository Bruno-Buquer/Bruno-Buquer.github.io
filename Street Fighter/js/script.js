const ryu = document.getElementById('ryu');
const raduqui = document.getElementById('raduqui');
const hadoukenSound = document.getElementById('hadouken-sound');

let ryuPosition = { left: 50, bottom: 50 };
let isJumping = false;

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
        case 'D':
            if(ryuPosition.left < 1720) {
                ryuPosition.left += 10;
            }
            break;
        case 'a':
        case 'A':
            if(ryuPosition.left > 0) {
                ryuPosition.left -= 10;
            }
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

// function jump() {
//     console.log("ewid")
//     isJumping = true;
//     let jumpHeight = 100;
//     let jumpUp = setInterval(() => {
//         if (jumpHeight <= 0) {
//             clearInterval(jumpUp);
//             let jumpDown = setInterval(() => {
//                 jumpHeight += 5;
//                 ryuPosition.bottom -= 5;
//                 updateRyuPosition();
//                 if (jumpHeight >= 100) {
//                     clearInterval(jumpDown);
//                     isJumping = false;
//                 }
//             }, 20);
//         } else {
//             jumpHeight -= 5;
//             ryuPosition.bottom += 5;
//             updateRyuPosition();
//         }
//     }, 20);
// }

function throwraduqui() {
    raduqui.style.display = 'block';
    ryu.src="./img/ryu-magia.png";
    raduqui.style.left = `${ryuPosition.left + 50}px`;
    hadoukenSound.play();

    let raduquiMove = setInterval(() => {
        raduqui.style.left = `${parseInt(raduqui.style.left) + 50}px`;
        if (parseInt(raduqui.style.left) > window.innerWidth) {
            clearInterval(raduquiMove);
            raduqui.style.display = 'none';
            ryu.src="./img/ryu-ginga.gif";
        }
    }, 20);
}
