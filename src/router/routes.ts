// 静态路由
export const constantRoute = [
	// 首页
	{
		path: '/home',
		name: 'home',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '首页',
			hidden: false,
			icon: 'Home'
		},
		redirect: '/home/sysview',
		children: [
			// 数据概览
			{
				path: '/home/sysview',
				name: 'sysview',
				component: () => import('@/views/home/sysview/index.vue'),
				meta: {
					title: '系统概览',
					hidden: false,
					icon: 'Histogram'
				}
			}
		]
	},
	// 404 页面
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: '404',
			hidden: true,
			icon: 'CircleCloseFilled'
		}
	},
	// 重定向
	{
		path: '/',
		redirect: '/login',
		meta: {
			title: '重定向',
			hidden: true,
			icon: 'Close'
		}
	},
	// 登陆页
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登陆',
			hidden: true,
			icon: 'House'
		}
	}
	// // 系统管理
	// {
	// 	path: '/admin',
	// 	name: 'admin',
	// 	component: () => import('@/layout/index.vue'),
	// 	meta: {
	// 		title: '系统管理',
	// 		hidden: false,
	// 		icon: 'Setting'
	// 	},
	// 	redirect: '/admin/organization',
	// 	children: [
	// 		{
	// 			path: '/admin/organization',
	// 			name: 'organization',
	// 			component: () => import('@/views/admin/organization/index.vue'),
	// 			meta: {
	// 				title: '组织管理',
	// 				hidden: false,
	// 				icon: 'OfficeBuilding'
	// 			}
	// 		},
	// 		{
	// 			path: '/admin/account',
	// 			name: 'account',
	// 			component: () => import('@/views/admin/account/index.vue'),
	// 			meta: {
	// 				title: '账户管理',
	// 				hidden: false,
	// 				icon: 'User'
	// 			}
	// 		},
	// 		{
	// 			path: '/admin/role',
	// 			name: 'role',
	// 			component: () => import('@/views/admin/role/index.vue'),
	// 			meta: {
	// 				title: '角色管理',
	// 				hidden: false,
	// 				icon: 'UserFilled'
	// 			}
	// 		},
	// 		{
	// 			path: '/admin/menu',
	// 			name: 'menu',
	// 			component: () => import('@/views/admin/menu/index.vue'),
	// 			meta: {
	// 				title: '菜单管理',
	// 				hidden: false,
	// 				icon: 'Grid'
	// 			}
	// 		},
	// 		{
	// 			path: '/admin/function',
	// 			name: 'function',
	// 			component: () => import('@/views/admin/function/index.vue'),
	// 			meta: {
	// 				title: '功能管理',
	// 				hidden: false,
	// 				icon: 'TurnOff'
	// 			}
	// 		}
	// 	]
	// }
];

