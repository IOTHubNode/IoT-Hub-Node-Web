<template>
	<!-- 卡片头部添加按钮 -->
	<div class="button">
		<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
	</div>
	<!-- 表格 -->
	<el-table :data="tableData" style="width: 100%" table-layout="auto">
		<el-table-column prop="DeviceId" label="设备ID" align="center" />
		<el-table-column prop="Name" label="设备名称" align="center" />
		<el-table-column label="IDkey" align="center">
			<template #default="{ row }">{{ DeviceModelID }}-{{ row.DeviceId }}</template>
		</el-table-column>
		<el-table-column prop="Token" label="通行证" align="center" />
		<el-table-column label="禁用" align="center">
			<template #default="{ row }">
				<el-tag v-if="row.IsDisabled" type="danger">禁用</el-tag>
				<el-tag v-else type="success">启用</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="状态" align="center">
			<template #default="{ row }">
				<el-tag v-if="row.Status == 1" type="success">在线</el-tag>
				<el-tag v-if="row.Status == 2" type="warning">离线</el-tag>
				<el-tag v-if="row.Status == 3" type="danger">告警</el-tag>
			</template>
		</el-table-column>
		<el-table-column
			prop="CreatedTime"
			label="创建时间"
			sortable
			:formatter="formatTime"
			align="center" />
		<el-table-column prop="Account.Name" label="所有者" align="center" />
		<el-table-column prop="Description" label="描述" align="center" />
	</el-table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getDevicesData } from '@/api/device/model';
import { formatTime } from '@/utils/time';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter();

// 表格数据
const tableData = ref<any[]>([]);

// 添加按钮
const addButton = () => {
	// 跳转
	router.push('/device/device/adddevice');
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
