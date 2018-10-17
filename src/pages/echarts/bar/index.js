import React , { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'

// 按需加载echart
import echarts from 'echarts/lib/echarts'
// 柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component{
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
		            axisTick: {
		                alignWithLabel: true
		            }
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
		            type:'bar',
		            
		            data:[10, 52, 200, 334, 390, 330, 220]
		        }
		    ]
		}
		return option
	}
	getOption2 = () => {
		let  option = {
			title:{
				text: '对比图'
			},
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend:{
				data: ['腾讯','阿里','百度']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'腾讯',
		            type:'bar',
		            data:[123, 41, 200, 334, 390, 330, 220]
		        },{
		            name:'阿里',
		            type:'bar',
		            data:[561, 52, 11, 334, 33, 330, 124]
		        },{
		            name:'百度',
		            type:'bar',
		            data:[10, 52, 2, 331, 11, 220, 420]
		        }
		    ]
		}
		return option
	}
	render(){
		return(
			<div>
				<Card title='柱形图一' >
					<ReactEcharts option={this.getOption()} theme='barTheme' style={{height: 500}}/>
				</Card>
				<Card title='柱形图二' style={{marginTop: 20}}>
					<ReactEcharts option={this.getOption2()} theme='barTheme' style={{height: 500}}/>
				</Card>
			</div>
		)
	}
}