<template>
	<div class="remove-device-container">
		<h3>设备二维码生成</h3>
		<p>将设备码贴在外包装或产品手册中，用户可在 App 中通过设备码主动添加设备。</p>
		<el-button type="primary">设置</el-button>
	</div>
	<div class="remove-device-container">
		<h3>移除设备</h3>
		<p>设备移除后无法恢复。 设备无上报数据超过24小时后，可以移除设备。</p>
		<el-button type="danger" class="remove-button">移除物模型</el-button>
	</div>
</template>
<script setup lang="ts">
// 获取父组件数据
defineProps(['DeviceModelID']);
</script>

<style scoped lang="scss">
.remove-device-container {
	padding: 20px;
	border-radius: 8px;

	h3 {
		font-size: 1.4em;
		font-weight: bold;
		margin-bottom: 10px;
	}

	p {
		font-size: 1em;
		margin-bottom: 10px;
	}

	.remove-button {
		font-size: 1.2em;
		padding: 5px 20px;
		border-radius: 4px;
	}
}
</style>
