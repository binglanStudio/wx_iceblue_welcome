// miniprogram/pages/join/join.js

import { isEmpty } from '../../utils/check'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    groups: ['产品组', 'UI设计组', '前端组', '后端组'],
    currentGroupIndex: -1,
    // 表单参数 start
    form: {
      name: '',
      tel: '',
      QQ: '',
      major: '',
      gender: '男',
      group: '',
      selfIntroduction: ''
    },
    // 表单参数 end
    isApply: false // 是否以及提交过申请 true->以及提交
  },

  // 改变表单参数 ,需要在标签上传递 data-paramName 指定要改变的参数名
  changeFormParams: function (e) {
    let that = this
    var formParamsName = e.target.dataset.paramsName
    var formParamsValue = e.detail.value
    // console.log('表单中要修改的参数名: ' + formParamsName)
    // console.log('该参数用户输入的值为: ' + formParamsValue)
    var form = that.data.form

    form[formParamsName] = formParamsValue
    that.setData({
      form: form
    })
  },

  // 改变表单参数 group的值，不能使用changeFormParams处理，需要单独处理
  changeFormParamsGroup: function (e) {
    let that = this

    // 获取选择的groups下标
    var selectedGroupIndex = e.currentTarget.dataset.groupsIndex
    var group = that.data.groups[selectedGroupIndex]
    if (selectedGroupIndex === that.data.currentGroupIndex) {
      selectedGroupIndex = -1
      group = ''
    }
    that.setData({
      currentGroupIndex: selectedGroupIndex
    })

    //console.log('表单中要修改的参数名: ' + 'group')
    //console.log('该参数用户输入的值为: ' + that.data.groups[selectedGroupIndex])
    var form = that.data.form
    form.group = group
    that.setData({
      form: form
    })
  },

  // 清除form表单中的数据
  clearForm: function () {
    let that = this
    that.setData({
      currentGroupIndex: -1,
      // 表单参数 start
      form: {
        name: '',
        tel: '',
        QQ: '',
        major: '',
        gender: '男',
        group: '',
        selfIntroduction: ''
      }
    })
  },

  onShow: function (params) {
    this.refresh()
  },
  // 从云数据库获取用户信息
  refresh: function () {
    let that = this
    wx.cloud
      .callFunction({
        name: 'getUser'
      })
      .then(res => {
        if (res.result.data.length > 0) {
          that.clearForm()
          var form = res.result.data[0]
          delete form._id
          delete form._openid
          that.setData({
            form: res.result.data[0],
            isApply: true
          })
        }
      })
  },

  // 点击提交
  submitForm: function () {
    let that = this
    var form = that.data.form
    // 验证表单参数
    for (var prop in form) {
      if (isEmpty(form[prop])) {
        // 参数为空，弹出提示信息
        wx.showToast({
          title: `请填写【${prop}】!`,
          icon: 'none',
          duration: 2000
        })
        return
      }
    }

    console.log('提交的表单参数为: ')
    console.log(form)

    //调用小程序云函数进行存储
    wx.cloud
      .callFunction({
        name: 'addUser',
        data: {
          form: form,
          isApply: that.data.isApply
        }
      })
      .then(res => {
        that.refresh()
        wx.showToast({
          title: `提交成功!`,
          icon: 'success',
          duration: 2000
        })
      })
  }
})
