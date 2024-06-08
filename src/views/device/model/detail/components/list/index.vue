<template>
	<!-- 卡片头部添加按钮 -->
	<div class="button">
		<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
	</div>
	<!-- 表格 -->
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="DeviceId" label="设备ID" width="180" />
		<el-table-column prop="Name" label="设备名称" width="180" />
		<el-table-column prop="address" label="描述" />
	</el-table>
	<div>{{ DeviceModelID }}</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getDevicesData } from '@/api/device/model';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter();

// 表格数据
const tableData = ref<any[]>([]);

// 添加按钮
const addButton = () => {
	// 跳转
	router.push('/device/deviceModel/addmodel');
};

// 获取父组件数据
const props = defineProps(['DeviceModelID']); // 使用defineProps

// 获取数据
const getData = (id: any) => {
	getDevicesData(id)
		.then((res) => {
			console.log(res);
			tableData.value = res.data[0].Device;
			console.log(tableData.value);
		})
		.catch((err) => {
			console.log(err);
			// 弹窗
			ElMessage.error('获取数据失败');
		});
};

watch(
	() => props.DeviceModelID, // 监听 id 的变化
	async (newid) => {
		await getData(newid);
	}
);
</script>

<style scoped lang="scss">
.button {
	margin-bottom: 10px;
}
</style>
