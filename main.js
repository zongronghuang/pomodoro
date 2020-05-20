const minuteDisplay = document.querySelector('#minuteDisplay')
const secondDisplay = document.querySelector('#secondDisplay')
const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')
const stopBtn = document.querySelector('#stop')
const breakBtn = document.querySelector('#break')

const pomodoro = {
  status: 'READY',
  tomatoes: 0,
  maxSeconds: 10,
  remainingSeconds: 10,
  intervalID: null,
  checkEndState: function () {
    if (this.remainingSeconds < 0) {
      clearInterval(this.intervalID)
      this.status = 'READY'
      this.intervalID = null
      this.remainingSeconds = this.maxSeconds

      playBtn.removeAttribute('hidden')
      pauseBtn.setAttribute('hidden', '')
      stopBtn.setAttribute('hidden', '')
    }
  },
  updateTime: function () {
    this.intervalID = setInterval(() => {
      const minutes = Math.floor(this.remainingSeconds / 60)
      const seconds = this.remainingSeconds % 60

      minuteDisplay.textContent = (minutes < 10) ? ('0' + minutes) : minutes
      secondDisplay.textContent = (seconds < 10) ? ('0' + seconds) : seconds
      this.remainingSeconds--

      this.checkEndState()
    }, 1000)
  },
  runApp: function () {
    // Ready 狀態
    pauseBtn.setAttribute('hidden', '')
    stopBtn.setAttribute('hidden', '')

    // 按下 play 按鍵
    playBtn.addEventListener('click', () => {
      this.status = 'RUNNING'
      playBtn.setAttribute('hidden', '')
      pauseBtn.removeAttribute('hidden')
      stopBtn.removeAttribute('hidden')

      this.updateTime()
    })

    // 按下 pause 按鍵
    pauseBtn.addEventListener('click', () => {
      this.status = 'PAUSED'
      playBtn.removeAttribute('hidden')
      pauseBtn.setAttribute('hidden', '')

      clearInterval(this.intervalID)
      this.intervalID = null
    })

    // 按下 stop 按鍵
    stopBtn.addEventListener('click', () => {
      this.status = 'READY'
      playBtn.removeAttribute('hidden')
      pauseBtn.setAttribute('hidden', '')
      stopBtn.setAttribute('hidden', '')

      clearInterval(this.intervalID)
      this.intervalID = null
      this.remainingSeconds = this.maxSeconds
      minuteDisplay.textContent = '00'
      secondDisplay.textContent = '00'
    })

    // breakBtn.addEventListener('click', () => {

    // })

  }
}


pomodoro.runApp()


