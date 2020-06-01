const pomodoro = {
  status: 'READY',
  record: 0,
  maxSeconds: 25 * 60,
  remainingSeconds: 25 * 60,
  breakSeconds: 5 * 60,
  intervalID: null,
  soundAlert: 'http://bbcsfx.acropolis.org.uk/assets/07053071.wav',
  volume: 0.1,

  ui: {
    // 文字顯示區域
    timeDisplay: document.querySelector('#time-display'),
    pomodoroDisplay: document.querySelector('#pomodoro-display'),
    breakDisplay: document.querySelector('#break-display'),
    volumeDisplay: document.querySelector('#volume-display'),
    minutes: document.querySelector('#minutes'),
    seconds: document.querySelector('#seconds'),
    today: document.querySelector('#today'),
    record: document.querySelector('#record'),

    // 套用主題色區域
    coloringAreas: document.querySelectorAll('.coloring-area'),

    // 按鈕
    playBtn: document.querySelector('#play'),
    pauseBtn: document.querySelector('#pause'),
    stopBtn: document.querySelector('#stop'),
    breakBtn: document.querySelector('#break'),

    // 表單及時間長度輸入區域
    form: document.querySelector('#form'),
    pomodoroForm: document.querySelector('#pomodoro-form'),
    breakForm: document.querySelector('#break-form'),
    audioForm: document.querySelector('#audio-form'),
    pomodoroLength: document.querySelector('#pomodoro-length'),
    breakLength: document.querySelector('#break-length'),

    // 完成蕃茄鐘的對話框
    doneModal: document.querySelector('#competion'),

    // 休息對話框的葉子計時器
    leaves: document.querySelectorAll('.break-count')
  },

  // 提示音來源
  audio: {
    bell: 'http://bbcsfx.acropolis.org.uk/assets/07053071.wav',
    splash: 'http://bbcsfx.acropolis.org.uk/assets/07064005.wav',
    bird: 'http://bbcsfx.acropolis.org.uk/assets/07074107.wav'
  },

  playAudio: function () {
    const audio = new Audio(this.soundAlert)
    audio.volume = this.volume
    audio.play()
  },

  initializeUI: function () {
    const minutes = Math.floor(this.maxSeconds / 60)
    const seconds = this.maxSeconds % 60

    this.ui.minutes.textContent = (minutes < 10) ? ('0' + minutes) : minutes
    this.ui.seconds.textContent = (seconds < 10) ? ('0' + seconds) : seconds
  },


  // Visual effects for the pause state
  addTextFade: function () {
    this.ui.timeDisplay.classList.add('fade-in')
  },

  removeTextFade: function () {
    this.ui.timeDisplay.classList.remove('fade-in')
  },

  // Actions and modals for the complete state
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

  showDoneModal: function () {
    this.playAudio()

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
      if (count === 4) this.playAudio()

      if (count >= 5) {
        return clearInterval(breakCountDown)
      }

      this.ui.leaves[count].removeAttribute('hidden')
      count++
    }, (this.breakSeconds * 1000) / 5)
  },

  // Update time by second and check if a pomodoro is complete
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
    const today = new Date()
    this.ui.today.textContent = today.toISOString().slice(0, 10)

    // Ready 狀態
    this.ui.minutes.textContent = this.ui.pomodoroLength.value
    this.ui.seconds.textContent = '00'
    this.ui.record.textContent = this.record
    this.ui.pomodoroDisplay.textContent = this.ui.pomodoroLength.value
    this.ui.breakDisplay.textContent = this.ui.breakLength.value
    this.ui.volumeDisplay.textContent = this.volume * 100
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
      this.ui.breakBtn.setAttribute('hidden', '')
      this.revealLeaves()
    })

    this.ui.form.addEventListener('input', event => {
      console.log('theme', this.ui.form.theme.value)
      console.log('language', this.ui.form.language.value)

      // 更換 theme
      switch (this.ui.form.theme.value) {
        case 'blue':
          this.ui.coloringAreas.forEach(area => {
            area.classList.remove('green', 'red')
            area.classList.add('blue')
          })
          break

        case 'red':
          this.ui.coloringAreas.forEach(area => {
            area.classList.remove('green', 'blue')
            area.classList.add('red')
          })
          break

        case 'green':
          this.ui.coloringAreas.forEach(area => {
            area.classList.remove('blue', 'red')
            area.classList.add('green')
          })
          break

        default:
          break
      }

      // 更換語言
      switch (this.ui.form.language.value) {
        case 'zh':
          document.querySelectorAll('[lang="en"]').forEach(element => {
            element.style.display = "none"
          })
          document.querySelectorAll('[lang="zh"]').forEach(element => {
            element.style.display = "inline"
          })
          break

        case 'en':
          document.querySelectorAll('[lang="zh"]').forEach(element => {
            element.style.display = "none"
          })
          document.querySelectorAll('[lang="en"]').forEach(element => {
            element.style.display = "inline"
          })
          break

        default:
          break
      }
    })

    this.ui.pomodoroForm.addEventListener('input', event => {
      console.log('pomodoro range', this.ui.pomodoroForm["pomodoro-length"].value)

      // 顯示值
      this.ui.pomodoroDisplay.textContent = this.ui.pomodoroLength.value
      this.ui.minutes.textContent = this.ui.pomodoroLength.value
      this.ui.seconds.textContent = '00'
      // 這邊的值之後要修改成 * 60
      this.maxSeconds = this.ui.pomodoroLength.value * 60
      this.remainingSeconds = this.ui.pomodoroLength.value * 60
    })

    this.ui.breakForm.addEventListener('input', event => {
      console.log('break range', this.ui.breakForm["break-length"].value)
      this.ui.breakDisplay.textContent = this.ui.breakLength.value
    })

    this.ui.audioForm.addEventListener('change', event => {
      console.log('audio', this.ui.audioForm.audio.value)
      console.log('volume', this.ui.audioForm.volume.value / 100)
      // change audio (with a demo upon change)

      switch (this.ui.audioForm.audio.value) {
        case 'bell':
          this.soundAlert = this.audio.bell
          break

        case 'splash':
          this.soundAlert = this.audio.splash
          break

        case 'bird':
          this.soundAlert = this.audio.bird
          break

        case 'none':
          this.soundAlert = null
          break

        default:
          break
      }

      this.volume = this.ui.audioForm.volume.value / 100
      this.ui.volumeDisplay.textContent = this.ui.audioForm.volume.value

      this.playAudio()
    })

  }
}

pomodoro.runApp()


