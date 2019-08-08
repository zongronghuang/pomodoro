
let startBtn = document.getElementById("start");
let endBtn = document.getElementById("end");
let statsBtn = document.getElementById("stats");
const minTimer = document.getElementById("min");
const secTimer = document.getElementById("sec");
let min = 0;
let sec = 5;
let intervalID;


//countdown
function updateTime() {   
        if (sec > 9) {
            minTimer.innerHTML = "0" + min;
            if (sec === 59){
                sec--;
            };
            secTimer.innerHTML = sec;
            sec--;
        } else if (sec <= 9 && sec >= 0) {
            secTimer.innerHTML = "0" + sec;
            minTimer.innerHTML = "0" + min;
            sec--;
        } else {
            sec = 59;
            secTimer.innerHTML = sec;
            min--;
            minTimer.innerHTML = "0" + min;
        };
        
};


function startCountDown() {
    intervalID = setInterval(updateTime, 700);
};

function pauseCountDown(){

};

function endCountDown(){
    clearInterval(intervalID);
    minTimer.innerHTML = "00";
    secTimer.innerHTML = "00";
    min = 0;
    sec = 5;
};

startBtn.addEventListener("click", startCountDown);
endBtn.addEventListener("click", endCountDown);


