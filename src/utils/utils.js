/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-25 17:40:07
 * @LastEditTime: 2020-07-25 18:11:41
 */ 

class Utils {
  static arrToTreeData (arr, parentArr, idName = 'parrent_id') {
    parentArr.map(pNode => {
      let childArr = []
      
      arr.map(cNode => {
        if(cNode[idName] === pNode.id) {
          childArr.push(cNode)
        }
        return cNode
      })
      if(childArr.length > 0) {
        pNode.children = childArr
        this.arrToTreeData(arr, childArr, idName)
      }
      return pNode
    })
    return parentArr
  }
}

export default Utils