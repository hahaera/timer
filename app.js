const time = document.querySelector('.time');
const currentTitle = document.querySelector('.current-title');
const timer = document.querySelector('.timer');
const setting = document.querySelector('.setting');

const start = document.querySelector('.start-btn');
const stop = document.querySelector('.stop-btn');
const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');
const settingBtn = document.querySelector('.setting-btn');

let index = 0;
let currentTime = 0;
let count;
let timers = document.querySelectorAll('.timer');

let hour;
let min;
let sec;
let partRepeat;
let totalRepeat;
let state;

let audio = new Audio('./assets/audio/count.mp3');

settingBtn.addEventListener('click', function(){
    setting.classList.add('active');
})

closeBtn.addEventListener('click', function(){
    setting.classList.remove('active');
})

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
    if(state == 0){
        stopCount();
    }
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

function stopCount(){
    state = 0;
    clearInterval(count);
}

stop.addEventListener('click', function(){
    if(state == 1){
        state = 0;
        stopCount();
        stop.innerHTML = `이어하기`;
    } else{
        stop.innerHTML = `정지`;
        state = 1;
        count = setInterval(Setcount, 1000);
    }
    
})


start.addEventListener('click', function(){
    state = 1;
    clearInterval(count);
    index = 0;
    totalRepeat = document.querySelector('.total-repeat').value;
    setTimer(index);
    count = setInterval(Setcount, 1000);
})