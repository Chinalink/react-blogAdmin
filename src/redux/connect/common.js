/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-09 16:59:12
 * @LastEditTime : 2020-01-09 17:08:32
 */
import { changeSlidecollapsed } from '../actions';

export const mapStateToProps = (state) => {
  console.log(state);
  const { commonRenducer } = state
  return {
    slidecollapsed: commonRenducer.slidecollapsed
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleSlidecollapsed: () => dispatch(changeSlidecollapsed)
  }
}