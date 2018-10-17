import React, { Component } from 'react'
import { Card } from 'antd'
import Axios from './../../axios'
import './index.less'
export default class OrderDetail extends Component {
	state = {
		orderInfo:{}
	}
	componentDidMount(){
		let orderId = this.props.match.params.id
		if (orderId) { this.getData(orderId) }
		
	}
	getData(orderId){
		Axios.ajax({
			url: '/order/detail',
			data: {
				params: {
					orderId: orderId
				}
			}
		}).then((res) => {
			console.log(res,'ressss')
			this.setState({
				orderInfo: res.result
			})
		})
	}
	render(){
		const info = this.state.orderInfo
		return(
			<div className='order-wrap'>
				<Card className='card-wrap'>
					<div className='order-title'>基础信息</div>
					<ul className='order-detail'>
						<li>
							<span className='detail-form-left'>用车模式</span>
							<span className='detail-form-content'>{ info.mode == 2 ? '服务区' : '指定点'}</span>
						</li>
						<li>
							<span className='detail-form-left'>订单编号</span>
							<span className='detail-form-content'>{info.order_sn}</span>
						</li>
						<li>
							<span className='detail-form-left'>车辆编号</span>
							<span className='detail-form-content'>{info.bike_sn}</span>
						</li>
						<li>
							<span className='detail-form-left'>用户姓名</span>
							<span className='detail-form-content'>{info.user_name}</span>
						</li>
						<li>
							<span className='detail-form-left'>用户电话</span>
							<span className='detail-form-content'>{info.mobile}</span>
						</li>
					</ul>
				</Card>

				<Card className='card-wrap'>
					<div className='order-title'>行驶轨迹</div>
					<ul className='order-detail'>
						<li>
							<span className='detail-form-left'>行程起点</span>
							<span className='detail-form-content'>{info.start_location}</span>
						</li>
						<li>
							<span className='detail-form-left'>行程终点</span>
							<span className='detail-form-content'>{info.end_location}</span>
						</li>
						<li>
							<span className='detail-form-left'>行驶里程</span>
							<span className='detail-form-content'>{info.distance/1000}公里</span>
						</li>
					</ul>
				</Card>
			</div>
		)
	}
}