const pomodoro = {
  status: 'READY',
  record: 0,
  maxSeconds: 10,
  remainingSeconds: 10,
  intervalID: null,

  ui: {
    // text display
    timeDisplay: document.querySelector('#time-display'),
    minutes: document.querySelector('#minutes'),
    seconds: document.querySelector('#seconds'),
    record: document.querySelector('#record'),

    // Buttons
    playBtn: document.querySelector('#play'),
    pauseBtn: document.querySelector('#pause'),
    stopBtn: document.querySelector('#stop'),
    breakBtn: document.querySelector('#break'),

    // Modal
    doneModal: document.querySelector('#competion'),

    // leaves (break timer)
    leaves: document.querySelectorAll('.break-count')
  },

  initializeUI: function () {
    const minutes = Math.floor(this.maxSeconds / 60)
    const seconds = this.maxSeconds % 60

    this.ui.minutes.textContent = (minutes < 10) ? ('0' + minutes) : minutes
    this.ui.seconds.textContent = (seconds < 10) ? ('0' + seconds) : seconds
  },

  showDoneModal: function () {
    $('#done').modal('show')

    setTimeout(() => {
      $('#done').modal('hide')
    }, 3000);
  },

  revealLeaves: function () {
    let count = 0

    const breakCountDown = setInterval(() => {
      if (count >= 5) {
        return clearInterval(breakCountDown)
      }

      this.ui.leaves[count].removeAttribute('hidden')
      count++
    }, 1000)
  },

  addTextFade: function () {
    this.ui.timeDisplay.classList.add('fade-in')
  },

  removeTextFade: function () {
    this.ui.timeDisplay.classList.remove('fade-in')
  },

  checkCompletion: function () {
    // 剩餘秒數為 0 -> 重新調整 UI 和設定值
    if (this.remainingSeconds === 0) {
      this.status = 'READY'
      clearInterval(this.intervalID)
      this.intervalID = null
      this.remainingSeconds = this.maxSeconds
      this.record++
      this.ui.record.textContent = this.record

      this.ui.playBtn.removeAttribute('hidden')
      this.ui.pauseBtn.setAttribute('hidden', '')
      this.ui.stopBtn.setAttribute('hidden', '')
      this.ui.breakBtn.removeAttribute('hidden')

      this.showDoneModal()
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
    this.ui.record.textContent = this.record
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

      this.removeTextFade()
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

      this.addTextFade()
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
      this.removeTextFade()
    })

    this.ui.breakBtn.addEventListener('click', () => {
      console.log('Break Time!')

      this.revealLeaves()
    })
  }
}

pomodoro.runApp()


