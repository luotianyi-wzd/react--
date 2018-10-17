import React, { Component } from 'react';
import { Card, Button, Form, Select, Table, Modal, message, DatePicker, Input, Radio } from 'antd'
import BaseForm from './../../components/BaseForm'
import Utils from './../../utils/utils'
import Axios from './../../axios'
import ETable from './../../components/ETable'
import moment from 'moment'
import './../../style/common.less'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
class Order extends Component {
  state = {
    dataSource:[],
    modalVisible: false
  }
	params = {
    page: 1
  }
  formList = [
    {
      type: 'INPUT',
      filed: 'user_name',
      label: '用户名',
      placeholder: '请输入用户名',
      width: 130,
    },
    {
      type: 'INPUT',
      filed: 'user_phone',
      label: '手机号',
      placeholder: '请输入手机号',
      width: 130,
    },
    {
      type: 'DATEPICKER',
      filed: 'user_start',
      label: '入职时间',
      placeholder: '请选择入职时间',
      width: 130,
    }
  ]
  componentDidMount(){
    this.request()
  }
  request = () => {
    Axios.requestList(this, '/table/list1', this.params, true)
  }
  // 查询
  handleFilter = (value) => {
    this.params = value
    this.request()
  }
  // 打开弹窗表单
  handleClick = (type) => {
    let item = this.state.selectedItem
    let _this = this
    if (type == 'create') {
      this.setState({
        type,
        modalVisible:true,
        modalTitle: '创建员工'
      })
    } else if (type == 'edit'){
      if (!item) {
        Modal.confirm({
          title: '提示',
          content: '请选择一条数据'
        })
        return
      }
      this.setState({
        type,
        modalVisible: true,
        modalTitle: '编辑员工',
        userInfo: item
      })
    } else if (type == 'detail'){
      if (!item) {
        Modal.confirm({
          title: '提示',
          content: '请选择一条数据'
        })
        return
      }
      this.setState({
        type,
        modalVisible: true,
        modalTitle: '员工信息',
        userInfo: item
      })
    } else if (type == 'delete'){
      if (!item) {
        Modal.confirm({
          title: '提示',
          content: '请选择一条数据'
        })
        return
      }
      Modal.confirm({
        title: '确认删除',
        content: '确定删除该员工吗?',
        onOk(){
          Axios.ajax({
            url:'/user/delete',
            data:{
              params: {id:item.id}
            }
          }).then((res) => {
              _this.request()
          })
        }
      })
    }
  }
  // 提交数据
  handleSubmit = () => {
    let item = this.state.selectedItem
    let value = this.userForm.props.form.getFieldsValue()
    let data = {...item, ...value}
          console.log(data)
    let type = this.state.type
    Axios.ajax({
      url: type == 'create' ? '/user/add' : '/user/edit',
      data: {
        params:{...data}
      }
    }).then((res) => {
      this.setState({
        modalVisible: false,
        userInfo:{}
      })
      this.userForm.props.form.resetFields()
      this.request()
    })
  }
  render() {
  	const columns = [
          {
            title: 'id',
            dataIndex: 'id'
          }, {
            title: '用户名',
            dataIndex: 'username'
          }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
          }, {
            title: '状态',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子一枚',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
          },{
            title: '爱好',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '1':'游泳',
                    '2':'打篮球',
                    '3':'踢足球',
                    '4':'跑步',
                    '5':'爬山',
                    '6':'骑行',
                    '7':'桌球',
                    '8':'麦霸'
                }
                return config[interest];
            }
          },{
            title: '爱好',
            dataIndex: 'isMarried',
            render(isMarried){
                return isMarried?'已婚':'未婚'
            }
          },{
            title: '生日',
            dataIndex: 'birthday'
          },{
            title: '联系地址',
            dataIndex: 'address'
          },{
            title: '早起时间',
            dataIndex: 'time'
          }
    ];
    let footer = {}
    if(this.state.type == 'detail') {
      footer={
        footer: null
      }
    }
    return (
      <div>
        <Card>
            <BaseForm formList = {this.formList} filterSubmit={this.handleFilter}/>
        </Card>

        <Card style={{marginTop: 10}} className='button-wrap'>
          <Button type='primary' icon='plus' onClick={() => this.handleClick('create')}>创建员工</Button>
          <Button type='primary' icon='edit' onClick={() => this.handleClick('edit')}>编辑员工</Button>
          <Button type='primary' icon='book' onClick={() => this.handleClick('detail')}>员工详情</Button>
          <Button type='primary' icon='delete' onClick={() => this.handleClick('delete')}>删除员工</Button>
        </Card>

        <div className='content-wrap'>
          <ETable 
            bordered
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            pagination={this.state.pagination}
            dataSource={this.state.dataSource}
            columns={columns}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            rowSelection='radio'
          />
        </div>
        
        <Modal
          title={this.state.modalTitle}
          visible={this.state.modalVisible}
          onCancel={() => {
              this.setState({
                modalVisible: false,
                userInfo:{}
              })
              this.userForm.props.form.resetFields()
          }}
          onOk={this.handleSubmit}
          {...footer}
        >
         <FormCreate userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(refs) => this.userForm = refs}/>
        </Modal>
      </div>
    );
  }
}

class FormCreate extends Component{

  render(){
    const formlayout = {
      labelCol:{
        span: 4
      },
      wrapperCol: {
        span: 18
      }
    }
    const { getFieldDecorator } = this.props.form
    const userInfo = this.props.userInfo || {}
    const type = this.props.type
    const getState = (state) => {
      return {
        '1':'咸鱼一条',
        '2':'风华浪子',
        '3':'北大才子一枚',
        '4':'百度FE',
        '5':'创业者'
      }[state]
    }
    return(
      <Form>
        <FormItem label='姓名' {...formlayout}>
          {
            type == 'detail' ? userInfo.username :
            getFieldDecorator('username',{
              initialValue: userInfo.username
            })(
              <Input type='text' placeholder="请输入姓名"/>
            )
          }
        </FormItem>
        <FormItem label='性别' {...formlayout}>
          {
            type == 'detail' ? userInfo.sex == '1' ? '男' : '女' :
            getFieldDecorator('sex',{
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label='状态' {...formlayout}>
          {
            type == 'detail' ? getState(userInfo.state) :
            getFieldDecorator('state',{
              initialValue: getState(userInfo.state)
            })(
              <Select placeholder="请选择状态">
                <Option value={1}>咸鱼一条</Option>
                <Option value={2}>风华浪子</Option>
                <Option value={3}>北大才子一枚</Option>
                <Option value={4}>百度FE</Option>
                <Option value={5}>创业者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='生日' {...formlayout}>
          {
            type == 'detail' ? userInfo.birthday :
            getFieldDecorator('birthday',{
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker placeholder="请选择日期"/>
            )
          }
        </FormItem>
        <FormItem label='地址' {...formlayout}>
          {
            type == 'detail' ? userInfo.address :
            getFieldDecorator('address',{
              initialValue: userInfo.address
            })(
              <TextArea row={3} placeholder="请输入联系地址"/>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
FormCreate = Form.create({})(FormCreate)
export default Order;
