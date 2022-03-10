const time = document.querySelector('.time');
const currentTitle = document.querySelector('.current-title');
const timer = document.querySelector('.timer');

const start = document.querySelector('.start-btn');
const addBtn = document.querySelector('.add-btn');

let index = 0;
let currentTime = 0;
let count;
let timers = document.querySelectorAll('.timer');

let hour;
let min;
let sec;
let partRepeat;
let totalRepeat;

let audio = new Audio('./assets/audio/count.mp3');

addBtn.addEventListener('click', function(){
    let clone = timer.cloneNode(true);
    timer.after(clone);
    timers = document.querySelectorAll('.timer');
});

function setTimer(index){
    repeatTimer(index);
    partRepeat = Number(timers[index].querySelector('.part-repeat').value);
}
function repeatTimer(index){
    currentTitle.innerHTML = timers[index].querySelector('.title').value;
    if(currentTitle.textContent == ''){
       currentTitle.innerHTML = `타이머${index+1}` ;
    } else{
        currentTitle.innerHTML = timers[index].querySelector('.title').value;
    }
    hour = Number(timers[index].querySelector('.hour').value);
    min = Number(timers[index].querySelector('.min').value);
    sec = Number(timers[index].querySelector('.sec').value);
    
    currentTime = (hour * 3600) + (min * 60) + (sec);
    time.innerHTML = `${hour < 10 ? '0'+hour : hour}:${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`;
    // time.innerHTML = `${hour}:${min}:${sec}`;
}

function Setcount(){
    if(currentTime > 0){
        currentTime -= 1;
        if(currentTime == 3){
            audio.play();
        }
        hour = currentTime >= 3600 ? Math.floor(currentTime / 3600) : 0;
        min = currentTime >= 60 ? Math.floor((currentTime - (hour * 3600)) / 60) : 0;
        sec = Math.floor(Math.floor((currentTime - (hour * 3600)) % 60));
        time.innerHTML = `${hour < 10 ? '0'+hour : hour}:${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`;
        // time.innerHTML = `${hour}:${min}:${sec}`;
    } else {
        if(partRepeat > 1){
            partRepeat -=1;
            repeatTimer(index);
        }else{
            if(index < timers.length - 1){
                index += 1;
                setTimer(index);
            } else if(totalRepeat > 1){
                totalRepeat -= 1;
                index = 0;
                setTimer(index);
            }
        }
    }
    
}



start.addEventListener('click', function(){
    clearInterval(count);
    index = 0;
    totalRepeat = document.querySelector('.total-repeat').value;
    setTimer(index);
    count = setInterval(Setcount, 1000);
})