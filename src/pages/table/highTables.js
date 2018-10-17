import React, { Component } from 'react'
import { Table, Card, Modal, Button, message, Badge } from 'antd'
import Axios from './../../axios/index.js'
import utils from './../../utils/utils'
import '../ui/ui.less'
export default class HighTables extends Component {
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
		  username: '胡彦斌',
		  age: 32,
		  address: '西湖区湖底公园1号',
		  sex: 1,
		  state: 2
		}, {
		  key: '22',
		  username: '吴彦祖',
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
	handleSort = (pagination, filters, sorter) => {
		this.setState({
			sortOrder: sorter.order
		})
	}
	handleRemove = (item) => {
		Modal.confirm({
			title: '删除',
			content: `删除${item.username}`,
			onOk: () => {
				this.result()
				message.success('删除成功')
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
			  width:100,
			  key: 'username',
			}, {
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			}, {
			  title: '住址',
			  dataIndex: 'address',
			  width:160,
			  key: 'address',
			}, {
			  title: '性别',
			  dataIndex: 'sex',
			  width:100,
			  key: 'sex',
			  render(sex){
			  	return sex == 1 ? '男' : '女'
			  }
			 }, {
			  title: '状态',
			  dataIndex: 'state',
			  width:100,
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

		const columns1 = [
			{
			  title: '姓名',
			  fixed: 'left',
			  dataIndex: 'username',
			  width:100,
			  key: 'username',
			}, {
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			}, {
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			},{
			  title: '住址',
			  dataIndex: 'address',
			  width:160,
			  key: 'address',
			}, {
			  title: '性别',
			  dataIndex: 'sex',
			  width:100,
			  key: 'sex',
			  render(sex){
			  	return sex == 1 ? '男' : '女'
			  }
			 }, {
			  title: '状态',
			  dataIndex: 'state',
			  width:100,
			  fixed: 'right',
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
			}
		];

		const columns2 = [
			{
			  title: '姓名',
			  dataIndex: 'username',
			  width:100,
			  key: 'username',
			}, {
			  title: '年龄',
			  dataIndex: 'age',
			  width:100,
			  key: 'age',
			  sorter: (a,b) => {
			  	return a.age - b.age
			  },
			  sortOrder: this.state.sortOrder
			}, {
			  title: '住址',
			  dataIndex: 'address',
			  width:160,
			  key: 'address',
			}, {
			  title: '性别',
			  dataIndex: 'sex',
			  width:100,
			  key: 'sex',
			  render(sex){
			  	return sex == 1 ? '男' : '女'
			  }
			 }, {
			  title: '状态',
			  dataIndex: 'state',
			  width:100,
			  key: 'state',
			  render(state){
			  	let config = {
			  		'1': <Badge status='success' text='在职'/>,
			  		'2': <Badge status='error' text='离职'/>,
			  		'3': <Badge status='processing' text='考虑机会'/>,
			  		'4': <Badge status='warning' text='暂不考虑'/>
			  	}
			  	return config[state]
			  }
			}, {
			  title: '操作',
			  dataIndex: 'action',
			  width:100,
			  key: 'action',
			  render: (text, item) => {
			  	return <Button onClick={() => this.handleRemove(item)} size='small'>删除</Button>
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

				<Card className="card" title='头部固定表格'>
					<Table 
						bordered
						dataSource={this.state.dataSource3}
						columns={columns}
						pagination={false}
						scroll={{y: 300}}
					/>
				</Card>
				
				<Card className="card" title='排序'>
					<Table 
						bordered
						dataSource={this.state.dataSource}
						columns={columns2}
						
						onChange={this.handleSort}
					/>
				</Card>


			</div>
		)
	}
}