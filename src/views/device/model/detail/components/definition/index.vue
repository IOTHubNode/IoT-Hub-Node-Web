<template>
	<div>
		<el-collapse accordion>
			<el-collapse-item>
				<template #title>
					<div style="font-size: large">属性</div>
					<el-icon class="header-icon">
						<info-filled />
					</el-icon>
				</template>
				<div>
					用于描述设备运行时的状态，分为可读写和只读属性，比如温度传感器所读取的环境温度或者是插座的开关状态
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
	<div>
		<el-collapse accordion>
			<el-collapse-item>
				<template #title>
					<div style="font-size: large">方法</div>
					<el-icon class="header-icon">
						<info-filled />
					</el-icon>
				</template>
				<div>
					用于描述设备运行时的状态，分为可读写和只读属性，比如温度传感器所读取的环境温度或者是插座的开关状态
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
	<div>
		<el-collapse accordion>
			<el-collapse-item>
				<template #title>
					<div style="font-size: large">事件</div>
					<el-icon class="header-icon">
						<info-filled />
					</el-icon>
				</template>
				<div>
					用于描述设备运行时的状态，分为可读写和只读属性，比如温度传感器所读取的环境温度或者是插座的开关状态
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>

	<div>{{ DeviceModelID }}</div>
</template>

<script setup lang="ts">
// 获取父组件数据
defineProps(['DeviceModelID']);
</script>

<style scoped lang="scss"></style>
