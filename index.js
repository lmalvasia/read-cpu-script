const { exec, spawn } = require('child_process')
const fs = require('fs')

function getDateTime() {
  var date = new Date()

  var hour = date.getHours()
  hour = (hour < 10 ? '0' : '') + hour

  var min = date.getMinutes()
  min = (min < 10 ? '0' : '') + min

  var sec = date.getSeconds()
  sec = (sec < 10 ? '0' : '') + sec

  var year = date.getFullYear()

  var month = date.getMonth() + 1
  month = (month < 10 ? '0' : '') + month

  var day = date.getDate()
  day = (day < 10 ? '0' : '') + day

  return year + '-' + month + '-' + day + '-' + hour + ':' + min + ':' + sec
}

var openApp = exec(
  'adb shell am start -n com.progressivewebapp/com.progressivewebapp.MainActivity',
  error => {
    if (error !== null) {
      console.log(`exec error: ${error}`)
    } else {
      console.log('Read CPU Usage:')
      let cpu = spawn('sh', ['-c', 'adb shell top | grep com.progressive'])
      cpu.stdout.on('data', data => {
        console.log(`stdout: ${data}`)
        fs.writeFile(getDateTime() + '.log', data, err => {
          if (err) console.log(err)
          console.log('Successfully Written to File.')
        })
      })
      setTimeout(() => {
        cpu.kill()
        var closeApp = exec('adb shell pm clear com.progressivewebapp', err => {
          if (err) console.log(err)
          console.log('App closed successfully')
        })
      }, 5000)
    }
  }
)
