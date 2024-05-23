<template>
	<!-- 卡片头部添加按钮 -->
	<div class="button">
		<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
	</div>
	<!-- 表格 -->
	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="date" label="Date" width="180" />
		<el-table-column prop="name" label="Name" width="180" />
		<el-table-column prop="address" label="Address" />
	</el-table>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	}
];
// 获取父组件数据
defineProps(['DeviceModelID']);

// 添加按钮
const addButton = () => {
	// 跳转
	router.push('/device/deviceModel/addmodel');
};
</script>

<style scoped lang="scss">
.button {
	margin-bottom: 10px;
}
</style>
