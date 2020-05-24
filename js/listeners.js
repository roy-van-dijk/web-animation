circleButton.addEventListener('click', () => onCircleButtonPressed());
triangleButton.addEventListener('click', () => onTriangleButtonPressed());
cubeButton.addEventListener('click', () => onCubeButtonPressed());

right.addEventListener('click', directionClicked);
left.addEventListener('click', directionClicked);
up.addEventListener('click', directionClicked);
down.addEventListener('click', directionClicked);

swipeContainer.addEventListener("touchstart", startTouch, false);
swipeContainer.addEventListener("touchmove", moveTouch, false);

document.onkeydown = (e) => pressedKeys[e.which] = true;
document.onkeyup = (e) => delete pressedKeys[e.which];

setInterval(onKeyPressed, 20);

pckry.getItemElements().forEach( function( itemElem ) {
    var draggie = new Draggabilly( itemElem );
    pckry.bindDraggabillyEvents( draggie );
});
