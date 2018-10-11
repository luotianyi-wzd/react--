import React, { Component } from 'react';
import Child from './Child'

export default class Life extends Component {
	constructor(props) {
		super(props)
		this.state = {
			count: 0,
			name: 'jack'
		}
	}
	handleClick = () => {
		this.setState({
			count: this.state.count + 1
		})
	}
	render(){
		return <div>
			<p>生命周期</p>
			<button onClick={this.handleClick}>点击</button>
			<p>{this.state.count}</p>

			<Child count={this.state.count}/>
		</div>
	}
}