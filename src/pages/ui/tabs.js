import React, { Component } from 'react';
import { Card, message, Tabs, Icon  } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane
 const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
    ];
export default class Tab extends Component {
	newTabIndex = panes.length + 1;
	state = {
		activeKey: '1',

	}
	
	componentWillMount(){
		this.setState({
			panes
		})
	}
	handleChange = (key) => {
		message.info('切换到了:第' + key + '页')
	}
	onChange = (activeKey) => {
		this.setState({
			activeKey
		})
	}
	onEdit = (targetKey, action) => {
	    this[action](targetKey);
	}
	add = () => {

	    const panes = this.state.panes;
	    const activeKey = `${this.newTabIndex++}`;
	    panes.push({ title: 'Tab '+ activeKey, content: 'Content of new Tab', key: activeKey });
	    this.setState({ panes, activeKey });
	}

	remove = (targetKey) => {
	    let activeKey = this.state.activeKey;
	    let lastIndex;
	    this.state.panes.forEach((pane, i) => {
	      if (pane.key === targetKey) {
	        lastIndex = i - 1;
	      }
	    });
	    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
	    if (lastIndex >= 0 && activeKey === targetKey) {
	      activeKey = panes[lastIndex].key;
	    }
	    this.setState({ panes, activeKey });
	}
	render(){
		return(
			<div>
				<Card className="card">
					<Tabs>
						<TabPane tab='Tab 1' key='1'>第一页</TabPane>
						<TabPane tab='Tab 2' key='2'>第二页</TabPane>
						<TabPane tab='Tab 3' key='3'>第三页</TabPane>
					</Tabs>
				</Card>
				<Card className="card">
					<Tabs  defaultActiveKey="1" onChange={this.handleChange}>
						<TabPane tab={<span><Icon type='plus'/>Tab 1</span>} key='1'>第一页</TabPane>
						<TabPane tab={<span><Icon type='delete'/>Tab 2</span>} key='2'>第二页</TabPane>
						<TabPane tab={<span><Icon type='edit'/>Tab 3</span>} key='3'>第三页</TabPane>
					</Tabs>
				</Card>

				<Card className="card">
					<Tabs
						type="editable-card"
						onChange={this.onChange}
        				activeKey={this.state.activeKey}
        				onEdit={this.onEdit}
					>
						{
							this.state.panes.map((pane) => {
								return <TabPane
									tab={pane.title}
									key={pane.key}

								>{pane.content}</TabPane>
							})
						}
					</Tabs>
				</Card>
			</div>
		)
	}
}