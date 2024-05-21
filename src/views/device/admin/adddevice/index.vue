<template>
	<div>
		<el-card>
			<!-- 页头 -->
			<el-page-header @back="goBack" style="margin-bottom: 20px">
				<template #content>
					<span class="text-large font-600 mr-3">添加设备</span>
				</template>
			</el-page-header>
			<!-- 表单 -->
			<div style="margin-bottom: 20px">
				<span>设备名称:</span>
				<el-input v-model="Device.Name" style="width: 240px" placeholder="请输入设备名称" />
			</div>

			<div style="margin-bottom: 20px">
				<span>设备类型</span>
				<el-select
					v-model="Device.DeviceModelId"
					clearable
					placeholder="选择设备物模型"
					style="width: 240px">
					<el-option
						v-for="item in deviceModelList"
						:key="item.DeviceModelId"
						:label="item.Name"
						:value="item.DeviceModelId" />
				</el-select>
			</div>
			<div style="margin-bottom: 20px">
				<span>设备组</span>
				<el-select
					v-model="Device.DeviceGroupId"
					clearable
					placeholder="选择设备接入协议"
					style="width: 240px">
					<el-option
						v-for="item in DeviceGroupoptions"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
			</div>
			<div style="margin-bottom: 20px">
				<span>所属组织</span>
				<el-select
					v-model="Device.OrganizationId"
					clearable
					placeholder="选择设备所属组织"
					style="width: 240px">
					<el-option
						v-for="item in Organizationoptions"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
			</div>
			<div style="margin-bottom: 20px">
				<span>设备描述:</span>
				<el-input
					v-model="Device.Description"
					style="width: 240px"
					type="textarea"
					placeholder="请输入描述" />
			</div>
			<div style="margin-bottom: 20px">
				<!-- 按键 -->
				<el-button type="primary" @click="addDeviceModelButton">创建</el-button>
				<el-button type="primary" @click="goBack">取消</el-button>
			</div>
			<div style="margin-bottom: 20px">
				<el-alert
					title="注意: 创建设备后, 请到设备详情中查看设备密钥"
					type="warning"
					:closable="false" />
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { getDeviceModelList } from '@/api/device/model';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { addDevice } from '@/api/device/admin';
const router = useRouter();

const deviceModelList: any = ref(''); // 设备模型列表

const Device = reactive({
	Name: '',
	DeviceModelId: '',
	DeviceGroupId: '0',
	OrganizationId: '0',
	Description: ''
});

// 设备组选选项
const DeviceGroupoptions = [
	{
		value: '0',
		label: '默认'
	}
];
// 所属组织选型
const Organizationoptions = [
	{
		value: '0',
		label: '默认'
	}
];

const addDeviceModelButton = async () => {
	console.log(Device);
	const res = await addDevice({
		Name: Device.Name,
		Description: Device.Description,
		DeviceModelId: Device.DeviceModelId,
		DeviceGroupId: Device.DeviceGroupId,
		OrganizationId: Device.OrganizationId
	});

	console.log(res);

	if (res.code == 200) {
		ElMessage.success('创建成功');
		router.push('/device/deviceAdmin');
	} else {
		ElMessage.error('创建失败');
	}
};

const goBack = () => {
	router.go(-1);
};

// 加载数据
const getData = () => {
	getDeviceModelList()
		.then((res) => {
			console.log(res);
			deviceModelList.value = res.data;
		})
		.catch((err) => {
			// 弹窗
			ElMessage.error('获取设备类型数据失败', err);
		});
};

// 组件挂载完毕
onMounted(() => {
	getData(); // 获取表格数据
});
</script>

<style scoped lang="scss">
// 头像
.avatar-uploader .avatar {
	width: 150px;
	height: 150px;
	display: block;
	border: 1px dashed var(--el-border-color);
}

.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 150px;
	height: 150px;
	text-align: center;
	border: 1px dashed var(--el-border-color);
}
</style>
