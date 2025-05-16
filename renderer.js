let timer;
let minutes = 15;
let seconds = 0;
let isPaused = false;
let enteredTime = null;

const timerElement = document.getElementById('timer');
const pauseResumeButton = document.getElementById('pause-resume-btn');
const restartButton = document.getElementById('restart-btn');
const setTimeButton = document.getElementById('set-time-btn');
const timeInput = document.getElementById('time-input');

function formatTime(min, sec) {
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function updateTimer() {
    timerElement.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
}

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}


function togglePauseResume() {
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'Resume';
    } else {
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}

function restartTimer() {
    clearInterval(timer);
    minutes = enteredTime || 15;
    seconds = 0;
    isPaused = false;
    timerElement.textContent = formatTime(minutes, seconds);
    pauseResumeButton.textContent = 'Pause';
    startTimer();
}

function setTime() {
    const newTime = timeInput.value;
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = false;
        timerElement.textContent = formatTime(minutes, seconds);
        clearInterval(timer);
        pauseResumeButton.textContent = 'Pause';
        startTimer();
    } else {
        alert('Invalid input. Please enter a valid number greater than 0.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    pauseResumeButton.addEventListener('click', togglePauseResume);
    restartButton.addEventListener('click', restartTimer);
    setTimeButton.addEventListener('click', setTime);
})

startTimer();