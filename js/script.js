let mondriaan = document.querySelector('.mondriaan');
let settings = {
    itemSelector: '.item',
    percentPosition: true
};
let pckry = new Packery( '.mondriaan', settings);

pckry.getItemElements().forEach( function( itemElem ) {
    var draggie = new Draggabilly( itemElem );
    pckry.bindDraggabillyEvents( draggie );
});
  

document.getElementById('thing1').addEventListener('click', function() {
    mondriaan.classList.toggle('rounded');
});

document.getElementById('thing2').addEventListener('click', function() {
    mondriaan.classList.toggle('triangle');
});