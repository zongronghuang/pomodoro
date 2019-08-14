
let startBtn = document.getElementById("start");
let endBtn = document.getElementById("end");
let statsBtn = document.getElementById("stats");
const minTimer = document.getElementById("min");
const secTimer = document.getElementById("sec");
let min = 1;
let sec = 12;
let intervalID;
let timeoutID;


//countdown
function updateTime() {   

    //display sec (> 9) or when sec goes down from 59
    if (sec > 9) {
        if (sec === 59){
            sec--;
            };
        secTimer.innerHTML = sec;
        sec--;
        if(min >= 10) {
            minTimer.innerHTML = min;
        } else {
            minTimer.innerHTML = "0" + min;
        };

    //display sec (between 0 and 9)
    } else if (sec <= 9 && sec >= 0) {
        secTimer.innerHTML = "0" + sec;
        sec--;
        if(min >= 10) {
            minTimer.innerHTML = min;
        } else {
            minTimer.innerHTML = "0" + min;
        };


    //end the interval when both min and sec are 0
    } else if(minTimer.innerHTML == "00" && secTimer.innerHTML == "00"){
        clearInterval(intervalID);


    //display sec when transitioning from 0 to 59
    } else if (sec === -1) {  
        sec = 59;
        secTimer.innerHTML = sec;
        min--;
        if(min >= 10) {
            minTimer.innerHTML = min;
        } else {
            minTimer.innerHTML = "0" + min;
        };
    };
};


//start, pause, resume the countdown
function startPauseResumeCountDown() {
    
    switch(startBtn.innerHTML) {
        case "START":
            min = 1;
            sec = 12;
            intervalID = setInterval(updateTime, 700);
            startBtn.innerHTML = "PAUSE";
            break;
        case "PAUSE":
            clearInterval(intervalID);
            startBtn.innerHTML = "RESUME";
            showFlash();
            break;
        default:
            intervalID = setInterval(updateTime, 700);
            startBtn.innerHTML = "PAUSE";
            cancelFlash();
            break;
    };

};


//flashy text for pause
function showFlash() {
    minTimer.classList.add("flashy");
    secTimer.classList.add("flashy");
};

function cancelFlash(){
    minTimer.classList.remove("flashy");
    secTimer.classList.remove("flashy");
};

//show completion canvas


//end the countdown interval
//change the button & time to the initial state
function endCountDown(){
    clearInterval(intervalID);
    minTimer.innerHTML = "01";
    secTimer.innerHTML = "12";
    min = 1;
    sec = 12;
    startBtn.innerHTML = "START";
};

startBtn.addEventListener("click", startPauseResumeCountDown);
endBtn.addEventListener("click", endCountDown);


