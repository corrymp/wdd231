import { ge, httpToHttps } from "./utils.js";

const root = ge('player');

(() => { // set player skin
    const selectedPlayer = JSON.parse(localStorage.getItem('selectedPlayer'));
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`.player-face { background-image:url(${(selectedPlayer) ? httpToHttps(selectedPlayer.skin_texture) : './images/base.png'}) }`);
    if (selectedPlayer) root.classList.toggle('slim', (JSON.parse(atob(selectedPlayer.properties[0].value)).textures.SKIN.metadata != null) ? true : false);
})();

(() => { // rotation controls

    const y = ge('y');
    const x = ge('x');
    const btnUp = ge('up');
    const btnDown = ge('down');
    const btnLeft = ge('left');
    const btnRight = ge('right');
    const btnRun = ge('run');
    const btnReset = ge('reset');
    const pose = ge('pose');
    const poseNone = ge('none');
    const poseNatural = ge('natural');
    const poseWalking = ge('walking');
    const poseSitting = ge('sitting');
    const poseJumping = ge('jumping');
    const layerToggle = ge('layer-toggle');

    const rotY = (a) => { yRot = (yRot % 360) + a; y.style.rotate = `y ${yRot}deg`; }
    const rotX = (a) => { xRot = (xRot % 360) + a; x.style.rotate = `x ${xRot}deg`; }
    const animate = () => btnRun.checked = (btnRun.checked ? false : true);
    const resetAnim = () => { btnRun.checked = false; root.style.animation = 'none'; root.offsetWidth; root.style.animation = null; }
    const clearAll = () => { clearInterval(goUp); clearInterval(goDown); clearInterval(goLeft); clearInterval(goRight); }

    const up = () => { goUp = setInterval(() => { rotX(1) }, 1); }
    const down = () => { goDown = setInterval(() => { rotX(-1) }, 1); }
    const left = () => { goLeft = setInterval(() => { rotY(-1) }, 1); }
    const right = () => { goRight = setInterval(() => { rotY(1) }, 1); }
    const startUp = () => { clearAll(); up(); }
    const startDown = () => { clearAll(); down(); }
    const startLeft = () => { clearAll(); left(); }
    const startRight = () => { clearAll(); right(); }
    const endUp = () => { clearInterval(goUp); }
    const endDown = () => { clearInterval(goDown); }
    const endLeft = () => { clearInterval(goLeft); }
    const endRight = () => { clearInterval(goRight); }

    const addEvents = (element, start, end) => {
        element.addEventListener('mousedown', start);
        element.addEventListener('touchstart', start);
        element.addEventListener('mouseup', end);
        element.addEventListener('touchend', end);
    };

    const updatePose = () => {
        root.classList.remove(currentPose);
        currentPose = (poseNatural.selected) ? 'natural' : (poseWalking.selected) ? 'walking' : (poseSitting.selected) ? 'sitting' : (poseJumping.selected) ? 'jumping' : 'none';
        root.classList.add(currentPose);
    }

    const reset = () => {
        yRot = 0;
        xRot = 0;
        layerToggle.checked = false;
        poseNone.selected = true;

        rotY(0);
        rotX(0);
        clearAll();
        resetAnim();
        updatePose();
    };

    let goUp;
    let goDown;
    let goLeft;
    let goRight;
    let xRot = 0;
    let yRot = 0;
    let currentPose = 'none';

    addEvents(btnUp, startUp, endUp);
    addEvents(btnDown, startDown, endDown);
    addEvents(btnLeft, startLeft, endLeft);
    addEvents(btnRight, startRight, endRight);
    btnReset.addEventListener('click', reset)
    pose.addEventListener('click', updatePose)

    addEventListener('keydown', (e) => {
        switch (e.code) {
            case ('ArrowUp'): endUp(); up(); break;
            case ('ArrowDown'): endDown(); down(); break;
            case ('ArrowLeft'): endLeft(); left(); break;
            case ('ArrowRight'): endRight(); right(); break;
            case ('Space'): (!e.repeat) ? animate() : 0; break;
            case ('Backspace'): (!e.repeat) ? reset() : 0; break;
        }
    })

    addEventListener('keyup', (e) => {
        switch (e.code) {
            case ('ArrowUp'): clearInterval(goUp); break;
            case ('ArrowDown'): clearInterval(goDown); break;
            case ('ArrowLeft'): clearInterval(goLeft); break;
            case ('ArrowRight'): clearInterval(goRight); break;
        }
    })


    updatePose()

})();

(() => { })();