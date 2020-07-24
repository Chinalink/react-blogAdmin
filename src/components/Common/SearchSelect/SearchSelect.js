/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 17:43:11
 * @LastEditTime: 2020-07-24 11:46:28
 */ 
import React from 'react';
import { Select } from 'antd'

function SearchSelect(props) {
  const { value = '', onChange, datas } = props
  
  const data = [
    { text: '选项1', value: 'key' },
    { text: '选项2', value: 'key2' }
  ]

  const onSelectChange = selectValue => {
    onChange(selectValue);
  };

  const renderOptionXml = () => {
    const options = data.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>);
    return options
  }

  return (
    <Select value={value} onChange={onSelectChange}>
      {renderOptionXml()}
    </Select>
  )
}

export default SearchSelect