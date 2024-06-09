<template>
	<div>
		<el-card>
			<!-- 页头 -->
			<el-page-header @back="onBack">
				<template #content>
					<div class="flex items-center">
						<span class="text-large font-600 mr-3">物模型详情</span>
						<!-- <el-tag>Default</el-tag> -->
					</div>
				</template>
				<template #extra>
					<div class="flex items-center">
						<el-button>导出</el-button>
						<el-button type="primary" class="ml-2">编辑</el-button>
					</div>
				</template>
				<!-- 物模型信息 -->

				<div class="base-info">
					<!-- 图片 -->
					<div>
						<el-avatar
							style="display: block; margin: 0 auto"
							shape="square"
							:size="60"
							fit="cover"
							:src="updateImageUrl(DeviceModel.Image)" />
					</div>
					<!-- 介绍 -->
					<div class="description">
						<el-descriptions :column="3" class="mt-4">
							<el-descriptions-item label="名称:">{{ DeviceModel.Name }}</el-descriptions-item>
							<el-descriptions-item label="连接类型">
								<el-tag v-if="DeviceModel.ConnectType == '1'" type="primary">直连设备</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '2'" type="primary">网关设备</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '3'" type="primary">
									网关子设备
								</el-tag>
								<el-tag v-else type="success">其他设备</el-tag>
							</el-descriptions-item>
							<el-descriptions-item label="通信类型">
								<el-tag v-if="DeviceModel.ConnectType == '1'" type="success">WIFI</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '2'" type="success">4G</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '3'" type="success">NB-IOT</el-tag>
								<el-tag v-else type="success">其他</el-tag>
							</el-descriptions-item>
							<el-descriptions-item label="接入协议">
								<el-tag v-if="DeviceModel.ConnectType == '1'" type="primary">MQTT</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '2'" type="primary">HTTP</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '3'" type="primary">CoAP</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '4'" type="primary">TCP</el-tag>
								<el-tag v-else-if="DeviceModel.ConnectType == '5'" type="primary">UDP</el-tag>
								<el-tag v-else type="primary">其他</el-tag>
							</el-descriptions-item>
							<el-descriptions-item label="描述信息">
								{{ DeviceModel.Description }}
							</el-descriptions-item>
						</el-descriptions>
					</div>
				</div>

				<!-- 标签页 -->
				<el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
					<el-tab-pane label="设备列表" name="1">
						<List :DeviceModelID="DeviceModel.ID"></List>
					</el-tab-pane>
					<el-tab-pane label="模型定义" name="2">
						<Definition :DeviceModelID="DeviceModel.ID"></Definition>
					</el-tab-pane>
					<el-tab-pane label="拓展属性" name="3">
						<Expand :DeviceModelID="DeviceModel.ID"></Expand>
					</el-tab-pane>
					<el-tab-pane label="规则" name="4">
						<Rule :DeviceModelID="DeviceModel.ID"></Rule>
					</el-tab-pane>
					<el-tab-pane label="任务" name="5">
						<Task :DeviceModelID="DeviceModel.ID"></Task>
					</el-tab-pane>
					<el-tab-pane label="告警" name="6">
						<Warning :DeviceModelID="DeviceModel.ID"></Warning>
					</el-tab-pane>
					<el-tab-pane label="设置" name="7">
						<Config :DeviceModelID="DeviceModel.ID"></Config>
						<!-- 移除设备 -->
						<div>
							<el-button type="danger">移除设备</el-button>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-page-header>
			<!-- 表单 -->
		</el-card>
	</div>
</template>

<script setup lang="ts">
// 引入页面组件
import List from './components/list/index.vue';
import Definition from './components/definition/index.vue';
import Expand from './components/expand/index.vue';
import Rule from './components/rule/index.vue';
import Task from './components/task/index.vue';
import Warning from './components/warning/index.vue';
import Config from './components/config/index.vue';

import { useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import { updateImageUrl } from '@/utils/image';
import { getDeviceModel } from '@/api/device/model';

const router = useRouter();

const activeName = ref('1');

const DeviceModel = reactive({
	ID: '',
	Name: '',
	Description: '',
	ConnectType: '1',
	CommunicationType: '',
	ProtocolType: '',
	Image: '',
	Content: { name: 'test' },
	IsDisabled: ''
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
const onBack = () => {
	router.go(-1);
};

const getDeviceModeData = async (id: any) => {
	// 获取物模型信息
	const res = await getDeviceModel(id);
	if (res.code === 200) {
		// 赋值（对象拷贝）
		DeviceModel.ID = res.data.DeviceModelId;
		DeviceModel.Name = res.data.Name;
		DeviceModel.Description = res.data.Description;
		DeviceModel.ConnectType = res.data.ConnectType;
		DeviceModel.CommunicationType = res.data.CommunicationType;
		DeviceModel.ProtocolType = res.data.ProtocolType;
		DeviceModel.Image = res.data.Image;
		DeviceModel.Content = res.data.Content;
		DeviceModel.IsDisabled = res.data.IsDisabled;
	}
	console.log(DeviceModel);
};

// 组件挂载完毕
onMounted(() => {
	// 获取路由参数
	const { id } = router.currentRoute.value.query;
	console.log(id);

	getDeviceModeData(id);
});
</script>

<style scoped lang="scss">
.tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}

.base-info {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: 20px; /* Adjust the gap between image and description */
	margin-top: 20px;
	margin-bottom: 20px;

	.description {
		flex: 1;
		// 垂直居中
	}
}
</style>
