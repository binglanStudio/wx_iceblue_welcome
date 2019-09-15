/**
 * 判断obj是否为空,为空，返回true
 * @param {*} obj
 */
export function isEmpty(obj) {
  if (typeof obj == 'undefined' || obj == null || obj == '') {
    return true
  } else {
    return false
  }
}
