/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-06 11:13:52
 * @LastEditTime : 2020-01-09 17:03:22
 */
import React, { useState } from 'react';
import { Icon } from 'antd';
import { HeaderWrap } from './style';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../redux/connect/common';

const Header = (props) => {
  const { slidecollapsed, handleSlidecollapsed } = props
  return (
    <HeaderWrap>
      <Icon className="trigger" type={slidecollapsed ? 'menu-unfold' : 'menu-fold'} onClick={handleSlidecollapsed } />
    </HeaderWrap>
  );
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header);