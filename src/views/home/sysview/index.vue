<template>
	<el-scrollbar height="650px">
		<el-card>
			<!-- 头部概览 -->
			<el-row :gutter="20" style="margin-bottom: 20px">
				<el-col :span="6">
					<el-card class="top-card">
						<div style="display: flex">
							<div style="display: flex; align-items: center">
								<!-- <el-icon size="80"><HelpFilled /></el-icon> -->
								<SvgIcon name="models" width="80px" height="80px"></SvgIcon>
							</div>
							<div class="statistic-card">
								<el-statistic :value="SysInfo.NumberModels">
									<template #title>
										<div style="display: inline-flex; align-items: center; font-size: 18px">
											物模型数量
											<el-tooltip
												effect="dark"
												content="本地模型数量与云端物模型数量综合"
												placement="top">
												<el-icon style="margin-left: 4px" :size="12">
													<Warning />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card class="top-card">
						<div style="display: flex">
							<div style="display: flex; align-items: center">
								<SvgIcon name="all-devices" width="80px" height="80px"></SvgIcon>
							</div>
							<div class="statistic-card">
								<el-statistic :value="SysInfo.NumberDevices">
									<template #title>
										<div style="display: inline-flex; align-items: center; font-size: 18px">
											总设备数
											<el-tooltip
												effect="dark"
												content="本系统注册的所有设备,不包括删除项"
												placement="top">
												<el-icon style="margin-left: 4px" :size="12">
													<Warning />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card class="top-card">
						<div style="display: flex">
							<div style="display: flex; align-items: center">
								<SvgIcon name="on-line-devices" width="80px" height="80px"></SvgIcon>
							</div>
							<div class="statistic-card">
								<el-statistic :value="SysInfo.NumberOnlineDevices">
									<template #title>
										<div style="display: inline-flex; align-items: center; font-size: 18px">
											在线设备数
											<el-tooltip effect="dark" content="1分钟内在线设备数量" placement="top">
												<el-icon style="margin-left: 4px" :size="12">
													<Warning />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card class="top-card">
						<div style="display: flex">
							<div style="display: flex; align-items: center">
								<SvgIcon name="warning-devices" width="80px" height="80px"></SvgIcon>
							</div>
							<div class="statistic-card">
								<el-statistic :value="SysInfo.NumberAlarmDevices">
									<template #title>
										<div style="display: inline-flex; align-items: center; font-size: 18px">
											告警设备数
											<el-tooltip effect="dark" content="24小时内设备告警数" placement="top">
												<el-icon style="margin-left: 4px" :size="12">
													<Warning />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
								</el-statistic>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<!-- 中部图表1&2 -->
			<el-row :gutter="20" style="margin-bottom: 20px">
				<el-col :span="8">
					<el-card>
						<div class="echarts-box">
							<div id="Echarts-1" :style="{ width: '100%', height: '100%' }"></div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card>
						<div class="echarts-box">
							<div id="Echarts-2" :style="{ width: '100%', height: '100%' }"></div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card>
						<div class="echarts-box">
							<div id="Echarts-3" :style="{ width: '100%', height: '100%' }"></div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<!-- 中部图表3&4 -->
			<el-row :gutter="20" style="margin-bottom: 20px">
				<el-col :span="12">
					<el-card>
						<div class="echarts-box">
							<div id="Echarts-4" :style="{ width: '100%', height: '100%' }"></div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card>
						<div class="echarts-box">
							<div id="Echarts-5" :style="{ width: '100%', height: '100%' }"></div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<!-- 底部其他 -->
		</el-card>
	</el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import SvgIcon from '@/components/SvgIcon/index.vue';
// 导入Echarts
import * as echarts from 'echarts';
import { getSysInfo } from '@/api/home/sysview';

/// 声明echart
let echart = echarts;

// 定义数据
let SysInfo = reactive({
	NumberModels: 30,
	// 设备数
	NumberDevices: 20,
	NumberOnlineDevices: 10,
	NumberAlarmDevices: 10,
	DevicesType: [10, 10, 10],
	DeviceStatus: [10, 10, 10],
	DeviceActivityRate: [10, 10, 10, 10],
	DeviceAddressStatistics: {
		X: ['北京', '上海', '陕西', '甘肃', '山东', '四川', '山西'],
		Y: [2120, 2200, 1150, 1301, 701, 1110, 1130]
	},
	MessageNumberStatistics: {
		X: [
			'一月',
			'二月',
			'三月',
			'四月',
			'五月',
			'六月',
			'七月',
			'八月',
			'九月',
			'十月',
			'十一月',
			'十二月'
		],
		Y: [11820, 91132, 91101, 93114, 121190, 111330, 131120, 18101, 11102, 21130, 11321, 11129]
	}
});

