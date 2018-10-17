import React , { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'

// 按需加载echart
import echarts from 'echarts/lib/echarts'
// 柱形图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Line extends Component{
	componentWillMount(){
		echarts.registerTheme('barTheme', echartTheme)
	}
	getOption = () => {
		let  option = {
			title:{
				text: '访问量'
			},
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'访问量',
		            type:'line',
		            data:[10, 52, 200, 334, 390, 330, 220]
		        }
		    ]
		}
		return option
	}
	getOption2 = () => {
		let  option = {
			title:{
				text: '访问量'
			},
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    legend:{
				data: ['阿里','腾讯']
		    },
		    series : [
		        {
		            name:'阿里',
		            type:'line',
		            data:[10, 52, 200, 334, 390, 330, 520]
		        },{
		            name:'腾讯',
		            type:'line',
		            data:[30, 22, 200, 554, 312, 200, 600]
		        }
		    ]
		}
		return option
	}
	getOption3 = () => {
		let  option = {
			title:{
				text: '访问量'
			},
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap: false,
		            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    legend:{
				data: ['阿里']
		    },
		    series : [
		        {
		            name:'阿里',
		            type:'line',
		            data:[10, 52, 200, 334, 390, 330, 520],
		             areaStyle: {}
		        },

		    ]
		}
		return option
	}
	render(){
		return(
			<div>
				<Card title='折线图一' >
					<ReactEcharts option={this.getOption()} theme='barTheme' style={{height: 500}}/>
				</Card>
				<Card title='柱形图二' style={{marginTop: 20}}>
					<ReactEcharts option={this.getOption2()} theme='barTheme' style={{height: 500}}/>
				</Card>
				<Card title='柱形图三' style={{marginTop: 20}}>
					<ReactEcharts option={this.getOption3()} theme='barTheme' style={{height: 500}}/>
				</Card>
			</div>
		)
	}
}