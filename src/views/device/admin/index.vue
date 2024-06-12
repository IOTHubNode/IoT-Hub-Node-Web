<template>
	<div>
		<el-card class="box-card" fit="true" v-if="$route.path === '/device/deviceAdmin'">
			<!-- 卡片头部添加按钮 -->
			<div class="button">
				<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
			</div>
			<!-- 有数据 -->
			<div class="has-data" v-if="deviceList.length > 0">
				<!-- 循环生成物模型卡片 -->
				<el-row :gutter="10">
					<el-col :span="4" v-for="(item, index) in deviceList" :key="index">
						<!-- 填充卡片 -->
						<el-card class="model-card" @click="Button(item.DeviceId)">
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
									:src="updateImageUrl(item.DeviceModel.Image)" />
							</div>
							<template #footer>
								<div class="card-footer">
									<!-- 设备状态 -->
									<div>
										<el-tag v-if="item.Status === 1" type="success">在线</el-tag>
										<el-tag v-else-if="item.Status === 2" type="danger">离线</el-tag>
										<el-tag v-else-if="item.Status === 3" type="warning">异常</el-tag>
									</div>
									<!-- 设备类型 -->
									<el-tag class="item">{{ item.DeviceModel.Name }}</el-tag>
								</div>
							</template>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<!-- 无数据 -->
			<div class="no-data" v-if="deviceList.length == 0">
				<div class="title">添加设备</div>
				<div class="desc">
					支持各种单片机、嵌入式设备、传感器、执行器、控制器、网关、DTU、PLC等，支持MQTT、HTTP、TCP自定义协议。
				</div>
				<el-button type="primary" size="large" @click="addButton">立即添加设备</el-button>
			</div>
		</el-card>
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { getDeviceList } from '@/api/device/admin';
import { ref, onMounted, watch } from 'vue';
import { updateImageUrl } from '@/utils/image';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const deviceList: any = ref(''); // 设备模型列表

// 添加按钮
const addButton = () => {
	// 跳转
	router.push('/device/device/adddevice');
};

// 模型按钮
const Button = (id: number) => {
	console.log(id);
	// 跳转
	router.push({
		path: '/device/device/detail',
		query: {
			id: id
		}
	});
};
// 加载数据
const getData = () => {
	getDeviceList()
		.then((res) => {
			console.log(res);
			deviceList.value = res.data;
		})
		.catch((err) => {
			// 弹窗
			ElMessage.error('获取设备数据失败', err);
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
		if (newValue === '/device/deviceAdmin') {
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
