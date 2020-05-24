
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
    switch(direction) {
        case 'up':
            if(currentY % 180 === 0 || currentX % 180 !== 0) {
                currentX += 90;
            } 
            else if (currentY % 180 !== 0 && currentX % 180 === 0) {
                currentZ += 90;
            }
            else {
                currentZ -= 90;
            }
            break;
        case 'right':
            if(currentX % 180 !== 0) {
                currentZ += 90;
            } 
            else {
                currentY += 90;
            }
            break;
        case 'left':
            currentY -= 90;
            break;
        case 'down':
            currentX -= 90;
            break;
    }
}

function transformCube(direction) {
    if(!container.classList.contains('fullscreen')) {
        incrementTransform(direction);
        cube.style.transform = 'translateZ(-250px) rotateX(' + currentX + 'deg) rotateY(' + currentY + 'deg) rotateZ(' + currentZ + 'deg)';
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