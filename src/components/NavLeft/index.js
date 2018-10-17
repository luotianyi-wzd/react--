import React, { Component } from 'react';
import { Menu } from 'antd';
import menuList from './../../config/menuConfig'
import './index.less'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
const SubMenu = Menu.SubMenu;

class NavLeft extends Component {
	state = {
		currentKey: ''
	}
	componentWillMount() {
		const menuTree = this.renderMenu(menuList)
		let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
		if (currentKey == '/') {currentKey = '/home'}
		this.setState({
			menuTree,
			currentKey
		})
	}
	handleClick = ({item, key}) => {
		const { dispatch } = this.props
		dispatch(switchMenu(item.props.title))
		this.setState({
			currentKey: key
		})
	}
	// 菜单渲染
	renderMenu = (data) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<SubMenu key={item.key} title={item.title}>
						{this.renderMenu(item.children)}
					</SubMenu>
				)
			}
			return <Menu.Item key={item.key} title={item.title}>
				<NavLink to={item.key}>{item.title}</NavLink>
			</Menu.Item>
		})
	}
	render() {
		
		return (
		  <div>
		  <div className="logo">
		  	<img src="" alt=""/>
		  	<h1>管理员</h1>
		  </div>
		   	<Menu
		   		onClick={this.handleClick}
				selectedKeys={this.state.currentKey}
		   		theme='dark'
		   	>
				{this.state.menuTree}
		   	</Menu>
		  </div>
		);
	}
}

export default connect()(NavLeft);
