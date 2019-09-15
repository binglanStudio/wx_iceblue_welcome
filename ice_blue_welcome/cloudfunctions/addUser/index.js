// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const collection = 'user'

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 先根据openid查早是否右该用户记录
  // 若无记录，则保存，有记录则更新

  var form = event.form
  form._openid = wxContext.OPENID
  var isApply = event.isApply
  if (!isApply) {
    // 该用户没有记录，进行创建
    console.log('进行创建: ' + wxContext.OPENID)
    return await db.collection(collection).add({
      // data 字段表示需新增的 JSON 数据
      data: form
    })
  } else {
    // 该用户存在记录，进行修改
    console.log('进行更新: ' + wxContext.OPENID)
    return await db
      .collection(collection)
      .where({
        _openid: wxContext.OPENID
      })
      .update({
        data: form
      })
  }

  return {
    event
  }
}