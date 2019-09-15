//app.js

// 重写console.log,自定义是否打印信息
console.log = (function (oriLogFunc) {
  return function (str) {
    if (true) {
      // 需要打印 此处改为 true
      oriLogFunc.call(console, str)
    }
  }
})(console.log)

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }

    this.globalData = {}
  }
})
