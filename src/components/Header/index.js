import React, { Component } from 'react';
import { Row, Col} from 'antd'
import './index.less'
import Util from '../../utils/utils'
import Axios from '../../axios/'
import { connect } from 'react-redux'
 class Header extends Component {
 	state = {}
	componentWillMount(){
		this.setState({
			username: '管理员'
		})
		setInterval(() => {
			let sysTime = Util.formateDate(new Date().getTime())
			this.setState({
				sysTime
			})
		}, 1000)
		this.getWeatherAPIData();
	}
	getWeatherAPIData(){
		let city = '杭州'
		Axios.jsonp({
			url: 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
		}).then((res) => {
			this.setState({
				weather: res.results[0].weather_data[0].weather,
				dayPictureUrl: res.results[0].weather_data[0].dayPictureUrl
			})
		})
	}
	hanldeLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('retData')
       window.open(`/#/login`, '_self')
	}
	render() {
		const {menuType, menuName} = this.props
		
		return(
			<div className='header'>
				<Row className='header-top'>
					{
						menuType ? 
							<Col span='6' className='logo'>
								<img src="" alt=""/>
								<span>订单详情页</span>
							</Col> : ''
					}
					<Col span={menuType ? 18 : 24}>
						<span>欢迎, {this.state.username}</span>
						{menuType ? '' : <a href="#" onClick={this.hanldeLogout}>退出</a>}
						
					</Col>
				</Row>

				{
					menuType ? '' : 
					<Row className='breadcrumb'>
						<Col span='4' className='breadcrumb-title'>
							{menuName}
						</Col>
						<Col span='20' className='weather'>
							<span className='date'>{this.state.sysTime}</span>
							<span className="weather-img">
								<img src={this.state.dayPictureUrl} alt=""/>
							</span>
							<span className='weather-detail'>{this.state.weather}</span>
						</Col>
					</Row>
				}
				
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		menuName: state.menuName
	}
}
export default connect(mapStateToProps)(Header)
