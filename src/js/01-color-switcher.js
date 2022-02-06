const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body')

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
timerID = setInterval(() => {
    bodyRef.style.background = getRandomHexColor();
    
}, 1000)
})

stoptBtn.addEventListener('click', () => {
    clearInterval(timerID),
        startBtn.disabled = false
})




function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}