## Assignment
Recreate a piece of artwork with HTML & CSS and give your own spin on it with animations. 

## Artwork
For my assignment I chose the work of Piet Mondriaan, who was a famous Dutch painter known for his iconic use of squares and colors. 

This is what a classic Mondriaan looks like:
![Mondriaan](https://upload.wikimedia.org/wikipedia/commons/7/76/Piet_Mondriaan%2C_1921_-_Composition_en_rouge%2C_jaune%2C_bleu_et_noir.jpg)

## Motivation
The reason I chose Mondriaan is because I became very familiar with his work after my school (University of Applied Sciences Leiden) moved into a building inspired by his art. I also feel like most Mondriaan paintings look rather similar and I was curious as to what would happen if the shapes were to change.

The building the school moved into is called Le Carrefour and is located in Leiden:
![Le Carrefour](https://senl.nl/wp-content/uploads/2017/05/achmea-2.jpeg)

## Base artwork
For the base artwork I began looking on the internet work ways to create a Mondriaan in CSS. I found a very good [video](https://www.youtube.com/watch?v=qNtJ5p3h2A4) by the YouTube channel Layout Land about this. In the video a responsive Mondriaan is created using CSS grid with very little CSS. It doesn't even use media queries!

## 4 functions
### Dragging
The first function I wanted to add to the artwork was that of making each square of the Mondriaan draggable, the other squares would then move out of the way and you could place the square back into the grid.

To achieve this I used the [Packery](https://packery.metafizzy.co/) library with the [Draggable](https://packery.metafizzy.co/draggable.html) extension.

Problems soon arose when I found out that Packery uses absolute positioning on its elements which made the earlier CSS grid solution impractical. Luckily Packery includes its own way of creating grids. Responsiveness can be done at a later time.

### Circles
Not the most impressive function of the artwork from a technical standpoint, but this function essentially adds a `border-radius` to all Mondriaan squares, creating Mondriaan circles which look interesting, especially when combined with the fourth function.

![Mondriaan Circles](https://github.com/roy-van-dijk/web-animation/blob/master/assets/fullartcircle.png)

### Triangles
Clip-path is a CSS property I havent really touched before. To challenge myself I wanted to include clip-path in this assignment somehow. I've decided to do that by making the Mondriaan squares into triangles. This required more brainpower than I expected, as a triangle path has three points and as such can never become a square again. It is also not possible to animate a 4-point polygon into a 3-point polygon, which makes sense.

Eventually I solved it by using a 4-point polygon with an overlappping point for the triangle.

Square:
```css
clip-path: polygon(
    0% 0%,     /* top left */
    100% 0%,   /* top right */
    100% 100%, /* bottom right */
    0% 100%    /* bottom left */
);
``` 

Triangle:
```css
clip-path: polygon(
    50% 0%,    /* top left */
    0% 100%,   /* top right */
    100% 100%, /* bottom right */
    100% 100%  /* bottom left */
);
```

Using `transition: clip-path 1s`, this clip-path animates beautifully.

![Mondriaan Triangles](https://github.com/roy-van-dijk/web-animation/blob/master/assets/fullarttriangle.png)

### 3D Cube
Now for the main event, the creation of a 3D Mondriaan cube.

By following [this guide](https://3dtransforms.desandro.com/cube) I was able to set up a 3D cube which housed my Mondriaan. Unfortunately my Mondriaan is using the full viewport width (`100vw`) which makes the cube essentially invisible because it is too large.

Luckily I have been using CSS variable for my Mondriaan sizing like so:
```css
:root {
    --column: 10vw;
    --row: 10vw;
    --scene-size: 100vw;
}
```

These can be easily changed in JavaScript whenever the user switches to the 3D view:
```javascript
let rootStyle = document.documentElement.style;
rootStyle.setProperty('--column', '10vw');
rootStyle.setProperty('--row', '10vw');
rootStyle.setProperty('--scene-size', '100vw');
```

However, this messes up the Packery dragging library which is using absolute positioning. By running `Packery.layout()`, Packery will recalculate all the positions to re-initialize the dragging function.

For rotation the 3D cube guide was not helpful. The way they do it is to have 6 buttons, each corresponding to a side of the cube (front, back, top, etc.). This is a very simple solution but not fun and it doesn't take advantage of touch screens. 

I decided to implement my own rotation functions. The cube can be rotated on 3 axis using CSS transforms:
```css
transform: rotateX();
transform: rotateY();
transform: rotateZ();
```
For clarity I decided not to use the shorter `transform: rotate3d()` property, as 3d transformations can become quite complex.

This JavaScript function rotates the cube on all axis:
```javascript
function transformCube(direction) {
    incrementTransform(direction);
    cube.style.transform = 'translateZ(-250px) rotateX(' + currentX + 'deg) rotateY(' + currentY + 'deg) rotateZ(' + currentZ + 'deg)';
}
```

The current X, Y and Z values are stored in the JavaScript `currentX`, `currentY` and `currentZ` variables respectively. The value of these variables is set in the `incrementTransform` function, which takes a parameter stating the direction the cube should rotate in (Z-rotation left out for clarity):

```javascript
function incrementTransform(direction) {
    switch(direction) {
        case 'up':
            currentX -= 90;
            break;
        case 'right':
            currentY += 90;
            break;
        case 'left':
            currentY -= 90;
            break;
        case 'down':
            currentX -= 90;
            break;
    }
}
```

The rotation function can also be easily called upon by event listeners, such as this one for the 'down' arrow present on the page:

```javascript
down.addEventListener('click', () => transformCube(this.dataset.direction));
```

The down arrow has a `data` attribute in the HTML which is where it gets the direction from:
```html
<div class="move-down" data-direction="down"></div>
```

The rotation can also be bound to the keyboard and swipe actions on mobile using the same method.

## Result
Fullscreen Mondriaan:
![Mondriaan](https://github.com/roy-van-dijk/web-animation/blob/master/assets/fullart.png)

3D Mondriaan:
![Mondriaan](https://github.com/roy-van-dijk/web-animation/blob/master/assets/3dcube.png)

Multiple functions combined:
![Mondriaan](https://github.com/roy-van-dijk/web-animation/blob/master/assets/3dcubecircles.png)

<h1 align="center"><a href="https://roy-van-dijk.github.io/web-animation/">Check it out for yourself!</a></h1>
