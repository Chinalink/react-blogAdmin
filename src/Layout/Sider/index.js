/*
 * @Description:
 * @Author: HuGang
 * @Date: 2019-12-17 11:35:36
 * @LastEditTime : 2020-01-07 20:32:36
 */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import SiderMenu from '../SiderMenu';
import { Menu } from 'antd';
import { SiderWrap } from './style';
import { menus } from '../../router/config';

const Sider = (props) => {
  const [slidecollapsed, setSlidecollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['/'])

  const selectChange = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log(selectedKeys);
    setSelectedKeys(selectedKeys)
  }

  return (
    <SiderWrap trigger={null} collapsible collapsed={slidecollapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={selectedKeys} onSelect={selectChange}>
        {menus.map(SiderMenu)}
      </Menu>
    </SiderWrap>
  );
}
 
export default withRouter(Sider);