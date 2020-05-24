const keys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

const colors = [
    '#0f2a77',
    '#e51837',
    '#fdeb24',
    '#12060f',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5',
    '#f5f5f5'
];

let pressedKeys = {};

let mondriaans = document.querySelectorAll('.mondriaan');
let mondriaanSquares = document.querySelectorAll('.mondriaan .item');

let up = document.querySelector('.move-up');
let down = document.querySelector('.move-down');
let left = document.querySelector('.move-left');
let right = document.querySelector('.move-right');

let currentX = 0;
let currentY = 0;
let currentZ = 0;

var initialX = null;
var initialY = null;

let cube = document.querySelector('.cube');
let container = document.querySelector('.container');

let circleButton = document.getElementById('do-circle');
let triangleButton = document.getElementById('do-triangle');
let cubeButton = document.getElementById('do-cube');

let swipeContainer = document.querySelector('body');

//Packery plugin for draggable elements applied to the mondriaan
//https://packery.metafizzy.co/
let pckry = new Packery( '.mondriaan', {
    itemSelector: '.item',
    percentPosition: true
});
