<template>
	<div class="title">
		<h3>属性值</h3>
	</div>
	<el-collapse style="margin-bottom: 20px">
		<el-collapse-item :name="index" v-for="(item, index) in Model.attributes" :key="index">
			<template #title>
				<div style="font-size: large">{{ item.name }}-{{ item.identifier }}:({{ item.unit }})</div>
			</template>
			<!-- 表格 -->
			<el-table :data="item.data" style="width: 100%">
				<el-table-column prop="field" label="字段" />
				<el-table-column prop="value" label="值" />
				<el-table-column prop="time" label="时间" />
			</el-table>
		</el-collapse-item>
	</el-collapse>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getDeviceAttributeData } from '@/api/device/admin';
import { ElMessage } from 'element-plus';
const Model: any = ref({});
const attributesList: any = ref({});

// 获取父组件数据
const props = defineProps(['ID', 'DeviceModel']); // 使用defineProps

const getData = async (attributes: any) => {
	const res = await getDeviceAttributeData(props.ID);
	if (res.code !== 200) return ElMessage.error(res.msg);
	console.log('res', res);
	attributesList.value = res.data;

	// 配对并组合数据
	// 遍历属性项
	for (const item of attributes) {
		// 遍历属性值
		for (const value in attributesList.value) {
			//判断属性项和属性值是否匹配
			if (item.identifier === value) {
				// 匹配成功，将属性值添加到属性项中,reverse是倒转数组,让数据正序
				item.data = attributesList.value[value].reverse();
				break;
			}
		}
	}

	Model.value.attributes = attributes;
	//console.log('Model', Model.value);
};

watch(
	() => props.DeviceModel, // 监听 id 的变化
	async (newDeviceModel) => {
		Model.value = newDeviceModel;
		getData(Model.value.attributes);
	}
);
</script>

<style scoped lang="scss">
.title {
	padding: 20px;
	border-radius: 8px;

	h3 {
		font-size: 1.4em;
		font-weight: bold;
		margin-bottom: 10px;
	}

	p {
		font-size: 1em;
		margin-bottom: 10px;
	}

	.address {
		font-size: 1.2em;
		font-weight: bold;
		margin-top: 10px;
		margin-bottom: 10px;
	}
}
//去除el-collapse折叠面板的默认边框
.el-collapse,
.el-collapse-item__wrap {
	border: none;
}
</style>
