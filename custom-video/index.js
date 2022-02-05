const player = document.querySelector('.player');
const video = player.querySelector('.video');
const button = document.querySelector('.button_3');
const screenSaver = player.querySelector('.poster');
const btnPlay = player.querySelector('.play_button');
const muteBtn = player.querySelector('.volume-button');
const volumeScale = document.getElementById('.video-hud__volume');

function togglePlay () {
    if (video.paused) {
        video.play();
        screenSaver.classList.add('active');
        button.classList.toggle('active');
        btnPlay.classList.remove('play');
        btnPlay.classList.add('pause');
    } else {
        video.pause();
        button.classList.remove('active');
        btnPlay.classList.remove('pause');
        btnPlay.classList.add('play');
    }
}

function videoMute() { 
    if(player.volume == 0) {
    player.volume = volumeScale.value / 100;
    muteButton.classList.remove('mute');
    muteButton.classList.add('volume_on');
    } else {
    player.volume = 0;
    muteButton.classList.remove('volume_on');
    muteButton.classList.add('mute');
    }
}

button.addEventListener('click', togglePlay);
btnPlay.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', videoMute);

