import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Select, Tree, Transfer } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import Axios from './../../axios'
import menuConfig from './../../config/menuConfig'
import './../../style/common.less'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
export default class Role extends Component {
  state = {
    show1:false,
    show2:false,
    show3:false
  }
  params = {
    page: 1
  }
  componentDidMount(){
      this.request()
  }
  request = () => {
    Axios.requestList(this, '/role/list', this.params)
  }
  // 创建角色弹窗
  handleCreate = () => {
    this.setState({
      show1: true
    })
  }
  // 提交数据
  handleSubmit = () => {
    this.roleForm.props.form.validateFields((err, values) => {
      if (err) return
      Axios.ajax({
        url: '/role/create',
        data: {
          params:values
        },
        }).then((res) => {
          this.setState({
            show1: false
          })
          this.roleForm.props.form.resetFields()
          this.request()
      })
    })
    
  }
  // 打开设置权限弹窗
  handleSet = () => {
      let item = this.state.selectedItem
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      this.setState({
        show2:true,
        roleInfo: item,
        menuInfo: item.menus
      })
  }
  handleCheck = (value) => {
    this.setState({
      menuInfo:value
    })
  }
  // 提交设置权限
  handleSetSubmit = () => {
    let data = this.setForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedItem.role_id
    data.menus = this.state.menuInfo
    Axios.ajax({
      url: '/permission/edit',
      data: {
        params: {...data}
      }
    }).then((res) => {
      this.setState({
        show2: false
      })
      this.request()
    })
  }
  // 打开用户授权弹窗
  handleRole = () => {
     let item = this.state.selectedItem
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      this.getUserList(item.id)
      this.setState({
        show3: true,
        roleInfo: item,
      })
  }
  // 获取用户列表
  getUserList = (id) => {
    Axios.ajax({
      url: '/role/user_list',
      data: {
        params:{id}
      }
    }).then(res => {
        this.getAuthUserList(res.result)
    })
  }
  // 筛选数据
  getAuthUserList = (dataSource) => {
    const targetKeys = [];
    const mockData = [];
    dataSource.map(item => {
      let data = {
        key: item.user_id,
        title: item.user_name,
        status: item.status
      }
      if (data.status == 1) {
        targetKeys.push(data.key)
      } 
      mockData.push(data)
    })
    this.setState({
      mockData,
      targetKeys
    })
  }
  //提交用户授权
  handleRoleSubmit = () => {
    let data = {}
    data.user_id = this.state.targetKeys
    data.role_id = this.state.selectedItem.id
    Axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {...data}
      }
    }).then(res => {
      this.setState({
        show3:false
      })
      this.request()
    })
  }
  render() {
    const columns = [
        {
            title: '角色ID',
            dataIndex: 'id'
        }, {
            title: '角色名称',
            dataIndex: 'role_name'
        },{
            title: '创建时间',
            dataIndex: 'create_time',
            render: Utils.formatTime
        }, {
            title: '使用状态',
            dataIndex: 'status',
            render(status){
               return status == 1 ? '启用' : '停用'
            }
        }, {
            title: '授权时间',
            dataIndex: 'authorize_time',
            render: Utils.formatTime
        }, {
            title: '授权人',
            dataIndex: 'authorize_user_name',
        }
    ];
    const formLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span:16
      }
    }
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.handleCreate}>创建角色</Button>
          <Button type='primary' onClick={this.handleSet} style={{margin: '0 20px'}}>设置权限</Button>
          <Button type='primary' onClick={this.handleRole}>用户授权</Button>
        </Card>

        <div className="content-wrap">
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

          <Modal
            title='创建角色'
            visible={this.state.show1}
            onCancel={() => {
              this.setState({
                show1:false
              })
            }}
            onOk={this.handleSubmit}
          >
            <RoleForm formLayout={formLayout} wrappedComponentRef={(refs) => this.roleForm = refs}/>
          </Modal>

          <Modal
            title='设置权限'
            visible={this.state.show2}
            onCancel={() => {
              this.setState({
                show2:false
              })
            }}
            onOk={this.handleSetSubmit}
            width={700}
          >
            <SetForm
              formLayout={formLayout}  
              roleInfo={this.state.roleInfo} 
              menuInfo={this.state.menuInfo}
              wrappedComponentRef={(refs) => this.setForm = refs}
              patchMenuInfo={this.handleCheck}
            />
          </Modal>

          <Modal
            title='用户授权'
            visible={this.state.show3}
            onCancel={() => {
              this.setState({
                show3:false
              })
            }}
            onOk={this.handleRoleSubmit}
            width={700}
          >
           <RoleAuthForm 
              formLayout={formLayout}  
              roleInfo={this.state.roleInfo} 
              mockData={this.state.mockData}
              targetKeys={this.state.targetKeys}
              wrappedComponentRef={(refs) => this.authForm = refs}
              handleList={(targetKeys) => {
                this.setState({
                  targetKeys
                })
              }}
           />
          </Modal>
        </div>
      </div>
    );
  }
}
class RoleForm extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    const { formLayout } = this.props
    return(
      <Form>
        <FormItem label='用户角色' {...formLayout}>
          {
              getFieldDecorator('role_name',{
                rules:[{
                  required:true,message:'请输入用户角色'
                }]
              })(
                  <Input type='text' placeholder='请输入用户角色'/>
              )
          }
        </FormItem>

        <FormItem label='是否启用' {...formLayout}>
          {
              getFieldDecorator('role_state',{
                rules:[{
                  required:true,message:'请选择是否启用'
                }]
              })(
                  <Select>
                    <Option value='1'>启用</Option>
                    <Option value='2'>停止</Option>
                  </Select>
              )
          }
        </FormItem>
      </Form>
    )
  }
}
RoleForm = Form.create({})(RoleForm)

class SetForm extends Component{
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }
  renderTree = (data) => {
    return data.map(item => {
      if (item.children) {
        return <TreeNode {...item}>
          {this.renderTree(item.children)}
        </TreeNode>
      }
      return <TreeNode {...item}>
        {item.title}
      </TreeNode>
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const { formLayout, roleInfo, menuInfo } = this.props
    return(
      <Form>
        <FormItem label='角色名称' {...formLayout}>
          {
            getFieldDecorator('role_name',{
              initialValue: roleInfo.role_name
            })(
                <Input type='text' disabled />
            )
          }
        </FormItem>
        <FormItem label='是否启用' {...formLayout}>
          {
            getFieldDecorator('status',{
              initialValue: roleInfo.status
            })(
                <Select>
                  <Option value={1}>启用</Option>
                  <Option value={2}>停止</Option>
                </Select>
            )
          }
        </FormItem>

        <Tree
          checkable
          defaultExpandAll
          checkedKeys={menuInfo}
          onCheck={(checkedKeys) => {
            this.onCheck(checkedKeys)
          }}
        >
          {this.renderTree(menuConfig)}
        </Tree>
      </Form>
    )
  }
}
SetForm = Form.create({})(SetForm)

class RoleAuthForm extends Component{
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }
  handleChange = (targetKeys) => {
    this.props.handleList(targetKeys)
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const { formLayout, roleInfo, mockData, targetKeys } = this.props
    return(
      <Form>
        <FormItem label='角色名称' {...formLayout}>
          {
            getFieldDecorator('role_name',{
              initialValue: roleInfo.role_name
            })(
                <Input type='text' disabled />
            )
          }
        </FormItem>
        <Transfer 
          dataSource={mockData}
          showSearch
          filterOption={this.filterOption}
          targetKeys={targetKeys}
          onChange={
            this.handleChange
          }
          render={item => item.title}
        />
      </Form>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm)