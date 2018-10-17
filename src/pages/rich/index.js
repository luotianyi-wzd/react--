import React , { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
export default class Rich extends Component{
	state = {
		editorState: '',
		show:false
	}
	onEditorStateChange = (editorState) => {
	    this.setState({
	      editorState,

	    })
	}
	handleClear = () => {
		this.setState({
	      editorState: '',
	      contentState: ''
	    })
	}
	onContentStateChange = (contentState) => {
	    this.setState({
	      contentState,
	    });
	};
	handleShow = () => {
		this.setState({
			show: true
		})
	}
	render(){
		return(
			<div>
				<Card>
					<Button type='primary' style={{marginRight: 10}} onClick={this.handleClear}>清空内容</Button>
					<Button type='primary' onClick={this.handleShow}>获取HTML</Button>
				</Card>
				<Card title='富文本' style={{height: 700}}>
					<Editor
						  editorState={this.state.editorState}
						  onContentStateChange={this.onContentStateChange}
						  onEditorStateChange={this.onEditorStateChange}
					/>
				</Card>
				<Modal
					visible={this.state.show}
					title='html文本'
					onCancel={() => {
						this.setState({
							show: false
						})
					}}
					footer={false}
				>
					{draftToHtml(this.state.contentState)}
				</Modal>
			</div>
		)
	}
}