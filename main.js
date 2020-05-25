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

    // buttons
    playBtn: document.querySelector('#play'),
    pauseBtn: document.querySelector('#pause'),
    stopBtn: document.querySelector('#stop'),
    breakBtn: document.querySelector('#break'),

    // app settings
    collapseSettings: document.querySelector('#collapseSettings'),
    theme: document.querySelector('#theme'),
    language: document.querySelector('#language'),
    audio: document.querySelector('#audio'),
    pomodoroLength: document.querySelector('#pomodoro-length'),
    breakLength: document.querySelector('#break-length'),

    // Modal
    doneModal: document.querySelector('#competion'),

    // leaves (break timer)
    leaves: document.querySelectorAll('.break-count'),

    // audios
    bellAudio: 'http://bbcsfx.acropolis.org.uk/assets/07053071.wav',
    countryAudio: 'http://bbcsfx.acropolis.org.uk/assets/07060026.wav',
    streamAudio: 'http://bbcsfx.acropolis.org.uk/assets/07064019.wav'
  },

  initializeUI: function () {
    const minutes = Math.floor(this.maxSeconds / 60)
    const seconds = this.maxSeconds % 60

    this.ui.minutes.textContent = (minutes < 10) ? ('0' + minutes) : minutes
    this.ui.seconds.textContent = (seconds < 10) ? ('0' + seconds) : seconds
  },

  showDoneModal: function () {
    // const audio = new Audio(this.ui.bellAudio)
    // audio.volume = 0.1
    // audio.play()

    $('#done').modal('show')

    setTimeout(() => {
      $('#done').modal('hide')
    }, 5000);
  },

  revealLeaves: function () {
    let count = 0

    // leave 初始化回 hidden 狀態
    this.ui.leaves.forEach(leave => {
      leave.setAttribute('hidden', '')
    })

    const breakCountDown = setInterval(() => {
      // if (count === 4) {
      //   const audio = new Audio(this.ui.bellAudio)
      //   audio.volume = 0.1
      //   audio.play()
      // }

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
      this.ui.breakBtn.setAttribute('hidden', '')

      this.revealLeaves()
    })

    this.ui.collapseSettings.addEventListener('change', () => {
      console.log('theme', this.ui.theme.value)
      console.log('language', this.ui.language.value)
      console.log('audio', this.ui.audio.value)
      console.log('pomodoro range', this.ui.pomodoroLength.value)
      console.log('break range', this.ui.breakLength.value)

      // 顯示值
      // 更換 theme
      // change audio (with a demo upon change)
    })

  }
}

pomodoro.runApp()


