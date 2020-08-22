/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 17:43:11
 * @LastEditTime: 2020-08-22 19:49:41
 */ 
import React from 'react';
import { Select } from 'antd'

function SearchSelect(props) {
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

export default SearchSelect