import React, { Component } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import './login.less'
const FormItem = Form.Item;

const login = [{
    username:'admin',
    password:'123456'
}];

class NormalLoginForm extends Component {
    state = {
        isLoding:false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
					
					if (values) {
						console.log(values)
	                    localStorage.setItem('retData', 'data.retData')
	                    message.success('login successed!'); //成功信息
	                    let _this = this;
	                    setTimeout(function() { //延迟进入
	                        _this.props.history.push({pathname:'/'});
	                    }, 600);
					} else {
	                    message.error('login failed!'); //失败信息
	                }
            }
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
         const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
        return (
            this.state.isLoding?<Spin size="large" className="loading" />:
            <div className="login">
                <div className="login-form">
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem  
                        label='用户名:'
                        {...formItemLayout}
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input  placeholder="用户名 (admin)" />
                            )}
                        </FormItem>
                        <FormItem 
                            label='密码:'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input  type="password" placeholder="密码 (admin)" />
                            )}
                        </FormItem>

                        <FormItem style={{marginBottom:'0'}}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%',marginLeft: '0px'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;