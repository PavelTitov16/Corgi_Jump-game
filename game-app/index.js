const corgi = document.querySelector('.corgi');
const sheep = document.querySelector('.sheep');

document.addEventListener('keydown', function(event) {
    corgiJump();
});

const corgiJump = () => {
    if (corgi.classlist != 'jump') {
        corgi.classList.add('jump'); 
    }
    setTimeout(function() {
        corgi.classlist.remove('jump');
    }, 200);
}