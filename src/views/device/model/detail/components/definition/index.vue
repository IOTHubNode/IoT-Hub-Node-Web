<template>
	<!-- 卡片头部添加按钮 -->
	<div class="button">
		<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
	</div>
	<div>
		<el-collapse style="margin-bottom: 20px" v-model="expandRows">
			<el-collapse-item name="1">
				<template #title>
					<div style="font-size: large">属性</div>
					<el-tooltip
						content="用于描述设备运行时的状态，分为可读写和只读属性，比如温度传感器所读取的环境温度或者是插座的开关状态"
						placement="right">
						<el-icon class="header-icon">
							<info-filled />
						</el-icon>
					</el-tooltip>
				</template>
				<div>
					<!-- 表格 -->
					<el-table :data="tableDataOne" style="width: 100%">
						<el-table-column prop="name" label="属性名称" align="center" />
						<el-table-column prop="identifier" label="字段" align="center" />
						<el-table-column prop="dataType" label="数据类型" align="center" />
						<el-table-column prop="accessMode" label="读写类型" align="center" />
						<el-table-column prop="unit" label="数据单位" align="center" />
						<el-table-column label="读写类型" align="center">
							<template #default="{ row }">
								<el-tag v-if="row.accessMode == 'r'" type="success">只读</el-tag>
								<el-tag v-if="row.accessMode == 'w'" type="success">只写</el-tag>
								<el-tag v-if="row.accessMode == 'rw'" type="success">可读可写</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="description" label="描述" align="center" />
						<el-table-column align="center" label="操作" fixed="right">
							<template #default="{ row }">
								<el-button
									type="primary"
									size="small"
									@click="editButton(row)"
									icon="Edit"></el-button>
								<el-divider direction="vertical" />
								<el-button
									type="danger"
									size="small"
									@click="deleteButton"
									icon="Delete"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-collapse-item>
			<el-collapse-item name="2">
				<template #title>
					<div style="font-size: large">方法</div>
					<el-tooltip
						content="用于描述设备运行时的状态，分为可读写和只读属性，比如温度传感器所读取的环境温度或者是插座的开关状态"
						placement="right">
						<el-icon class="header-icon">
							<info-filled />
						</el-icon>
					</el-tooltip>
				</template>
				<div>
					<!-- 表格 -->
					<el-table :data="tableDataTwo" style="width: 100%">
						<el-table-column prop="name" label="方法名称" align="center" />
						<el-table-column prop="identifier" label="方法标识符" align="center" />
						<el-table-column label="输入参数" align="center">
							<template #default="{ row }">
								<!-- 循环inputData -->
								<el-tag
									v-for="(item, index) in row.inputData"
									:key="index"
									align="center"
									width="150">
									{{ item.identifier }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="输出参数" align="center">
							<template #default="{ row }">
								<!-- 循环inputData -->
								<el-tag
									v-for="(item, index) in row.outputData"
									:key="index"
									align="center"
									width="150">
									{{ item.identifier }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="description" label="描述" align="center" />
						<el-table-column align="center" label="操作" fixed="right">
							<template #default="{ row }">
								<el-button
									type="primary"
									size="small"
									@click="editButton(row)"
									icon="Edit"></el-button>
								<el-divider direction="vertical" />
								<el-button
									type="danger"
									size="small"
									@click="deleteButton"
									icon="Delete"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-collapse-item>
			<el-collapse-item name="3">
				<template #title>
					<div style="font-size: large">事件</div>
					<el-tooltip
						content="用于描述设备运行时的状态，分为可读写和只读属性，比如温度传感器所读取的环境温度或者是插座的开关状态"
						placement="right">
						<el-icon class="header-icon">
							<info-filled />
						</el-icon>
					</el-tooltip>
				</template>
				<div>
					<!-- 表格 -->
					<el-table :data="tableDataThree" style="width: 100%">
						<el-table-column prop="name" label="事件名称" align="center" />
						<el-table-column prop="identifier" label="事件标识符" align="center" />
						<el-table-column label="事件输出参数" align="center">
							<template #default="{ row }">
								<!-- 循环inputData -->
								<el-tag
									v-for="(item, index) in row.outputData"
									:key="index"
									align="center"
									width="150">
									{{ item.identifier }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="description" label="描述" align="center" />
						<el-table-column align="center" label="操作" fixed="right">
							<template #default="{ row }">
								<el-button
									type="primary"
									size="small"
									@click="editButton(row)"
									icon="Edit"></el-button>
								<el-divider direction="vertical" />
								<el-button
									type="danger"
									size="small"
									@click="deleteButton"
									icon="Delete"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

let expandRows = ref(['1', '2', '3']);

// 获取父组件数据
const props = defineProps(['Content']);

// 添加按钮
const addButton = (type: number) => {
	console.log(type);
};

// 编辑按钮
const editButton = (row: any) => {
	console.log(row);
};

// 删除按钮
const deleteButton = () => {
	console.log('删除');
};

let tableDataOne = ref<any[]>([]);
let tableDataTwo = ref<any[]>([]);
let tableDataThree = ref<any[]>([]);

const getTableData = async () => {
	// 获取数据
	const data = props.Content;
	// 从data里提取
	tableDataOne.value = data.attributes;
	tableDataTwo.value = data.functions;
	tableDataThree.value = data.events;
	console.log(tableDataOne.value);
	console.log(tableDataTwo.value);
	console.log(tableDataThree.value);
};

watch(
	() => props.Content,
	async () => {
		await getTableData();
	}
);
</script>

<style scoped lang="scss">
.Button {
	margin-left: 35px;
}

//去除el-collapse折叠面板的默认边框
.el-collapse,
.el-collapse-item__wrap {
	border: none;
}
</style>
