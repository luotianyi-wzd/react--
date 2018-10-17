import React, { Component } from 'react';
import { Card, notification, Button  } from 'antd'
import './ui.less'

export default class Notifications extends Component {

	openNotification = (type,placement) => {
		if (placement) {
			notification.config({
				placement: placement
			})
		}
		notification[type]({
			message: '提示信息',
			description: '这是一个提示内容'
		})
	}
	render(){
		return(
			<div>
				<Card className="card" title='通知提醒框'>
					<Button type='primary' onClick={() => this.openNotification('success')}>success</Button>
					<Button type='primary' onClick={() => this.openNotification('info')}>info</Button>
					<Button type='primary' onClick={() => this.openNotification('warning')}>warning</Button>
					<Button type='primary' onClick={() => this.openNotification('error')}>error</Button>

				</Card>

				<Card className="card" title='通知提醒框'>
					<Button type='primary' onClick={() => this.openNotification('success','topLeft')}>topLeft</Button>
					<Button type='primary' onClick={() => this.openNotification('info', 'topRight')}>topRight</Button>
					<Button type='primary' onClick={() => this.openNotification('warning', 'bottomLeft')}>bottonLeft</Button>
					<Button type='primary' onClick={() => this.openNotification('error', 'bottomRight')}>error</Button>

				</Card>
			</div>
		)
	}
}