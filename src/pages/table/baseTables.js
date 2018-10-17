import React, { Component } from 'react'
import { Table, Card, Modal, Button, message } from 'antd'
import Axios from './../../axios/index.js'
import utils from './../../utils/utils'
import '../ui/ui.less'
export default class BaseTables extends Component {
	state = {
		dataSource: [],
		dataSource2: []
	}
	params = {
		num: 1
	}
	componentDidMount(){
		const dataSource = [{
		  key: '11',
		  name: '胡彦斌',
		  age: 32,
		  address: '西湖区湖底公园1号',
		  sex: 1,
		  state: 2
		}, {
		  key: '22',
		  name: '吴彦祖',
		  age: 42,
		  address: '西湖区湖底公园1号',
		  sex: 1,
		  state: 1
		}];
		this.setState({
			dataSource
		})
		this.result()
	}
	result = () => {
		let _this = this
		Axios.ajax({
			url: '/table/list',
			data: {
				params:{
					num: this.params.num
				}
			}
		}).then((res) => {
			this.setState({
				dataSource2: res.result.list,
				dataSource3: res.result.list,
				selectedCheckRowKeys: [],
				selectedCheckRowItems: null,
				pagination: utils.pagination(res, (current) => {
					_this.params.num = current
					this.result()
				})
			})
		})
	}

	onRowClick = (record, index) => {
		let selectedkey = [index + 1]
		this.setState({
			selectedRowKeys: selectedkey,
			selectedItem:record
		})
		Modal.info({
			title: '选中',
			content: `${record.username},你好`
		})
	}
	handleDetele = () => {
		let rows = this.state.selectedCheckRowItems
		let newArr = []
		rows.map((item) => {
			newArr.push(item.username)
		})
		Modal.confirm({
			title: '确认删除',
			content: `删除：${newArr.join(',')}`,
			onOk: () => {
				message.success('删除成功');
				this.result();
			}
		})
	}
	render(){
		const selectedRowKeys = this.state.selectedRowKeys
		const rowRadioSelection = {
			type: 'radio',
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys
				})
		  	},
		}
		const rowCheckSelection = {
			selectedRowKeys: this.state.selectedCheckRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedCheckRowKeys:selectedRowKeys,
					selectedCheckRowItems: selectedRows
				})
		  	},
		}
		const columns = [
			{
			  title: '姓名',
			  dataIndex: 'username',
			  key: 'username',
			}, {
			  title: '年龄',
			  dataIndex: 'age',
			  key: 'age',
			}, {
			  title: '住址',
			  dataIndex: 'address',
			  key: 'address',
			}, {
			  title: '性别',
			  dataIndex: 'sex',
			  key: 'sex',
			  render(sex){
			  	return sex == 1 ? '男' : '女'
			  }
			 }, {
			  title: '状态',
			  dataIndex: 'state',
			  key: 'state',
			  render(state){
			  	let config = {
			  		'1': '在职',
			  		'2': '离职',
			  		'3': '考虑机会',
			  		'4': '暂不考虑'
			  	}
			  	return config[state]
			  }
		}];
		return(
			<div>
				<Card className="card" title='基础表格'>
					<Table 
						bordered
						dataSource={this.state.dataSource}
						columns={columns}
					/>
				</Card>

				<Card className="card" title='动态渲染数据表格'>
					<Table 
						bordered
						dataSource={this.state.dataSource3}
						columns={columns}
					/>
				</Card>
				
				<Card className="card" title='多选表格'>
					<Button
						style={{marginBottom: 10}}
						onClick={this.handleDetele}
					>删除</Button>
					<Table 
						bordered
						rowSelection={rowCheckSelection}
						dataSource={this.state.dataSource2}
						columns={columns}
						pagination={this.state.pagination}
					/>
				</Card>

				<Card className="card" title='单选表格'>
					<Table 
						bordered
						rowSelection={rowRadioSelection}
						dataSource={this.state.dataSource2}
						columns={columns}
						onRow={(record,index) => {
						    return {
						      onClick: () => {
						      	this.onRowClick(record,index)
						      }
						    };
						}}
					/>
				</Card>
			</div>
		)
	}
}