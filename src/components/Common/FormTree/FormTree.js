/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-22 18:59:41
 * @LastEditTime: 2020-08-23 20:38:36
 */
import React from 'react';
import { Tree } from 'antd'

function FormTree(props) {
  const { value = [], onChange, treeData = [] } = props
  
  const onChecked = (selectValue) => {
    onChange(selectValue.checked);
  };

  return (
    <Tree checkedKeys={value} onCheck={onChecked} treeData={treeData} {...props} />
  )
}

export default FormTree