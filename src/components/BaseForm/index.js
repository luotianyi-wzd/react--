import React , { Component } from 'react'
import { Input, Radio, Select, Form, Checkbox, DatePicker, Button} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
class BaseForm extends Component{
	state = {

	}
	handleSearch = () => {
		let fieldsValue = this.props.form.getFieldsValue();
		this.props.filterSubmit(fieldsValue)
	}
	handleReset = () => {
	    this.props.form.resetFields()
	  }
	initFormItemList = () => {
		const { getFieldDecorator } = this.props.form
		const formList = this.props.formList
		const formArr = []
		formList.forEach((item, index) => {
			let label = item.label
			let filed = item.filed
			let placeholder = item.placeholder
			let width = item.width
			let list = item.list
			if (item.type == 'SELECT') {
				const SELECT = <FormItem label={label} key={filed}>
					{
		              getFieldDecorator(filed,{

		              })(
		                <Select
		                  style={{width: width}}
		                  placeholder={placeholder}
		                >
		                   	{list.map((i) => {
		                  		return <Option value={i.id} key={i.id}>{i.name}</Option>
		                  	})}
		                </Select>
		              )
		            }
				</FormItem>
				formArr.push(SELECT)
			} else if (item.type == 'INPUT') {
				const INPUT = <FormItem label={label} key={filed}>
					{
		              getFieldDecorator([filed], {

		              })(
		                <Input type='text' placeholder={placeholder}/>
		              )
		            }
				</FormItem>
				formArr.push(INPUT)
			} else if (item.type == 'CHECKBOX') {
				const CHECKBOX = <FormItem label={label} key={filed}>
					{
		              getFieldDecorator([filed], {
						valuePropName: 'checked'
		              })(
		                <Checkbox>
		                	{label}
		                </Checkbox>
		              )
		            }
				</FormItem>
				formArr.push(CHECKBOX)
			} else if (item.type == '订单时间') {
				const start_time = <FormItem label='订单时间' key='start_time'>
					{
		              getFieldDecorator('state_time')(
		                <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' /> 
		              )
		            }
				</FormItem>
				formArr.push(start_time)
				const end_time = <FormItem label='~' key='end_time' colon={false}>
					{
		              getFieldDecorator('end_time')(
		                <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' /> 
		              )
		            }
				</FormItem>
				formArr.push(end_time)
			} else if (item.type == 'DATEPICKER') {
				const DATEPICKER = <FormItem label={label} key={filed}>
					{
		              getFieldDecorator([filed])(
		                <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' /> 
		              )
		            }
				</FormItem>
				formArr.push(DATEPICKER)
			}
		})
		return formArr
	}
	render(){
		return(
			<div>
				<Form layout='inline'>
					{this.initFormItemList()}
					<FormItem>
						<Button type='primary' style={{margin:'0 20px'}} onClick={this.handleSearch}>查询</Button>
            			<Button onClick={this.handleReset}>重置</Button>
					</FormItem>
				</Form>
			</div>
		)
	}
}

export default Form.create({})(BaseForm)