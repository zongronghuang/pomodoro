
let startBtn = document.getElementById("start");
let endBtn = document.getElementById("end");
let statsBtn = document.getElementById("stats");


//countdown

function countDown () {
    let minTimer = document.getElementById("min");
    let secTimer = document.getElementById("sec");
    let min = 1;

    for (sec = 59; sec <= 0; sec--) {    
        if (sec >= 10) {
            secTimer.innerHTML = sec;
        } else if (sec <= 9 && sec >= 1) {
            sec = "0" + sec;
            min = "0" + (min--);
            secTimer.innerHTML = sec;
            minTimer.innerHTML = min;
        } else if (sec === 0) {
            secTimer.innerHTML = "0" + sec;
            if (min > 1) {
                min--;
                minTimer.innerHTML = "0" + min;
            } else {
                min--;
                minTimer.innerHTML = "0" + min;
                break;
            }
                
        };
    }

    
}

setInterval(countDown, 1000);

