<template>
	<div>
		<el-card class="box-card" fit="true">
			<!-- 卡片头部添加按钮 -->
			<div class="button">
				<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
			</div>
			<!-- 有数据 -->
			<div class="has-data" v-if="deviceModelList.length > 0">
				<!-- 循环生成物模型卡片 -->
				<el-row :gutter="20">
					<div :span="6" v-for="(item, index) in deviceModelList" :key="index">
						<!-- 填充卡片 -->
						<el-card class="model-card" @click="modelButton">
							<template #header>
								<div class="card-header">
									<span>{{ item.Name }}</span>
								</div>
							</template>
							<p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
							<template #footer>
								<div class="card-footer">
									<!-- 设备类型 -->
									<div>
										<el-tag v-if="item.ConnectType === 1" type="success">直连设备</el-tag>
										<el-tag v-else-if="item.ConnectType === 2" type="success">网关设备</el-tag>
										<el-tag v-else type="success">其他设备</el-tag>
									</div>
									<!-- 设备数量 -->
									<div class="item">设备数: 0</div>
								</div>
							</template>
						</el-card>
					</div>
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
	</div>
</template>

<script setup lang="ts">
import { getDeviceModelList } from '@/api/device/model';
import { ref, onMounted } from 'vue';
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
const modelButton = () => {
	console.log('点击了模型');
	console.log('router', router.options.routes);
	// 跳转
	router.push('/device/deviceModel/detail');
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
</script>

<style scoped lang="scss">
.box-card {
	.has-data {
		.model-card {
			width: 230px;
			margin-top: 20px;
			margin-left: 20px;

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
