/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-25 17:40:07
 * @LastEditTime: 2020-08-12 19:53:19
 */ 
import md5 from 'js-md5'

const utils = {
  // 一维数组转树形数组
  arrToTreeData(arr, parentArr, idName = 'parrentId') {
    parentArr.map(pNode => {
      let childArr = []

      arr.map(cNode => {
        if (cNode[idName] === pNode.id) {
          childArr.push(cNode)
        }
        return cNode
      })
      if (childArr.length > 0) {
        pNode.children = childArr
        this.arrToTreeData(arr, childArr, idName)
      }
      return pNode
    })
    return parentArr
  },
  // md5序列化
  stringToMd5(value) {
    return md5(value)
  },
  localGetItem(key) {
    return localStorage.getItem(key)
  },
  localSetItem(key, value) {
    localStorage.setItem(key, value)
  },
  localRemoveItem(key) {
    localStorage.removeItem(key)
  },
  localClearItem() {
    localStorage.clear()
  },
  sessionGetItem(key) {
    return sessionStorage.getItem(key)
  },
  sessionSetItem(key, value) {
    sessionStorage.setItem(key, value)
  },
  sessionRemoveItem(key) {
    return sessionStorage.removeItem(key)
  },
  sessionClearItem() {
    sessionStorage.clear()
  }
}

export default utils