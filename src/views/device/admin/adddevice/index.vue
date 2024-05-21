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
				<span>物模型名称:</span>
				<el-input
					v-model="DeviceModel.Name"
					style="width: 240px"
					placeholder="请输入唯一模型名称" />
			</div>

			<!-- 图片 -->
			<span>图片上传:</span>
			<el-upload
				ref="upload"
				class="avatar-uploader"
				action="https://www.duruofu.xyz:10001/v1/util/local_picture"
				:headers="{ Authorization: GET_TOKEN() }"
				:limit="1"
				:on-exceed="handleExceed"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload"
				style="margin-bottom: 20px">
				<img v-if="DeviceModel.Image" :src="Imageurl" class="avatar" />
				<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
			</el-upload>

			<div style="margin-bottom: 20px">
				<span>设备类型:</span>

				<el-radio-group v-model="DeviceModel.ConnectType" size="large">
					<el-radio-button label="1" value="1">直连设备</el-radio-button>
					<el-radio-button label="2" value="2">网关设备</el-radio-button>
					<el-radio-button label="3" value="3">网关子设备</el-radio-button>
				</el-radio-group>
			</div>
			<div style="margin-bottom: 20px">
				<span>设备通信协议:</span>
				<el-select
					v-model="DeviceModel.CommunicationType"
					clearable
					placeholder="选择设备通信协议"
					style="width: 240px">
					<el-option
						v-for="item in CommunicationTypeoptions"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
			</div>
			<div style="margin-bottom: 20px">
				<span>设备接入协议:</span>
				<el-select
					v-model="DeviceModel.ProtocolType"
					clearable
					placeholder="选择设备接入协议"
					style="width: 240px">
					<el-option
						v-for="item in ProtocolTypeoptions"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
			</div>
			<div style="margin-bottom: 20px">
				<span>物模型描述:</span>
				<el-input
					v-model="DeviceModel.Description"
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
					title="注意: 创建物模型后, 请到设备管理中添加设备"
					type="warning"
					:closable="false" />
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { GET_TOKEN } from '@/utils/token';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { genFileId, ElMessage } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import { addDeviceModel } from '@/api/device/model';

const router = useRouter();

const DeviceModel = reactive({
	Name: '',
	Description: '',
	ConnectType: '1',
	CommunicationType: '',
	ProtocolType: '',
	Image: '',
	Content: { name: 'test' },
	IsDisabled: ''
});

const Imageurl = ref('');
const upload = ref<UploadInstance>();

// 通信协议选项
const CommunicationTypeoptions = [
	{
		value: '1',
		label: 'WIFI'
	},
	{
		value: '2',
		label: '4G'
	},
	{
		value: '3',
		label: 'NB-IoT'
	},
	{
		value: '4',
		label: '其他'
	}
];
// 接入协议选型
const ProtocolTypeoptions = [
	{
		value: '1',
		label: 'MQTT'
	},
	{
		value: '2',
		label: 'HTTP'
	},
	{
		value: '3',
		label: 'CoAP'
	},
	{
		value: '4',
		label: 'TCP'
	},
	{
		value: '5',
		label: 'UDP'
	},
	{
		value: '6',
		label: '其他'
	}
];

// 图片上传
const handleExceed: UploadProps['onExceed'] = (files) => {
	// 数量超出
	upload.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	upload.value!.handleStart(file);
	upload.value!.submit();
};

// 上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	console.log(response);
	// 更新显示
	Imageurl.value = URL.createObjectURL(uploadFile.raw!);
	// 保存路径
	DeviceModel.Image = response.data;
	console.log(DeviceModel.Image);
};

// 上传前的处理
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	// 类型限制
	if (
		rawFile.type !== 'image/jpeg' &&
		rawFile.type !== 'image/png' &&
		rawFile.type !== 'image/gif'
	) {
		ElMessage.error('Avatar picture must be JPG/PNG/GIF format!');
		return false;
	}
	// 大小限制
	else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!');
		return false;
	}
	return true;
};

const addDeviceModelButton = async () => {
	console.log(DeviceModel);
	const res = await addDeviceModel({
		Name: DeviceModel.Name,
		Description: DeviceModel.Description,
		ConnectType: DeviceModel.ConnectType,
		CommunicationType: DeviceModel.CommunicationType,
		ProtocolType: DeviceModel.ProtocolType,
		Image: DeviceModel.Image,
		Content: DeviceModel.Content
	});

	console.log(res);

	if (res.code == 200) {
		ElMessage.success('创建成功');
		router.push('/device');
	} else {
		ElMessage.error('创建失败');
	}
};

const goBack = () => {
	router.go(-1);
};
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