// 获取数据
const getData = () => {
	// 请求API
	getSysInfo()
		.then((res) => {
			console.log(res);
			// 更新 SysInfo 的属性
			Object.assign(SysInfo, res.data);
			// 初始化图表
			initChart();
		})
		.catch((err) => {
			// 弹窗
			ElMessage.error('获取物模型数据失败', err);
		});
};

// 组件挂载完成
onMounted(() => {
	// 获取数据
	getData();
});

// 图表函数
const initChart = () => {
	let chart = echart.init(document.getElementById('Echarts-1'));
	// 把配置和数据放这里
	chart.setOption({
		title: {
			text: '设备类型'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: 'bottom',
			left: 'center'
		},
		series: [
			{
				name: '设备类型',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [
					{ value: SysInfo.DevicesType[0], name: '直连设备' },
					{ value: SysInfo.DevicesType[1], name: '网关设备' },
					{ value: SysInfo.DevicesType[2], name: '网关子设备' }
				]
			}
		]
	});
	window.onresize = function () {
		//自适应大小
		chart.resize();
	};

	chart = echart.init(document.getElementById('Echarts-2'));
	// 把配置和数据放这里
	chart.setOption({
		title: {
			text: '设备状态'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: 'bottom',
			left: 'center'
		},
		series: [
			{
				name: '设备状态',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				color: ['#91CC75', '#5470C6', '#EE6666'],
				data: [
					{ value: SysInfo.DeviceStatus[0], name: '在线设备' },
					{ value: SysInfo.DeviceStatus[1], name: '离线设备' },
					{ value: SysInfo.DeviceStatus[2], name: '异常设备' }
				]
			}
		]
	});
	window.onresize = function () {
		//自适应大小
		chart.resize();
	};

	chart = echart.init(document.getElementById('Echarts-3'));
	// 把配置和数据放这里
	chart.setOption({
		title: {
			text: '设备活跃率'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: 'bottom',
			left: 'center'
		},
		series: [
			{
				name: '设备活跃率',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [
					{ value: SysInfo.DeviceActivityRate[0], name: '5分钟内' },
					{ value: SysInfo.DeviceActivityRate[1], name: '1小时内' },
					{ value: SysInfo.DeviceActivityRate[2], name: '24小时内' },
					{ value: SysInfo.DeviceActivityRate[3], name: '1周内' }
				]
			}
		]
	});
	window.onresize = function () {
		//自适应大小
		chart.resize();
	};

	chart = echart.init(document.getElementById('Echarts-4'));
	// 把配置和数据放这里
	chart.setOption({
		title: {
			text: '设备分布'
		},
		xAxis: {
			type: 'category',
			data: SysInfo.DeviceAddressStatistics.X
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: SysInfo.DeviceAddressStatistics.Y,
				type: 'bar'
			}
		]
	});
	window.onresize = function () {
		//自适应大小
		chart.resize();
	};

	chart = echart.init(document.getElementById('Echarts-5'));
	// 把配置和数据放这里
	chart.setOption({
		title: {
			text: '设备消息量'
		},
		xAxis: {
			type: 'category',
			data: SysInfo.MessageNumberStatistics.X
		},
		tooltip: {
			trigger: 'axis'
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: SysInfo.MessageNumberStatistics.Y,
				type: 'line',
				smooth: true
			}
		]
	});
	window.onresize = function () {
		//自适应大小
		chart.resize();
	};
};
</script>

<style scoped lang="scss">
:global(h2#card-usage ~ .example .example-showcase) {
	background-color: var(--el-fill-color) !important;
}

// 顶部概览数据
.top-card {
	// 元素水平分布
	display: flex;
	justify-content: space-between;
}

// 图表容器大小
.echarts-box {
	width: 100%;
	height: 250px;
}

.el-statistic {
	--el-statistic-content-font-size: 28px;
}

.statistic-card {
	height: 100%;
	padding: 20px;
	border-radius: 4px;
	background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	font-size: 12px;
	color: var(--el-text-color-regular);
	margin-top: 16px;
}

.statistic-footer .footer-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.statistic-footer .footer-item span:last-child {
	display: inline-flex;
	align-items: center;
	margin-left: 4px;
}

.green {
	color: var(--el-color-success);
}
.red {
	color: var(--el-color-error);
}
</style>