// 异步路由
export const asnycRoute = [
	// 数据可视化
	{
		path: '/dataview',
		name: 'dataview',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '数据可视化',
			hidden: false,
			icon: 'DataLine'
		},
		redirect: '/dataview/dataDisplay',
		children: [
			// 数据大屏
			{
				path: '/dataview/datascreen',
				name: 'datascreen',
				component: () => import('@/views/dataview/datascreen/index.vue'),
				meta: {
					title: '数据大屏',
					hidden: false,
					icon: 'Odometer'
				}
			},
			// 数据看板
			{
				path: '/dataview/dashboard',
				name: 'dashboard',
				component: () => import('@/views/dataview/dashboard/index.vue'),
				meta: {
					title: '数据看板',
					hidden: false,
					icon: 'PieChart'
				}
			}
		]
	},
	//设备管理
	{
		path: '/device',
		name: 'device',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '设备管理',
			hidden: false,
			icon: 'Iphone'
		},
		redirect: '/device/deviceModel',
		children: [
			// 物模型列表
			{
				path: '/device/deviceModel',
				name: 'deviceModel',
				component: () => import('@/views/device/model/index.vue'),
				meta: {
					title: '物模型',
					hidden: false,
					icon: 'MessageBox'
				},
				children: [
					{
						path: '/device/deviceModel/detail',
						name: 'deviceModelDetail',
						component: () => import('@/views/device/model/detail/index.vue'),
						meta: {
							title: '物模型详情',
							hidden: true,
							icon: 'MessageBox'
						}
					},
					{
						path: '/device/deviceModel/addmodel',
						name: 'addDeviceModel',
						component: () => import('@/views/device/model/addmodel/index.vue'),
						meta: {
							title: '添加物模型',
							hidden: true,
							icon: 'MessageBox'
						}
					}
				]
			},
			// 设备
			{
				path: '/device/deviceAdmin',
				name: 'deviceAdmin',
				component: () => import('@/views/device/admin/index.vue'),
				meta: {
					title: '设备',
					hidden: false,
					icon: 'Monitor'
				}
			}
		]
	},
	//监控运维
	{
		path: '/operations',
		name: 'operations',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '监控运维',
			hidden: false,
			icon: 'DataLine'
		},
		redirect: '/operations/ota',
		children: [
			// 物模型
			{
				path: '/operations/ota',
				name: 'ota',
				component: () => import('@/views/about/index.vue'),
				meta: {
					title: 'OTA升级',
					hidden: false,
					icon: 'MessageBox'
				}
			},
			// 设备
			{
				path: '/about/about',
				name: 'deviceAdmin1',
				component: () => import('@/views/about/index.vue'),
				meta: {
					title: '设备',
					hidden: false,
					icon: 'Monitor'
				}
			}
		]
	},
	// 管理页面
	{
		path: '/admin',
		name: 'admin',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '系统管理',
			hidden: false,
			icon: 'Setting'
		},
		redirect: '/admin/organization',
		children: [
			{
				path: '/admin/organization',
				name: 'organization',
				component: () => import('@/views/admin/organization/index.vue'),
				meta: {
					title: '组织管理',
					hidden: false,
					icon: 'OfficeBuilding'
				}
			},
			{
				path: '/admin/account',
				name: 'account',
				component: () => import('@/views/admin/account/index.vue'),
				meta: {
					title: '账户管理',
					hidden: false,
					icon: 'User'
				}
			},
			{
				path: '/admin/role',
				name: 'role',
				component: () => import('@/views/admin/role/index.vue'),
				meta: {
					title: '角色管理',
					hidden: false,
					icon: 'UserFilled'
				}
			},
			{
				path: '/admin/menu',
				name: 'menu',
				component: () => import('@/views/admin/menu/index.vue'),
				meta: {
					title: '菜单管理',
					hidden: false,
					icon: 'Grid'
				}
			},
			{
				path: '/admin/function',
				name: 'function',
				component: () => import('@/views/admin/function/index.vue'),
				meta: {
					title: '功能管理',
					hidden: false,
					icon: 'TurnOff'
				}
			}
		]
	},
	// 功能页面
	{
		path: '/functions',
		name: 'functions',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '功能',
			hidden: false,
			icon: 'Operation'
		},
		redirect: '/functions/echarts',
		children: [
			// echarts
			{
				path: '/functions/echarts',
				name: 'echarts',
				meta: {
					title: 'Echarts',
					hidden: false,
					icon: 'PieChart'
				},
				redirect: '/functions/echarts/bar',
				children: [
					{
						path: '/functions/echarts/bar',
						name: 'bar',
						component: () => import('@/views/function/echarts/bar.vue'),
						meta: {
							title: '柱状图',
							hidden: false,
							icon: 'Histogram'
						}
					},
					{
						path: '/functions/echarts/line',
						name: 'line',
						component: () => import('@/views/function/echarts/line.vue'),
						meta: {
							title: '折线图',
							hidden: false,
							icon: 'DataLine'
						}
					},
					{
						path: '/functions/echarts/pie',
						name: 'pie',
						component: () => import('@/views/function/echarts/pie.vue'),
						meta: {
							title: '饼图',
							hidden: false,
							icon: 'PieChart'
						}
					},
					{
						path: '/functions/echarts/radar',
						name: 'radar',
						component: () => import('@/views/function/echarts/radar.vue'),
						meta: {
							title: '雷达图',
							hidden: false,
							icon: 'PieChart'
						}
					},
					{
						path: '/functions/echarts/map',
						name: 'map',
						component: () => import('@/views/function/echarts/map.vue'),
						meta: {
							title: '地图',
							hidden: false,
							icon: 'PieChart'
						}
					}
				]
			},

			// MQTT客户端
			{
				path: '/functions/mqttclient',
				name: 'mqttclient',
				component: () => import('@/views/function/mqtt/index.vue'),
				meta: {
					title: 'MQTT客户端',
					hidden: false,
					icon: 'Phone'
				}
			},
			// 打印功能
			{
				path: '/functions/print',
				name: 'print',
				component: () => import('@/views/function/print/index.vue'),
				meta: {
					title: '打印功能',
					hidden: false,
					icon: 'Printer'
				}
			}
		]
	},
	//关于页面
	{
		path: '/about',
		name: 'about',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: 'about',
			hidden: false,
			icon: 'Link'
		},
		redirect: '/about/about',
		children: [
			// 关于系统
			{
				path: '/about/about',
				name: 'about',
				component: () => import('@/views/about/index.vue'),
				meta: {
					title: '关于系统',
					hidden: false,
					icon: 'Link'
				}
			}
		]
	}
];

// 任意路由
export const anyRoute = [
	//  未知路由重定向
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'any',
		meta: {
			title: '其他',
			hidden: true,
			icon: 'QuestionFilled'
		}
	}
];
