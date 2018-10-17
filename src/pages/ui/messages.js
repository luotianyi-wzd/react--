import React, { Component } from 'react';
import { Card, message, Button  } from 'antd'
import './ui.less'

export default class Notifications extends Component {
	openMessage = (type) => {
		message[type]('成功了')
	}
	render(){
		return(
			<div>
				<Card className="card" title='全局提示框'>
					<Button type='primary' onClick={() => this.openMessage('success')}>success</Button>
					<Button type='primary' onClick={() => this.openMessage('info')}>info</Button>
					<Button type='primary' onClick={() => this.openMessage('warning')}>warning</Button>
					<Button type='primary' onClick={() => this.openMessage('error')}>error</Button>
					<Button type='primary' onClick={() => this.openMessage('loading')}>loading</Button>

				</Card>
			</div>
		)
	}
}