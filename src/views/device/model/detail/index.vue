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

				<!-- 标签页 -->
				<el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
					<el-tab-pane label="User" name="first">User</el-tab-pane>
					<el-tab-pane label="Config" name="second">Config</el-tab-pane>
					<el-tab-pane label="Role" name="third">Role</el-tab-pane>
					<el-tab-pane label="设置" name="fourth">Task</el-tab-pane>
				</el-tabs>
			</el-page-header>
			<!-- 表单 -->
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import { ref } from 'vue';
const router = useRouter();

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
const onBack = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss">
.tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
