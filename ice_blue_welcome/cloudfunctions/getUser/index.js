// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const collection = 'user'

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db
    .collection(collection)
    .where({
      _openid: wxContext.OPENID // 填入当前用户 openid
    })
    .get()
}
