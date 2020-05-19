const pomodoro = {
  status: 'READY',
  tomatoes: 0,
  maxSeconds: 20,
  intervalID: null,
  updateTime: function () {
    // Initialize pomodoro
    const minuteDisplay = document.querySelector('#minuteDisplay')
    const secondDisplay = document.querySelector('#secondDisplay')

    this.intervalID = setInterval(() => {
      const minutes = Math.floor(this.maxSeconds / 60)
      const seconds = this.maxSeconds % 60

      minuteDisplay.textContent = (minutes < 10) ? ('0' + minutes) : minutes
      secondDisplay.textContent = (seconds < 10) ? ('0' + seconds) : seconds
      this.maxSeconds--

      if (this.maxSeconds < 0) {
        clearInterval(this.intervalID)
        this.status = 'READY'
      }
    }, 1000)
  },
  runApp: function () {
    const playBtn = document.querySelector('#play')
    const pauseBtn = document.querySelector('#pause')
    const stopBtn = document.querySelector('#stop')
    const breakBtn = document.querySelector('#break')

    pauseBtn.setAttribute('hidden', '')
    stopBtn.setAttribute('hidden', '')

    playBtn.addEventListener('click', () => {
      this.status = 'RUNNING'
      playBtn.setAttribute('hidden', '')
      pauseBtn.removeAttribute('hidden')
      stopBtn.removeAttribute('hidden')
      this.updateTime()
    })

    pauseBtn.addEventListener('click', () => {
      this.status = 'PAUSED'
      playBtn.removeAttribute('hidden')
      pauseBtn.setAttribute('hidden', '')
    })

    stopBtn.addEventListener('click', () => {
      this.status = 'READY'
      playBtn.removeAttribute('hidden')
      pauseBtn.setAttribute('hidden', '')
      stopBtn.setAttribute('hidden', '')
    })

    // breakBtn.addEventListener('click', () => {

    // })

  }
}


pomodoro.runApp()


