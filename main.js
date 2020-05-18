let minuteDisplay = document.querySelector('#minuteDisplay')
let secondDisplay = document.querySelector('#secondDisplay')

console.log('aa', minuteDisplay)

const pomodoro = {
  status: 'on',
  minute: 10,
  second: 0,
  updateTime: function (minuteDisplay, secondDisplay) {
    console.log(this.second)
    console.log(this.minute)

    setInterval(() => {
      console.log('inside')
      if (this.second === 0) {
        secondDisplay.textContent = '0' + this.second
        this.second = 59
      } else if (this.second >= 1 && this.second <= 9) {
        secondDisplay.textContent = '0' + this.second
        this.second--
      } else {
        secondDisplay.textContent = this.second
        this.second--
      }

    }, 1000)
  }
}

pomodoro.updateTime(minuteDisplay, secondDisplay)

// let startBtn = document.getElementById("start");
// let endBtn = document.getElementById("end");
// let statsBtn = document.getElementById("stats");
// const minTimer = document.getElementById("min");
// const secTimer = document.getElementById("sec");
// let total = document.getElementById("total");
// let min = 0;
// let sec = 12;
// let intervalID;
// let today = "tomato_"+ new Date().toDateString();
// let tomatoCount = 0;


// //remember tomato number in session storage
// sessionStorage.setItem(today, tomatoCount);

// function updateCount() {
//     tomatoCount++;
//     total.innerHTML = tomatoCount;
//     sessionStorage[today] = tomatoCount;
// };


// //countdown
// function updateTime() {   

//     //display sec (> 9) or when sec goes down from 59
//     if (sec > 9) {
//         if (sec === 59){
//             sec--;
//             };
//         secTimer.innerHTML = sec;
//         sec--;
//         if(min >= 10) {
//             minTimer.innerHTML = min;
//         } else {
//             minTimer.innerHTML = "0" + min;
//         };

//     //display sec (between 0 and 9)
//     } else if (sec <= 9 && sec >= 0) {
//         secTimer.innerHTML = "0" + sec;
//         sec--;
//         if(min >= 10) {
//             minTimer.innerHTML = min;
//         } else {
//             minTimer.innerHTML = "0" + min;
//         };


//     //end the interval when both min and sec are 0
//     } else if(minTimer.textContent == "00" && secTimer.innerHTML == "00"){
//         clearInterval(intervalID);
//         updateCount();
//         startBtn.innerHTML = "START";

//     //display sec when transitioning from 0 to 59
//     } else if (sec === -1) {  
//         sec = 59;
//         secTimer.innerHTML = sec;
//         min--;
//         if(min >= 10) {
//             minTimer.innerHTML = min;
//         } else {
//             minTimer.innerHTML = "0" + min;
//         };
//     };
// };



// //start, pause, resume the countdown
// function startPauseResumeCountDown() {

//     switch(startBtn.innerHTML) {
//         case "START":
//             min = 0;
//             sec = 12;
//             intervalID = setInterval(updateTime, 700);
//             startBtn.innerHTML = "PAUSE";
//             break;
//         case "PAUSE":
//             clearInterval(intervalID);
//             startBtn.innerHTML = "RESUME";
//             showFlash();
//             break;
//         default:
//             intervalID = setInterval(updateTime, 700);
//             startBtn.innerHTML = "PAUSE";
//             cancelFlash();
//             break;
//     };

// };


// //flashy text for pause
// function showFlash() {
//     document.getElementById("time").classList.add("flashy");
// };

// function cancelFlash(){
//     document.getElementById("time").classList.remove("flashy");
// };

// //show completion canvas


// //end the countdown interval
// //change the button & time to the initial state
// function endCountDown(){
//     clearInterval(intervalID);
//     minTimer.innerHTML = "00";
//     secTimer.innerHTML = "12";
//     min = 0;
//     sec = 12;
//     startBtn.innerHTML = "START";
//     cancelFlash();
// };

// startBtn.addEventListener("click", startPauseResumeCountDown);
// endBtn.addEventListener("click", endCountDown);


