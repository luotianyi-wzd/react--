import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd'

class Gallery extends Component {
	state = {
		imgModal:false
	}
  handleClick = (value) => {
		this.setState({
			imgModal: true,
			img:value
		})
  }
  render() {
  	const imgs = [
  		['1.png','2.png','3.png','4.png','5.png'],
  		['6.png','7.png','8.png','9.png','10.png'],
  		['11.png','12.png','13.png','14.png','15.png'],
  		['16.png','17.png','18.png','19.png','20.png'],
  	]
  	const imgList = imgs.map((list) => list.map((item) =>
	  		<Card cover={<img src={'/gallery/'+ item}/>}  style={{marginBottom: 20}} onClick={() => this.handleClick('/gallery/'+ item)}>
	  			<Card.Meta title= '图片' />
	  		</Card>
  		)
  	)
    return (
    	<div>
	    	<Row gutter={20}>
	    		<Col md={6}>
	    			{imgList[0]}
	    		</Col>
	    		<Col md={6}>
	    			{imgList[1]}
	    		</Col>
	    		<Col  md={6}>
	    			{imgList[2]}
	    		</Col>
	    		<Col md={6}>
	    			{imgList[3]}
	    		</Col>
	    	</Row>
    		<Modal
    			visible={this.state.imgModal}
    			title='图片画廊'
    			width={500}
    			footer={false}
    			style={{top: 20}}
    			onCancel={() => 
    				this.setState({
    					imgModal:false
    				})
    			}
    		>
    			<img src={this.state.img} alt="" style={{width: '100%'}}/>
    		</Modal>
    	</div>
    );
  }
}

export default Gallery;
