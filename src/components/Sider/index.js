/*
 * @Description:
 * @Author: HuGang
 * @Date: 2019-12-17 11:35:36
 * @LastEditTime : 2020-01-05 23:23:25
 */
import React, {useState} from 'react';
import SiderMenu from '../SiderMenu';
import { Menu } from 'antd';
import { SiderWrap } from './style';

import { menus } from '../../router/config';


const Sider = () => {
  const [slidecollapsed, setSlidecollapsed] = useState(false)

  return (
    <SiderWrap trigger={null} collapsible collapsed={slidecollapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {menus.map(SiderMenu)}
      </Menu>
    </SiderWrap>
  );
}
 
export default Sider;