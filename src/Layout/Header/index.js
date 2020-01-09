/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-06 11:13:52
 * @LastEditTime : 2020-01-06 11:23:13
 */
import React, { useState } from 'react';
import { Icon } from 'antd';
import { HeaderWrap } from './style';

const Header = () => {

  return (
    <HeaderWrap>
      <Icon className="trigger" type={false ? 'menu-unfold' : 'menu-fold'} />
    </HeaderWrap>
  );
}
 
export default Header;