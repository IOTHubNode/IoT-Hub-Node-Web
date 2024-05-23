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
								<el-statistic :value="145">
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
								<el-statistic :value="500">
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
								<el-statistic :value="85">
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
								<el-statistic :value="123">
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
import { onMounted } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
// 导入Echarts
import * as echarts from 'echarts';

/// 声明定义一下echart
let echart = echarts;

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
					{ value: 1048, name: '直连设备' },
					{ value: 735, name: '网关设备' },
					{ value: 580, name: '网关子设备' }
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
				color: ['#5470C6', '#91CC75'],
				data: [
					{ value: 1000, name: '在线设备' },
					{ value: 1000, name: '离线设备' }
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
					{ value: 840, name: '5分钟内' },
					{ value: 400, name: '1小时内' },
					{ value: 300, name: '24小时内' },
					{ value: 300, name: '1周内' }
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
			data: ['北京', '上海', '陕西', '甘肃', '山东', '四川', '山西']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [2120, 2200, 1150, 1301, 701, 1110, 1130],
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
			data: [
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
			]
		},
		tooltip: {
			trigger: 'axis'
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [
					11820, 91132, 91101, 93114, 121190, 111330, 131120, 18101, 11102, 21130, 11321, 11129
				],
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

// 组件挂载完成
onMounted(() => {
	initChart();
});
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
