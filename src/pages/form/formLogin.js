import React, { Component } from 'react';
import { Card, Button, Form, Input, Icon, message, Checkbox } from 'antd'

const FormItem = Form.Item

class FormLogin extends Component {
	
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
      message.info(`${values.username},你好,登陆成功,密码是${values.password}`)
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Card className="card" title='水平登陆框'>
          <Form  layout='inline'>
            <FormItem>
              <Input text='text' placeholder='请输入用户名'></Input>
            </FormItem>
             <FormItem>
              <Input text='password' placeholder='请输入密码'></Input>
            </FormItem>
             <FormItem>
              <Button>登陆</Button>
            </FormItem>
          </Form>
        </Card>

        <Card className="card" title='垂直登陆框'>
          <Form style={{width: 300}}>
            <FormItem>
              {
                  getFieldDecorator('username',{
                    rules:[
                      {
                        required:true,
                        message:'请输入用户名'
                      },
                      {
                        min:4,max:10,
                        message: '用户名长度4-10位'
                      },
                      {
                        pattern: /\w+$/,
                        message: '请输入英文或数字'
                      }
                    ]
                  })(
                    <Input prefix={<Icon type='user'/>}  type='text' placeholder='请输入用户名'></Input>
                  )
              }
            </FormItem>
             <FormItem>
              {
                getFieldDecorator('password', {
                  rules:[
                    {
                      required: true,
                      message: '请输入密码'
                    },
                    {
                      min:6,
                      message: '密码最少6位数'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='lock'/>} type='passWord' placeholder='请输入密码'></Input>
                )
              }
              
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  initialValue:true,
                  valuePropName: 'checked'
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#" target='_blank' style={{float: 'right'}}>忘记密码</a>
            </FormItem>
             <FormItem>
              <Button onClick={this.handleSubmit} type='submit'>登陆</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin);
