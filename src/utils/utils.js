/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-25 17:40:07
 * @LastEditTime: 2020-08-11 23:26:56
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
  localGetItem(value) {
    return localStorage.getItem(value)
  },
  localSetItem(key, value) {
    localStorage.setItem(key, value)
  },
  localClearItem() {
    localStorage.clear()
  },
  sessionGetItem(value) {
    return sessionStorage.getItem(value)
  },
  sessionSetItem(key, value) {
    sessionStorage.setItem(key, value)
  },
  sessionClearItem() {
    sessionStorage.clear()
  }
}

export default utils