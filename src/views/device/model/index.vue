<template>
	<el-scrollbar height="650px">
		<div class="model-list">
			<el-card class="box-card" fit="true" v-if="$route.path === '/device/deviceModel'">
				<!-- 卡片头部添加按钮 -->
				<div class="button">
					<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
				</div>
				<!-- 有数据 -->
				<div class="has-data" v-if="deviceModelList.length > 0">
					<!-- 循环生成物模型卡片 -->
					<el-row :gutter="10">
						<el-col :span="4" v-for="(item, index) in deviceModelList" :key="index">
							<div>
								<!-- 填充卡片 -->
								<el-card class="model-card" @click="modelButton(item.DeviceModelId)">
									<template #header>
										<div class="card-header">
											<span>{{ item.Name }}</span>
										</div>
									</template>
									<!-- 内容 -->
									<div>
										<el-avatar
											style="display: block; margin: 0 auto"
											shape="square"
											:size="120"
											fit="cover"
											:src="updateImageUrl(item.Image)" />
									</div>
									<template #footer>
										<div class="card-footer">
											<!-- 设备类型 -->
											<div>
												<el-tag v-if="item.ConnectType === 1" type="success">直连设备</el-tag>
												<el-tag v-else-if="item.ConnectType === 2" type="success">网关设备</el-tag>
												<el-tag v-else-if="item.ConnectType === 3" type="success">
													网关子设备
												</el-tag>
												<el-tag v-else type="success">其他设备</el-tag>
											</div>
											<!-- 设备数量 -->
											<div class="item">设备数: {{ item.Device.length }}</div>
										</div>
									</template>
								</el-card>
							</div>
						</el-col>
					</el-row>
				</div>
				<!-- 无数据 -->
				<div class="no-data" v-if="deviceModelList.length == 0">
					<el-empty description="定义设备物模型">
						<div class="desc">
							通过编辑事物模型，云平台可以快速识别设备属性和功能，并提供开箱即用的低代码页面配置设备.
						</div>
						<el-button type="primary" size="large" @click="addButton">创建物模型</el-button>
					</el-empty>
					<!-- <div class="title">定义设备物模型</div>
				<div class="desc">
					通过编辑事物模型，云平台可以快速识别设备属性和功能，并提供开箱即用的低代码页面配置设备.
				</div>
				<el-button type="primary" size="large" @click="addButton">创建物模型</el-button> -->
				</div>
			</el-card>
			<router-view></router-view>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { getDeviceModelList } from '@/api/device/model';
import { updateImageUrl } from '@/utils/image';
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();

const deviceModelList: any = ref(''); // 设备模型列表

// 添加按钮
const addButton = () => {
	// 跳转
	router.push('/device/deviceModel/addmodel');
};
// 模型按钮
const modelButton = (id: number) => {
	console.log(id);
	// 跳转
	router.push({
		path: '/device/deviceModel/detail',
		query: {
			id: id
		}
	});
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
			ElMessage.error('获取物模型数据失败', err);
		});
};

// 组件挂载完毕
onMounted(() => {
	getData(); // 获取表格数据
});

// 监听路由变化
watch(
	() => router.currentRoute.value.path,
	(newValue) => {
		if (newValue === '/device/deviceModel') {
			getData(); // 获取表格数据
		}
	},
	{ immediate: true }
);
</script>

<style scoped lang="scss">
.box-card {
	.has-data {
		.model-card {
			// width: 230px;
			margin-top: 20px;

			.card-footer {
				display: flex;
				justify-content: space-between;
				.item {
					// 居中
					display: flex;
					align-items: center;
					font-size: 14px;
				}
			}
		}
	}

	.no-data {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		.desc {
			margin-top: 0px;
			font-size: 16px;
			color: #666;
		}
		.el-button {
			margin-top: 20px;
		}
	}
}
</style>
