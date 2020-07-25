/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-23 11:09:36
 * @LastEditTime: 2020-07-25 09:54:23
 */ 
import React, { Component } from 'react';
import { Form, Row, Col } from 'antd'

import './style.css'

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { formOptions, formItems } = this.props
    return (
      <Form {...formOptions}>
        <Row className="search-form__row">{this.renderFormItem(formItems)}</Row>
      </Form>
    );
  }

  renderFormItem = (arr) => {
    return arr.map((item, index) => {
      return (
        <Col key={index} span={item.col} offset={item.offset || 0}>
          <Form.Item className="search-form__item" {...item}>{item.render && item.render}</Form.Item>
        </Col>
      )
    })
  }
}
 
export default SearchForm;