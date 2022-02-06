const player = document.querySelector('.player');
const video = player.querySelector('.video');
const button = document.querySelector('.button_3');
const screenSaver = player.querySelector('.poster');
const btnPlay = player.querySelector('.play_button');
const muteBtn = player.querySelector('.volume_button');
const volume = document.querySelector('.volume');
const progress = document.querySelector('.progress');
let lastVideoVolume = volume.value;
let currentTime = video.duration;

function togglePlay() {
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

volume.addEventListener('input', function () {
    const value = this.value;
    video.volume = value;
    lastVideoVolume = value;
    if (value == 0) {
        onVideoMute();
    } else {
        onVideoVolume();
    }
    this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100%)`;
})

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
        volume.value = lastVideoVolume;
        muteBtn.classList.remove('mute');
        muteBtn.classList.add('volume_on');
    } else {
        video.volume = 0;
        muteBtn.classList.remove('volume_on');
        muteBtn.classList.add('mute');
        volume.value = 0;
    }
}

progress.addEventListener('input', function () {
    const value = this.value;
    video.currentTime = value * video.duration;
    console.log(video.currentTime);
    this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100%)`;
})

button.addEventListener('click', togglePlay);
btnPlay.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', videoMute);

video.addEventListener('ended', () => { 
    button.classList.toggle('active');
    btnPlay.classList.remove('pause');
    btnPlay.classList.add('play');
});
/*function progressUpd {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexbasis = `${percent}%`; */
/*onst progressTimeLine = (e) => {
    const newTime = e.offsetX / progressWrapper.offsetWidth
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
  }

  progressWrapper.addEventListener('click', progressTimeLine)*/
/*
range.addEventListener('change', rangeUpdate);
range.addEventListener('mousemove', rangeUpdate);
video.addEventListener('timeUpdate', rangeUpdate);
 */