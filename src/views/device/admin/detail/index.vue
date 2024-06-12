<template>
	<div>
		<el-card>
			<!-- 页头 -->
			<el-page-header @back="onBack">
				<template #content>
					<div class="flex items-center">
						<span class="text-large font-600 mr-3">设备详情</span>
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
							:src="updateImageUrl(Device.Image)" />
					</div>
					<!-- 介绍 -->
					<div class="description">
						<el-descriptions :column="3" class="mt-4">
							<el-descriptions-item label="名称:">{{ Device.Name }}</el-descriptions-item>
							<el-descriptions-item label="物模型">
								<el-tag type="success">{{ Device.ModelType }}</el-tag>
							</el-descriptions-item>
							<el-descriptions-item label="状态">
								<el-tag v-if="Device.Status == '1'" type="success">在线</el-tag>
								<el-tag v-else-if="Device.Status == '2'" type="warning">离线</el-tag>
								<el-tag v-else-if="Device.Status == '3'" type="danger">异常</el-tag>
							</el-descriptions-item>
							<el-descriptions-item label="ID:">
								{{ Device.ID }}-{{ Device.ModelID }}
							</el-descriptions-item>
							<el-descriptions-item label="所属用户:">
								{{ Device.UserName }}
							</el-descriptions-item>
							<el-descriptions-item label="描述信息">
								{{ Device.Description }}
							</el-descriptions-item>
						</el-descriptions>
					</div>
				</div>

				<!-- 标签页 -->
				<el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
					<el-tab-pane label="概览" name="1">
						<Overview :DeviceModel="Device.ModelContent" :ID="Device.ID"></Overview>
					</el-tab-pane>
					<el-tab-pane label="接入" name="2">
						<Access
							:DeviceID="Device.ID"
							:ModelID="Device.ModelID"
							:deviceToken="Device.Token"></Access>
					</el-tab-pane>
					<el-tab-pane label="属性" name="3">
						<Attribute :DeviceModelID="Device.ID"></Attribute>
					</el-tab-pane>
					<el-tab-pane label="方法" name="4">
						<Function :DeviceModelID="Device.ID"></Function>
					</el-tab-pane>
					<el-tab-pane label="事件" name="5">
						<Event :DeviceModelID="Device.ID"></Event>
					</el-tab-pane>
					<el-tab-pane label="规则" name="6">
						<Rule :DeviceModelID="Device.ID"></Rule>
					</el-tab-pane>
					<el-tab-pane label="任务" name="7">
						<Task :DeviceModelID="Device.ID"></Task>
					</el-tab-pane>
					<el-tab-pane label="告警" name="8">
						<Warning :DeviceModelID="Device.ID"></Warning>
					</el-tab-pane>
					<el-tab-pane label="调试" name="9">
						<Debug :DeviceModelID="Device.ID"></Debug>
					</el-tab-pane>
					<el-tab-pane label="设置" name="10">
						<Config :DeviceModelID="Device.ID"></Config>
					</el-tab-pane>
				</el-tabs>
			</el-page-header>
			<!-- 表单 -->
		</el-card>
	</div>
</template>

<script setup lang="ts">
// 引入页面组件
import Overview from './components/overview/index.vue';
import Access from './components/access/index.vue';
import Attribute from './components/attribute/index.vue';
import Function from './components/function/index.vue';
import Event from './components/event/index.vue';
import Rule from './components/rule/index.vue';
import Task from './components/task/index.vue';
import Warning from './components/warning/index.vue';
import Debug from './components/debug/index.vue';
import Config from './components/config/index.vue';

import { useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import { updateImageUrl } from '@/utils/image';
import { getDevice } from '@/api/device/admin';

const router = useRouter();

const activeName = ref('1');

const Device = reactive({
	ID: '',
	Name: '',
	Description: '',
	Status: '',
	ModelID: '',
	ModelType: '',
	Image: '',
	Token: '',
	ModelContent: { name: 'test' },
	UserName: '',
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
	const res = await getDevice(id);
	console.log(res);
	if (res.code === 200) {
		// 赋值（对象拷贝）
		Device.ID = res.data.DeviceId;
		Device.Name = res.data.Name;
		Device.Description = res.data.Description;
		Device.Status = res.data.Status;
		Device.Token = res.data.Token;
		Device.ModelID = res.data.DeviceModel.DeviceModelId;
		Device.ModelType = res.data.DeviceModel.Name;
		Device.ModelContent = res.data.DeviceModel.Content;
		Device.Image = res.data.DeviceModel.Image;
		Device.UserName = res.data.Account.Name;
		Device.IsDisabled = res.data.IsDisabled;
	}
	console.log(Device);
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
