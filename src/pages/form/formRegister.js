import React, { Component } from 'react';
import { Card, Button, Form, Input, message, Checkbox, Radio, InputNumber, Select, Switch, DatePicker, TimePicker  } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option;
const TextArea = Input.TextArea


class FormReister extends Component {
  state = {
    disabled: true
  }
  handleSubmit = () => {
    const userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.info(`${userInfo.username},你好,恭喜你注册成功`)
      }
    })
    
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
        labelCol:{
          xs: 24,
          sm:4
        },
        wrapperCol: {
          xs: 24,
          sm: 10
        }
    }
    const offsetLayout = {
      wrapperCol: {
        xs:24,
        sm:{
          span: 10,
          offset: 4
        }
      }
    }
    const rowObject = {
      minRows: 2, 
      maxRows: 6
    }
    return(
        <Card className="card" title='注册表单'>
          <Form>
            <FormItem label="用户名" {...formItemLayout} >
              {
                getFieldDecorator('username',{
                  rules:[
                    {
                      required: true,
                      message: '请输入用户名!'
                    }
                  ]
                })(
                  <Input placeholder='请输入用户名' type='text' />
                )
              }
            </FormItem>

            <FormItem label="密码" {...formItemLayout} >
              {
                getFieldDecorator('password',{
                  rules:[
                    {
                      required: true,
                      message: '请输入密码!'
                    }
                  ]
                })(
                  <Input placeholder='请输入密码' type='password' />
                )
              }
            </FormItem>

            <FormItem label="性别" {...formItemLayout} >
              {
                getFieldDecorator('sex',{
                  initialValue: '1',
                  rules:[
                    {
                      required: true,
                      message: '请选择性别!'
                    }
                  ]
                })(
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>

            <FormItem label="年龄" {...formItemLayout} >
              {
                getFieldDecorator('age',{
                  initialValue: '18',
                  rules:[
                    {
                      required: true,
                      message: '请输入年龄!'
                    }
                  ]
                })(
                  <InputNumber max={80} min={16} /> 
                )
              }
            </FormItem>

            <FormItem label="状态" {...formItemLayout} >
              {
                getFieldDecorator('state',{
                  initialValue: '1',
                  rules:[
                    {
                      required: true,
                      message: '请选择状态!'
                    }
                  ]
                })(
                  <Select>
                    <Option value='0'>在职</Option>
                    <Option value='1'>离职</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem label="爱好" {...formItemLayout} >
              {
                getFieldDecorator('hobby',{
                  initialValue: ['2', '1']
                })(
                  <Select mode="multiple">
                    <Option value='0'>篮球</Option>
                    <Option value='1'>足球</Option>
                    <Option value='2'>游泳</Option>
                    <Option value='3'>爬山</Option>
                    <Option value='4'>读书</Option>
                    <Option value='5'>电影</Option>
                    <Option value='6'>音乐</Option>
                    <Option value='7'>旅游</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem label="是否已婚" {...formItemLayout} >
              {
                getFieldDecorator('marry',{
                  valuePropName: 'checked',
                  initialValue: false,
                  rules:[
                    {
                      required: true,
                      message: '请选择是否已婚!'
                    }
                  ]
                })(
                  <Switch />
                )
              }
            </FormItem>

            <FormItem label="生日" {...formItemLayout} >
              {
                getFieldDecorator('birthday',{
                  initialValue: moment('2018-02-01')
                })(
                  <DatePicker 
                    
                    format='YYYY-MM-DD'
                  />
                )
              }
            </FormItem>

            <FormItem label="地址" {...formItemLayout} >
              {
                getFieldDecorator('address',{
                  initialValue: '杭州市'
                })(
                  <TextArea 
                    autosize={rowObject}
                  />
                )
              }
            </FormItem>

            <FormItem label="时间" {...formItemLayout} >
              {
                getFieldDecorator('time',{
                 
                })(
                 <TimePicker  />
                )
              }
            </FormItem>

            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('text',{
                  valuePropName: 'checked',
                  initialValue: false
                })(
                 <Checkbox>我已阅读<a href="#">协议</a></Checkbox>
                )
              }
            </FormItem>

            <FormItem {...offsetLayout} >
              <Button type='primary' onClick={this.handleSubmit} disabled={!this.props.form.getFieldsValue().text}>注册</Button>
            </FormItem>
          </Form>
        </Card>
    )
  }
}

export default Form.create()(FormReister)