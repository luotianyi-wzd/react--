import React , { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../themeLight'

// 按需加载echart
import echarts from 'echarts/lib/echarts'
// 饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class pie extends Component{
	componentWillMount(){
		echarts.registerTheme('barTheme', echartTheme)
	}
	getOption = () => {
		let  option = {
		    title : {
		        text: '数量统计',
		        subtext: '虚拟数据',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        type: 'scroll',
		        orient: 'vertical',
		        right: 10,
		        top: 20,
		        bottom: 20,
		        data: ['周一','周二','周三','周四','周五','周六','周日'],

		        // selected: data.selected
		    },
		    series : [
		        {
		            name: '姓名',
		            type: 'pie',
		            radius : '60%',
		            center: ['50%', '50%'],
		            data: [
		            	{
		            		name:'周一',
		            		value:10
		            	},{
		            		name:'周二',
		            		value:31
		            	},{
		            		name:'周三',
		            		value:23
		            	},{
		            		name:'周四',
		            		value:14
		            	},{
		            		name:'周五',
		            		value:24
		            	},{
		            		name:'周六',
		            		value:12
		            	},{
		            		name:'周日',
		            		value:33
		            	}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		return option
	}
	getOption2 = () => {
		let  option = {
		    title : {
		        text: '数量统计',
		        subtext: '虚拟数据',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        type: 'scroll',
		        orient: 'vertical',
		        right: 10,
		        top: 20,
		        bottom: 20,
		        data: ['周一','周二','周三','周四','周五','周六','周日'],

		        // selected: data.selected
		    },

		    series : [
		        {
		            name: '姓名',
		            type: 'pie',
		            radius: ['50%', '70%'],
		            center: ['50%', '50%'],

		            data: [
		            	{
		            		name:'周一',
		            		value:10
		            	},{
		            		name:'周二',
		            		value:31
		            	},{
		            		name:'周三',
		            		value:23
		            	},{
		            		name:'周四',
		            		value:14
		            	},{
		            		name:'周五',
		            		value:24
		            	},{
		            		name:'周六',
		            		value:12
		            	},{
		            		name:'周日',
		            		value:33
		            	}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		return option
	}
	getOption3 = () => {
		let  option = {
		    title : {
		        text: '数量统计',
		        subtext: '虚拟数据',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        type: 'scroll',
		        orient: 'vertical',
		        right: 10,
		        top: 20,
		        bottom: 20,
		        data: ['周一','周二','周三','周四','周五','周六','周日'],

		        // selected: data.selected
		    },

		    series : [
		        {
		            name: '姓名',
		            type: 'pie',
		           	data: [
		            	{
		            		name:'周一',
		            		value:10
		            	},{
		            		name:'周二',
		            		value:31
		            	},{
		            		name:'周三',
		            		value:23
		            	},{
		            		name:'周四',
		            		value:14
		            	},{
		            		name:'周五',
		            		value:24
		            	},{
		            		name:'周六',
		            		value:12
		            	},{
		            		name:'周日',
		            		value:33
		            	}
		            ].sort((a,b) => {
		            	return a.value - b.value
		            }),
		            roseType: 'radius',
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		return option
	}
	render(){
		return(
			<div>
				<Card title='饼图一' >
					<ReactEcharts option={this.getOption()} theme='barTheme' style={{height: 500}}/>
				</Card>
				<Card title='饼图二' style={{marginTop: 20}}>
					<ReactEcharts option={this.getOption2()} theme='barTheme' style={{height: 500}}/>
				</Card>
				<Card title='饼图三' style={{marginTop: 20}}>
					<ReactEcharts option={this.getOption3()} theme='barTheme' style={{height: 500}}/>
				</Card>
			</div>
		)
	}
}