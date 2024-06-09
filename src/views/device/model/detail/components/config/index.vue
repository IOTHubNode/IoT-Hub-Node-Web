<template>
	<div class="remove-device-container">
		<h3>推送模型至在线库</h3>
		<p>
			将设备类型作为产品模板，发布到平台公共模型库。 其他用户在创建设备类型时，可通过物模型
			ID，快速创建该设备类型。
		</p>
		<el-button type="primary">推送</el-button>
	</div>
	<div class="remove-device-container">
		<h3>设备自注册</h3>
		<p>设备通过一型一密方式连接平台时，可支持自动创建设备。</p>
		<el-button type="primary">设置</el-button>
	</div>
	<div class="remove-device-container">
		<h3>移除设备</h3>
		<p>仅当设备类型没有绑定的设备时，才可以移除。</p>
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
