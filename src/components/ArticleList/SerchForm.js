/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 00:53:24
 * @LastEditTime: 2020-07-16 12:52:15
 */ 
import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';

function SerchForm(props) {
  const { onFinish } = props
  const formRef = React.createRef()
  return (
    <Form ref={formRef} name="basic" layout="inline" onFinish={onFinish}>
      <Form.Item label="文章标题" name="username">
        <Input />
      </Form.Item>

      <Form.Item label="分类" name="category">
        <Select style={{ width: '100px' }}>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="作者" name="author">
        <Select style={{ width: '100px' }}>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="发布状态" name="status">
        <Select style={{ width: '100px' }}>
          <Select.Option value="male">male</Select.Option>
          <Select.Option value="female">female</Select.Option>
          <Select.Option value="other">other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="日期" name="date">
        <DatePicker.RangePicker format='YYYY/MM/DD' />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">筛选</Button>
      </Form.Item>
    </Form>
  )
}

export default SerchForm