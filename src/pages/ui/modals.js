import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd'
import './ui.less'

export default class Modals extends Component {
	state = {
		modalShow1: false,
		modalShow2: false,
		modalShow3: false,
		modalShow4: false,
	}
	handleOpen = (value) => {
		this.setState({
			[value]: true
		})
	}
	handleCancel = () => {
		this.setState({
			modalShow1: false,
			modalShow2: false,
			modalShow3: false,
			modalShow4: false,
		})
	}
	handleConfirm = (type) => {
		Modal[type]({
			title: '确定?',
			content: "确定提交吗?",
			onOk(){
				console.log('ok')
			}
		})
	}
	render() {
		return(
			<div>
				<Card className="card" title='基础弹窗'>
					<Button type='primary' onClick={() => this.handleOpen('modalShow1')}>基础弹窗</Button>
					<Button onClick={() => this.handleOpen('modalShow2')}>自定义按钮</Button>
					<Button onClick={() => this.handleOpen('modalShow3')}>距离顶部20px</Button>
					<Button onClick={() => this.handleOpen('modalShow4')}>水平垂直居中</Button>
				</Card>
				
				<Card className="card" title='信息确认弹窗'>
					<Button onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
					<Button onClick={() => this.handleConfirm('info')}>Info</Button>
					<Button onClick={() => this.handleConfirm('success')}>Success</Button>
					<Button onClick={() => this.handleConfirm('warning')}>Warning</Button>
				</Card>

				<Modal
					title='基础弹窗'
					visible={this.state.modalShow1}
					onCancel={this.handleCancel}
				>
					hello world	
				</Modal>

				<Modal
					title='自定义按钮'
					visible={this.state.modalShow2}
					onCancel={this.handleCancel}
					okText='确定'
					cancelText='取消'
				>
					自定义按钮
				</Modal>

				<Modal
					title='距离顶部20px'
					visible={this.state.modalShow3}
					onCancel={this.handleCancel}
					style={{top: 20}}
				>
					距离顶部20px
				</Modal>

				<Modal
					title='水平垂直居中'
					wrapClassName='vertical-center-modal'
					visible={this.state.modalShow4}
					onCancel={this.handleCancel}
				>
					水平垂直居中
				</Modal>
			</div>
		)
	}
}