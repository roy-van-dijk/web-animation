let pitch = 0; yaw = 0; roll = 0;

function onKeyPressed() {
    for(let key in pressedKeys) {
        transformCube(keys[key]);
        delete pressedKeys[key];
    }
}

function onCircleButtonPressed() {
    circleButton.classList.toggle('active');
    mondriaans.forEach(mondriaan => mondriaan.classList.toggle('rounded'));
}

function onTriangleButtonPressed() {
    triangleButton.classList.toggle('active');
    mondriaans.forEach(mondriaan => mondriaan.classList.toggle('triangle'));
}

function onCubeButtonPressed() {
    let rootStyle = document.documentElement.style;

    if(cubeButton.classList.contains('active')) {
        rootStyle.setProperty('--scene-size', '100vw');
        rootStyle.setProperty('--column', '10vw');
        rootStyle.setProperty('--row', '10vw');
        container.classList.add('fullscreen');
        cube.removeAttribute('style');
        currentX = 0;
        currentY = 0;
        currentZ = 0;
        cubeButton.classList.remove('active');
    } else {
        rootStyle.setProperty('--scene-size', '512px');
        rootStyle.setProperty('--column', '64px');
        rootStyle.setProperty('--row', '64px');
        container.classList.remove('fullscreen');
        cubeButton.classList.add('active');
    }

    pckry.layout();
}

function directionClicked() {
    transformCube(this.dataset.direction);
}

function incrementTransform(direction) {
    switch (direction) {
        case 'up':
            if (yaw % 180 === 0) {
                pitch += 90;
            } else {
                roll += 90;
            }
            break;

        case 'right':
            if (pitch % 180 === 0) {
                yaw += 90;
            } else {
                roll -= 90;
            }
            break;

        case 'left':
            if (pitch % 180 === 0) {
                yaw -= 90;
            } else {
                roll += 90;
            }
            break;

        case 'down':
            if (yaw % 180 === 0) {
                pitch -= 90;
            } else {
                roll -= 90;
            }
            break;
    }
}

function transformCube(direction) {
    if(!container.classList.contains('fullscreen')) {
        incrementTransform(direction);

        let x = pitch;
        let y = yaw;
        let z = roll;

        cube.style.transform = 'translateZ(-250px) rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
    }
}

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
}

// Swipe gesture detection from Stack Overflow:
// https://stackoverflow.com/questions/53192433/how-to-detect-swipe-in-javascript
function moveTouch(e) {
    if (initialX === null || initialY === null) {
        return;
    }

    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;

    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            transformCube('left');
        } else {
            transformCube('right');
        }  
    } else {
        if (diffY > 0) {
            transformCube('up');
        } else {
            transformCube('down');
        }  
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
}

function recolorSquare() {
    this.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}