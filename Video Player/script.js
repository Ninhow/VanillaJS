const video = document.getElementById('video');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');



function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}


function updatePlayIcon(){
    if(video.paused){
        playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }else {
        playButton.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

function updateProgress(){
    progressBar.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }
    
    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10){
        seconds = '0' + String(seconds);
    }

    timestamp.innerHTML = `${mins}:${seconds}`;

}

function setVideoProgress() {
    video.currentTime = (+progressBar.value * video.duration ) / 100;
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}





//Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playButton.addEventListener('click', toggleVideoStatus);

stopButton.addEventListener('click', stopVideo);

progressBar.addEventListener('change', setVideoProgress);