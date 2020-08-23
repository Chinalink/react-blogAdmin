/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 17:43:11
 * @LastEditTime: 2020-08-23 16:41:50
 */ 
import React from 'react';
import { Select } from 'antd'

function FormSelect(props) {
  const { value = '', onChange, data = [] } = props

  const onSelectChange = (selectValue) => {
    onChange(selectValue);
  };

  const renderOptionXml = () => {
    const options = data.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>);
    return options
  }

  return (
    <Select {...props} onChange={onSelectChange}>
      {renderOptionXml()}
    </Select>
  )
}

export default FormSelect