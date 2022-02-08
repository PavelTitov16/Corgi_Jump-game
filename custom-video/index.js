const player = document.querySelector('.player');
const video = player.querySelector('.video');
const button = document.querySelector('.button_3');
const screenSaver = player.querySelector('.poster');
const btnPlay = player.querySelector('.play_button');
const muteBtn = player.querySelector('.volume_button');
const volume = document.querySelector('.volume');
const progress = document.querySelector('.progress');
const fullScreenBtn = document.querySelector('.fullscreen');
let lastVideoVolume = volume.value;
let progressId = null;
let wasPlaying = false;

window.addEventListener('load', function () {
    progress.max = video.duration;
})

/* Play - Pause */
function togglePlay() {
    if (video.paused) {
        progress.max = video.duration;
        video.play();
        progressId = setInterval(changeProgress, 100);
        screenSaver.classList.add('active');
        button.classList.toggle('active');
        btnPlay.classList.remove('play');
        btnPlay.classList.add('pause');
    } else {
        video.pause();
        clearInterval(progressId);
        button.classList.remove('active');
        btnPlay.classList.remove('pause');
        btnPlay.classList.add('play');
    }
}

button.addEventListener('click', togglePlay);
btnPlay.addEventListener('click', togglePlay);

video.addEventListener('ended', () => {
    button.classList.toggle('active');
    btnPlay.classList.remove('pause');
    btnPlay.classList.add('play');
    clearInterval(progressId);
});
/* Play - Pause */

/* Volume - Mute */
function changeVolume() {
    volume.value = video.volume;
    lastVideoVolume = volume.value;
    changeVolumeColor();
}

volume.addEventListener('change', function () {
    video.volume = volume.value;
    if (volume.value != 0){
        lastVideoVolume = volume.value;
      }
    if (video.volume == 0) {
        onVideoMute();
    } else {
        onVideoVolume();
    }
})

function changeVolumeColor() {
    const max = volume.max;
    const value = (volume.value / max) * 100;
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #fff ${value}%, #fff 100%)`;
}

volume.addEventListener('input', changeVolumeColor);

function onVideoMute() {
    muteBtn.classList.remove('volume_on');
    muteBtn.classList.add('mute');
}
function onVideoVolume() {
    muteBtn.classList.remove('mute');
    muteBtn.classList.add('volume_on');
}
function videoMute() {
    if (video.volume == 0) {
        video.volume = lastVideoVolume;
        volume.value = video.volume;
        onVideoVolume();
        changeVolumeColor()
    } else {
        onVideoMute();
        video.volume = 0;
        volume.value = 0;
        changeVolumeColor()
    }
}

muteBtn.addEventListener('click', videoMute);
/* Volume - Mute */

/* Progress */
function changeProgress() {
    progress.value = video.currentTime;
    changeProgressColor();
}

function changeProgressColor() {
    const max = progress.max;
    const value = (progress.value / max) * 100;
    progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #fff ${value}%, #fff 100%)`;
}

progress.addEventListener('input', changeProgressColor);

progress.addEventListener('mousedown', function () {
    wasPlaying = !video.paused;
    if (wasPlaying) {
        video.pause();
        clearInterval(progressId);
    }
});

progress.addEventListener('change', function () {
    video.currentTime = progress.value;
    if (wasPlaying) {
        video.play();
        progressId = setInterval(changeProgress, 100);
    } else {
        changeProgress();
    }
});
/* Progress */

/* Fullscreen */
const openFullscreen = () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
};
fullScreenBtn.addEventListener('click', () => {
    openFullscreen();
});
/* Fullscreen */



