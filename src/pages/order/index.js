import React, { Component } from 'react';
import { Card, Button, Form, Select, Table, Modal, message, DatePicker } from 'antd'
import BaseForm from './../../components/BaseForm'
import Utils from './../../utils/utils'
import Axios from './../../axios'
import './../../style/common.less'
const FormItem = Form.Item
const Option = Select.Option

class Order extends Component {
  state = {
    dataSource:[],
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
      type: '订单时间',
    },
    {
      type: 'SELECT',
      filed: 'status',
      label: '订单状态',
      placeholder: '全部',
      width: 100,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '已结束' }]
    }
  ]
  componentDidMount(){
    this.request()
  }
  request = () => {
    Axios.requestList(this, '/order/list', this.params, true)
  }
  // 打开订单详情页
  handleOpenOrder = () => {
      let item = this.state.selectedItem
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一条信息'
        })
        return
      }
      window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }
  //结束点单确认页
  handleEndOrder = () => {
    let item = this.state.selectedItem
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一条信息'
        })
        return
      }
      Axios.ajax({
        url: '/order/ebike_info',
        data: {
          params: {
            orderId: item.id
          }
        }
      }).then((res) => {
        if(res.code ==0 ){
          this.setState({
            orderConfirmVisble: true,
            orderInfo: res.result
          })
        }
      })
  }
  // 结束订单
  handleFinish = () => {
    let item = this.state.selectedItem
    Axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      console.log(res,'res')
      if (res.code == 0) {
        this.setState({
          orderConfirmVisble: false,
          selectedRowKeys: null,
          selectedItem: null
        })
        message.success('订单已结束')
        this.request()
      }
    })
  }
  // 查询
  handleFilter = (value) => {
    this.params = value
    this.request()
  }
  // 选中操作行
  onRowClick = (record, index) => {
    let selectedkey = [ index ]
    this.setState({
        selectedRowKeys: selectedkey,
        selectedItem:record
    })
  }
  render() {
  	const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(status){
                  return status == 1 ? '已结束' : '进行中'
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
    ]
    const selectedRowKeys = this.state.selectedRowKeys
    const rowRadioSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, '222', selectedRows)
        this.setState({
          selectedRowKeys,
          selectedItem: selectedRows[0]
        })
      },
    }
    const info = this.state.orderInfo || {}
    const formLayout = {
      labelCol:{
        span: 5
      },
      wrapperCol: {
        span: 15
      }
    }
    return (
      <div>
        <Card>
            <BaseForm formList = {this.formList} filterSubmit={this.handleFilter}/>
        </Card>

        <Card style={{marginTop: 10}}>
          <Button type='primary' onClick={this.handleOpenOrder}>订单详情</Button>
          <Button type='primary' onClick={this.handleEndOrder} style={{marginLeft: 30}}>结束订单</Button>
        </Card>

        <div className='content-warp'>
          <Table 
            bordered
            pagination={this.state.pagination}
            rowSelection={rowRadioSelection}
            dataSource={this.state.dataSource}
            columns={columns}
            onRow={(record,index) => {
                return {
                  onClick: () => {
                    this.onRowClick(record,index)
                  }
                };
            }}
          />
        </div>
        
        <Modal
          title='结束订单'
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
              this.setState({
                orderConfirmVisble: false
              })
          }}
          onOk={this.handleFinish}
        >
          <Form>
            <FormItem label="车辆编号" {...formLayout}>
              {info.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formLayout}>
              {info.battery + '%'}
            </FormItem>
            <FormItem label="开始时间" {...formLayout}>
                {info.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formLayout}>
                {info.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Order;
