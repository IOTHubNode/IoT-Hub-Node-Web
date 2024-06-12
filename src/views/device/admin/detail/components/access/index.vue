<template>
	<div class="title">
		<h3>设备通行证</h3>
		<p>每个设备拥有唯一的deviceID和deviceToken，在设备连接云平台进行身份验证时使用。</p>
		<p>设备通行证有效期为永久，请妥善保存</p>
		<el-button @click="Button(`${props.DeviceID}-${props.ModelID}`)">复制deviceID</el-button>
		<el-button @click="Button(props.deviceToken)">复制deviceToken</el-button>
	</div>
	<div class="title">
		<h3>MQTT 接入点</h3>
		<p>MQTT 接入方式为设备和云平台提供双向连接，设备既可上报属性数据，也可接收云端的消息下发。</p>
		<el-button size="large" class="address" @click="Button(access.mqtt)">
			{{ access.mqtt }}
		</el-button>
	</div>
	<div class="title">
		<h3>设备端 HTTP 接入点</h3>
		<p>HTTP 接入方式较为简单快捷，适用于只上报数据，而不需要云端控制的设备</p>
		<el-button size="large" class="address" @click="Button(access.http)">
			{{ access.http }}
		</el-button>
	</div>
	<div class="title">
		<h3>设备端 HTTPS 接入点</h3>
		<p>HTTPs 接入方式在 HTTP 基础上提供了 SSL 证书加密通信，要求硬件设备支持 SSL</p>
		<el-button size="large" class="address" @click="Button(access.https)">
			{{ access.https }}
		</el-button>
	</div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';

// 获取父组件数据
const props = defineProps(['DeviceID', 'ModelID', 'deviceToken']); // 使用defineProps

// 接入点
const access = {
	mqtt: 'mqtt:127.0.0.1:1883',
	http: 'http://127.0.0.1:9875/v1/broker/http',
	https: 'https://127.0.0.1:9876/v1/broker/http'
};

// 按键函数
const Button = (data: string) => {
	navigator.clipboard
		.writeText(data)
		.then(() => {
			// 弹出成功提示
			ElMessage.success(`复制成功:${data}`);
		})
		.catch((error) => {
			console.error('Failed to copy text: ', error);
		});
};
</script>

<style scoped lang="scss">
.title {
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

	.address {
		font-size: 1.2em;
		font-weight: bold;
		margin-top: 10px;
		margin-bottom: 10px;
	}
}
</style>
