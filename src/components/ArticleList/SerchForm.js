/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 00:53:24
 * @LastEditTime: 2020-07-16 01:40:02
 */ 
import React, { Component } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';

class serchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Form ref={this.formRef} name="basic" layout="inline" onFinish={this.onFinish}>
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
    );
  }

  onGenderChange = value => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = values => {
    console.log(this.formRef)
    console.log(values);
  }
}
 
export default serchForm;