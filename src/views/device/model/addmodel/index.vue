<template>
	<div>
		<el-card>
			<!-- 页头 -->
			<el-page-header @back="goBack">
				<template #content>
					<span class="text-large font-600 mr-3">创建物模型</span>
				</template>
			</el-page-header>
			<!-- 表单 -->
			<div>
				设备类型:
				<div>
					<el-radio-group v-model="DeviceModel.ConnectType" size="large">
						<el-radio-button label="直连设备" value="1" />
						<el-radio-button label="网关设备" value="2" />
						<el-radio-button label="网关子设备" value="3" />
					</el-radio-group>
				</div>
				<!-- 类型名称 -->
				<div class="flex gap-4 mb-4">
					<span>物模型名称</span>
					<el-input
						v-model="input1"
						style="width: 240px"
						placeholder="Pick a date"
						:suffix-icon="Calendar" />
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const DeviceModel = reactive({
	Name: '',
	Description: '',
	ConnectType: '直连设备',
	Data: '',
	IsDisabled: false
});

const goBack = () => {
	router.go(-1);
};
</script>

<style scoped lang="scss"></style>
