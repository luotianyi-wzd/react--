import React, { Component } from 'react';

export default class Child extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount(){
		console.log('will mount')
	}

	componentDidMount(){
		console.log('did mount')
	}

	componentWillReceiveProps(newProps){
		console.log('will props:' + newProps.count)
	}

	shouldComponentUpdate(){
		console.log('should update')
		return true
	}

	componentWillUpdate(){
		console.log('will update')
	}

	componentDidUpdate(){
		console.log('did update')
	}

	render(){
		return <div>
			<p>{this.props.count}</p>
		</div>
	}
}