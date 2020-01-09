/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-09 16:19:09
 * @LastEditTime : 2020-01-09 16:54:46
 */
import { SLIDECOLLAPSED } from '../actionTypes';

const initalState = {
  slidecollapsed: false  // 侧边栏（收缩/展开）状态
}

export default function (state = initalState, action) {
  switch (action.type) {
    case SLIDECOLLAPSED:
      return Object.assign({}, state, {
        slidecollapsed: !state.slidecollapsed
      })
    default:
      return state
  }
}