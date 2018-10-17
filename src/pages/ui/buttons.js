import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd'
import './ui.less'
class Buttons extends Component {
	
	state = {
		loading: true,
		size: 'default'
	}

	handleLoading = () => {
		this.setState({
			loading: !this.state.loading
		})
	}
	handleChange = (e) => {
		this.setState({
			size: e.target.value
		})
	}
  render() {
  	let text = this.state.loading ? '关闭' : '启动'
    return (
      <div>
       	<Card title='基础按钮' className='card'>
       		<Button type='primary'>primary</Button>
       		<Button type='default' disabled>default</Button>
       		<Button type='danger'>danger</Button>
       		<Button type='dashed'>dashed</Button>
       	</Card>

       	<Card title='图形按钮' className='card'>
       		<Button type='primary' icon='plus'>新建</Button>
       		<Button icon='delete'>删除</Button>
       		<Button icon='edit'>编辑</Button>
       		<Button type='dashed' icon='search'>搜索</Button>
       		<Button icon='download'>下载</Button>
       	</Card>

       	<Card title='Loading按钮' className='card'>
       		<Button type='primary' icon='plus' loading={this.state.loading}>确定</Button>
       		<Button type='primary' icon='search' shape='circle' loading={this.state.loading}></Button>
       		<Button icon='delete' loading={this.state.loading}>加载</Button>
       		<Button type='dashed' icon='search' loading={this.state.loading}>搜索</Button>
       		<Button onClick={this.handleLoading}>{text}</Button>
       	</Card>

       	<Card title='按钮组' className='card'>
       		<Button.Group>
       			<Button type='primary' icon='left' style={{marginRight: 0}}>go</Button>
       			<Button type='primary' icon='right'>back</Button>
       		</Button.Group>
       	</Card>

       	<Card title='按钮尺寸' className='card'>
       		<Radio.Group value={this.state.size} onChange={this.handleChange}>
       			<Radio value='small'>小</Radio>
       			<Radio value='default'>中</Radio>
       			<Radio value='large'>大</Radio>
       		</Radio.Group>
       		<Button type='primary' size={this.state.size}>primary</Button>
       		<Button type='default' size={this.state.size} disabled>default</Button>
       		<Button type='danger' size={this.state.size}>danger</Button>
       		<Button type='dashed'>dashed</Button>
       	</Card>
      </div>
    );
  }
}

export default Buttons;
