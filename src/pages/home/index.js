import React, { Component } from 'react'
import './index.less'
import { Card } from 'antd'
export default class Home extends Component {
	render(){
		return(
			<div>
				<Card title='后台管理系统' style={{height:650}}>
					<h1>技术栈</h1>
					<p className='text'>react+antd+webpack+react-router-redex-echarts+ES6</p>
					<p className='text'><a href="https://github.com/luotianyi-wzd/react---management" target="_blank">github地址</a></p>
				</Card>

			</div>
		)
	}
}
