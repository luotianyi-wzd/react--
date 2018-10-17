const menuList = [
	{
		title: '首页',
		key: '/home'
	},
	{
		title: 'UI',
		key: '/ui',
		children: [
			{
				title: '按钮',
				key: '/ui/buttons'
			},
			{
				title: '弹窗',
				key: '/ui/modals'
			},
			{
				title: 'Loading',
				key: '/ui/loadings'
			},
			{
				title: '通知提醒框',
				key: '/ui/notification'
			},
			{
				title: '全局提示框',
				key: '/ui/messages'
			},
			{
				title: 'Tab标签页',
				key: '/ui/tabs'
			},
			{
				title: '图片画廊',
				key: '/ui/gallery'
			}
		]
	},
	{
		title: '表单',
		key: '/form',
		children: [
			{
				title: '登陆',
				key: '/form/formLogin'
			},
			{
				title: '注册',
				key: '/form/register'
			}
		]
	},
	{
		title: '表格',
		key: '/table',
		children: [
			{
				title: '基础表格',
				key: '/table/baseTables'
			},
			{
				title: '高级表格',
				key: '/table/highTables'
			}
		]
	},
	{
		title: '城市管理',
		key: '/city',
	},
	{
		title: '订单信息',
		key: '/order',
	},
	{
		title: '职员信息',
		key: '/user',
	},
	{
		title: '图表',
		key: '/echarts',
		children: [
			{
				title: '柱形图',
				key: '/echarts/bar'
			},
			{
				title: '饼图',
				key: '/echarts/pie'
			},
			{
				title: '折线图',
				key: '/echarts/line'
			}
		]
	},
	{
		title: '富文本',
		key: '/rich',
	},
	{
		title: '权限管理',
		key: '/role',
	}
]

export default menuList
