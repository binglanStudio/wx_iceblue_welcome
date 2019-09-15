// miniprogram/pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    touchStartY: 0,
    touchEndY: 0, //
    criticalDistance: 150, // 滑动切换幻灯片临界值
    screenHeight: 0, // 屏幕高度
    currentIndex: 1, // 当前是第几个页面
    sliderSize: 3, // 幻灯片个数

    groups: [
      {
        iconPath: '../../images/h5.png',
        name: '前端开发'
      },
      {
        iconPath: '../../images/backend.png',
        name: '后台开发'
      },
      {
        iconPath: '../../images/android.png',
        name: 'Android'
      },
      {
        iconPath: '../../images/iphone.png',
        name: 'IOS'
      },
      {
        iconPath: '../../images/media.png',
        name: '新媒体运营'
      },
      {
        iconPath: '../../images/pm.png',
        name: '产品经理'
      },
      {
        iconPath: '../../images/ui.png',
        name: 'UI设计'
      },
      {
        iconPath: '../../images/test.png',
        name: '测试'
      }
    ],
    projects: [
      {
        iconPath: '../../images/phone.png',
        title: '珍题库APP',
        subTitle: 'Treasures Question App',
        desc: '珍题库是一款公务员刷题的app，是冰蓝工作室和南京大学教师合作的一款针对公务员真题演练的项目。'
      },
      {
        iconPath: '../../images/snowflake.png',
        title: '冰晶花项目',
        subTitle: 'Ice crystal flower',
        desc: '冰蓝与其他大学优秀工作室一起组建团队，共同完成冰晶花，将艺术与科技完美结合。'
      },
      {
        iconPath: '../../images/notepad.png',
        title: '成长手册',
        subTitle: 'manual',
        desc:
          '《成长手册》获全国多家媒体报道，并且得到省委书记的关心，关注大学生成长的大学生手册获得国内多家媒体的宣传。'
      },
      {
        iconPath: '../../images/mac.png',
        title: '触点餐',
        subTitle: 'Touch point meal',
        desc: '触点餐系统项目根据刘俐老师指导下退出的基于二维码技术的电子点餐系统。'
      }
    ]
  },

  // 手指触摸事件
  scrollTouchStart: function(event) {
    console.log('touchStart: ')
    console.log(event)
    this.setData({
      touchStartY: event.touches[0].clientY
    })
  },
  // 手指触摸动作结束事件
  scrollTouchEnd: function(event) {
    console.log('touchEnd: ')
    console.log(event)
    this.setData({
      touchEndY: event.changedTouches[0].clientY
    })
    var distance = this.data.touchEndY - this.data.touchStartY
    console.log('Y轴移动距离: ' + distance)
    // 手指向上移动距离大于临界距离
    if (distance < 0 && Math.abs(distance) > this.data.criticalDistance) {
      // 页面向下滑动
      var targetIndex =
        this.data.currentIndex + 1 > this.data.sliderSize ? this.data.sliderSize : this.data.currentIndex + 1
      this.setData({
        currentIndex: targetIndex
      })
      this.scrollPage()
    }
    if (distance > 0 && Math.abs(distance) > this.data.criticalDistance) {
      // 页面向上滑动
      var targetIndex = this.data.currentIndex - 1 < 1 ? 1 : this.data.currentIndex - 1
      this.setData({
        currentIndex: targetIndex
      })
      this.scrollPage()
    }
  },
  // 幻灯片翻页
  scrollPage: function() {
    let that = this
    wx.pageScrollTo({
      scrollTop: (that.data.currentIndex - 1) * that.data.screenHeight,
      duration: 300
    })
  },

  onReady: function(params) {
    let that = this

    // 获取手机屏幕大小
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          screenHeight: res.windowHeight
        })
      }
    })
  },
  // 跳转到 join 页面
  goToJoin: function() {
    wx.navigateTo({
      url: '/pages/join/join'
    })
  }
})
