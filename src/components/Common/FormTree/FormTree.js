/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-22 18:59:41
 * @LastEditTime: 2020-08-22 19:24:54
 */
import React from 'react';
import { Tree } from 'antd'

function FormTree(props) {
  const { defaultCheckedKeys = [], onChange, treeData = [] } = props

  const onChecked = (selectValue) => {
    onChange(selectValue.checked);
  };

  return (
    <Tree defaultCheckedKeys={defaultCheckedKeys} onCheck={onChecked} treeData={treeData} {...props} />
  )
}

export default FormTree