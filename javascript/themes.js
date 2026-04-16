let button = document.getElementById('change-mode');
let circle = document.getElementById('circle');

let index1 = document.getElementById('one');
let index2 = document.getElementById('two');
let index3 = document.getElementById('three');

const themes = ['theme1', 'theme2', 'theme3'];
let index = 0;

function changeMode() {
    index = (index + 1) % themes.length;

    document.body.setAttribute('data-theme', themes[index]);

    //move circle
    if (index === 0) {
        circle.style.left = '0px';
    } else if (index === 1) {
        circle.style.left = '30px';
    } else {
        circle.style.left = '60px'
    }
}

button.addEventListener('click', () => {
    changeMode();
})

index1.addEventListener('click', () => {
    index = -1;
    changeMode();
})

index2.addEventListener('click', () => {
    index = 0;
    changeMode();
})

index3.addEventListener('click', () => {
    index = 1;
    changeMode();
})