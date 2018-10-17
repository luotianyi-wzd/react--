import React, { Component } from 'react';
import { Row, Col } from 'antd'
import Header from './components/Header'

import './style/common.less'
export default class Common extends Component {
	render() {
		return(
			<div>
				<Row className='simple-page'>
					<Col span='24'>
						<Header menuType='true'/>
					</Col>
					
				</Row>
				<Row className='content'>
					{this.props.children}
				</Row>
			</div>
		)
	}
}