const pomodoro = {
  status: 'READY',
  record: 0,
  maxSeconds: 10,
  remainingSeconds: 10,
  intervalID: null,

  ui: {
    minutes: document.querySelector('#minutes'),
    seconds: document.querySelector('#seconds'),
    playBtn: document.querySelector('#play'),
    pauseBtn: document.querySelector('#pause'),
    stopBtn: document.querySelector('#stop'),
    breakBtn: document.querySelector('#break')
  },

  initializeUI: function () {
    const minutes = Math.floor(this.maxSeconds / 60)
    const seconds = this.maxSeconds % 60

    this.ui.minutes.textContent = (minutes < 10) ? ('0' + minutes) : minutes
    this.ui.seconds.textContent = (seconds < 10) ? ('0' + seconds) : seconds
  },

  checkCompletion: function () {
    // 剩餘秒數為 0 -> 重新調整 UI 和設定值
    if (this.remainingSeconds === 0) {
      this.status = 'READY'
      clearInterval(this.intervalID)
      this.intervalID = null
      this.remainingSeconds = this.maxSeconds
      this.record++

      this.ui.playBtn.removeAttribute('hidden')
      this.ui.pauseBtn.setAttribute('hidden', '')
      this.ui.stopBtn.setAttribute('hidden', '')
      this.ui.breakBtn.removeAttribute('hidden')
    }
  },
  updateTime: function () {
    // 暫停 -> 啟動時，不會重新初始化 UI
    if (this.status !== 'PAUSED') this.initializeUI()

    // 每秒更新一次剩餘秒數
    // 剩下 0 秒 -> 觸發 checkCompletion() 
    this.intervalID = setInterval(() => {
      if (this.remainingSeconds > 0) this.remainingSeconds--

      const minutes = Math.floor(this.remainingSeconds / 60)
      const seconds = this.remainingSeconds % 60
      this.ui.minutes.textContent = (minutes < 10) ? ('0' + minutes) : minutes
      this.ui.seconds.textContent = (seconds < 10) ? ('0' + seconds) : seconds

      this.checkCompletion()
    }, 1000)
  },
  runApp: function () {
    // Ready 狀態
    this.ui.pauseBtn.setAttribute('hidden', '')
    this.ui.stopBtn.setAttribute('hidden', '')
    this.ui.breakBtn.setAttribute('hidden', '')

    // 按下 play 按鍵
    this.ui.playBtn.addEventListener('click', () => {
      if (this.status !== 'PAUSED') this.status = 'RUNNING'

      this.ui.playBtn.setAttribute('hidden', '')
      this.ui.pauseBtn.removeAttribute('hidden')
      this.ui.stopBtn.removeAttribute('hidden')
      this.ui.breakBtn.setAttribute('hidden', '')

      this.updateTime()
    })

    // 按下 pause 按鍵
    this.ui.pauseBtn.addEventListener('click', () => {
      this.status = 'PAUSED'
      this.ui.playBtn.removeAttribute('hidden')
      this.ui.pauseBtn.setAttribute('hidden', '')
      this.ui.breakBtn.setAttribute('hidden', '')

      clearInterval(this.intervalID)
      this.intervalID = null
    })

    // 按下 stop 按鍵
    this.ui.stopBtn.addEventListener('click', () => {
      this.status = 'READY'
      this.ui.playBtn.removeAttribute('hidden')
      this.ui.pauseBtn.setAttribute('hidden', '')
      this.ui.stopBtn.setAttribute('hidden', '')
      this.ui.breakBtn.setAttribute('hidden', '')

      clearInterval(this.intervalID)
      this.intervalID = null
      this.remainingSeconds = this.maxSeconds

      this.initializeUI()
    })

    breakBtn.addEventListener('click', () => {
      console.log('Break Time!')
    })
  }
}

pomodoro.runApp()


