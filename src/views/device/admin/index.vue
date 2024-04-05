<template>
	<div>
		<el-card class="box-card" fit="true">
			<!-- 卡片头部添加按钮 -->
			<div class="button">
				<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
			</div>
			<!-- 有数据 -->
			<div v-if="deviceModelList.length > 0">
				<!-- 循环生成物模型卡片 -->
				<el-row :gutter="20">
					<div :span="6" v-for="(item, index) in deviceModelList" :key="index">
						<el-card shadow="hover" style="margin-bottom: 20px">1</el-card>
					</div>
				</el-row>
			</div>
			<!-- 无数据 -->
			<div class="no-data" v-if="deviceModelList.length == 0">
				<div class="title">添加设备</div>
				<div class="desc">
					支持各种单片机、嵌入式设备、传感器、执行器、控制器、网关、DTU、PLC等，支持MQTT、HTTP、TCP自定义协议。
				</div>
				<el-button type="primary" size="large" @click="addButton">立即添加设备</el-button>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { getDeviceModelList } from '@/api/device/model';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const deviceModelList = ref(''); // 设备模型列表

// 添加按钮
const addButton = () => {};

// 加载数据
const getData = () => {
	getDeviceModelList()
		.then((res) => {
			console.log(res);
			deviceModelList.value = res.data;
		})
		.catch((err) => {
			// 弹窗
			ElMessage.error('获取物模型数据失败', err);
		});
};

// 组件挂载完毕
onMounted(() => {
	getData(); // 获取表格数据
});
</script>

<style scoped lang="scss">
.box-card {
	height: 80vh;

	.no-data {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		.title {
			margin-top: 140px;
			font-size: 24px;
			color: #333;
		}
		.desc {
			margin-top: 20px;
			font-size: 16px;
			color: #666;
		}
		.el-button {
			margin-top: 20px;
		}
	}
}
</style>
