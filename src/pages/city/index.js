import React, { Component } from 'react';
import { Card, Button, Form, Select, Table, Modal, message } from 'antd'
import BaseForm from './../../components/BaseForm'
import Utils from './../../utils/utils'
import Axios from './../../axios'
import './../../style/common.less'
const FormItem = Form.Item
const Option = Select.Option

class City extends Component {
  state = {
    dataSource:[],
    cityModal: false
  }
	params = {
    page: 1
  }
  formList = [
    {
      type: 'SELECT',
      filed: 'city',
      label: '城市',
      placeholder: '全部',
      width: 100,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
    },
    {
      type: 'SELECT',
      filed: 'mode',
      label: '城市',
      placeholder: '全部',
      width: 100,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '停车点模式' }, { id: '2', name: '禁停区模式' }]
    },
    {
      type: 'SELECT',
      filed: 'op_mode',
      label: '加盟模式',
      placeholder: '自营',
      width: 100,
      list: [{ id: '0', name: '自营' }, { id: '1', name: '加盟' }]
    },
  ]
  componentDidMount(){
    this.request()
  }
  request = () => {
    Axios.requestList(this, '/open_city', this.params, true)
  }

  handleOpenCity = () => {
    this.setState({
      cityModal: true
    })
  }
  handleSubmit = () => {
    let cityInfo = this.saveFormRef.props.form.getFieldsValue()
    Axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      },
    }).then((res) => {
      message.success(res.result)
      this.setState({
        cityModal: false
      })
      this.request()
    })
  }
  handleFilter = (value) => {
    this.params = value
    this.request()
  }
  render() {
  	const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: (time) => Utils.formateDate(time)
                // render: Utils.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
    ]
    return (
      <div>
        <Card>
            <BaseForm formList = {this.formList} filterSubmit={this.handleFilter}/>
        </Card>

        <Card style={{marginTop: 10}}>
          <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
        </Card>

        <div className='content-warp'>
          <Table 
            bordered
            pagination={this.state.pagination}
            dataSource={this.state.dataSource}
            columns={columns}
          />
        </div>

        <Modal
          title='开通城市'
          visible={this.state.cityModal}
          onCancel={() => {
            this.setState({
              cityModal: false
            })
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={(formRef) => {this.saveFormRef = formRef}}/>
        </Modal>
      </div>
    );
  }
}

class OpenCityForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const formLayout = {
      labelCol:{
        span: 5
      },
      wrapperCol:{
        span: 9
      }
    }
    return(
      <Form layout='horizontal'>
        <FormItem label='选择城市' {...formLayout}>
        {
          getFieldDecorator('city',{
            initialValue: '1'
          })(
            <Select>
              <Option value='1'>北京</Option>
              <Option value='2'>杭州</Option>
              <Option value='3'>上海</Option>
            </Select>
          )
        }
        </FormItem>
      <FormItem label='运营模式' {...formLayout}>
        {
          getFieldDecorator('mode',{
            initialValue: '1'
          })(
           <Select>
            <Option value='1'>自营</Option>
            <Option value='2'>加盟</Option>
           </Select>
          )
        } 
      </FormItem>
      <FormItem label='用车模式' {...formLayout}>
        {
          getFieldDecorator('ues_mode',{
            initialValue: '1'
          })(
           <Select>
            <Option value='1'>停车</Option>
            <Option value='2'>禁停</Option>
          </Select>
          )
        } 
        </FormItem>
      </Form>
    )
  }
}
OpenCityForm = Form.create()(OpenCityForm)
export default City;
