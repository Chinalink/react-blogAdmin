/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-01-06 11:14:33
 * @LastEditTime : 2020-01-06 11:16:33
 */
import styled from 'styled-components';
import { Layout } from 'antd';
const { Header } = Layout

export const HeaderWrap = styled(Header)`
  padding: 0;
  background: #fff;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
`;