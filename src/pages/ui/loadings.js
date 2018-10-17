import React, { Component } from 'react';
import { Card, Alert, Spin, Button  } from 'antd'
import './ui.less'

export default class Loadings extends Component {
	state = {
		spinning: true
	}
	handleToggle = () => {
		this.setState({
			spinning: !this.state.spinning
		})
	}
	render(){
		return(
			<div>
				<Card className="card" title='Loading'>
					<Spin size='small'/>
					<Spin style={{margin: '0 10px'}}/>
					<Spin size='large' />
				</Card>

				<Card className="card" title='Loading'>
					<Alert 
						type='success'
						message='请求成功了'
					/>

					<Spin  spinning={this.state.spinning}>
						<Alert 
							showIcon
							style={{margin: "10px 0"}}
							type='info'
							message='请求成功了'
						/>
					</Spin>
					<Button type='primary' onClick={this.handleToggle} > toggle</Button>
				</Card>
			</div>
		)
	}
}