<template>
	<el-card>
		<!-- 头部概览 -->
		<el-row :gutter="20" style="margin-bottom: 20px">
			<el-col :span="6">
				<el-card class="top-card">
					<div style="display: flex">
						<div style="display: flex; align-items: center">
							<el-icon size="80"><HelpFilled /></el-icon>
						</div>
						<div class="statistic-card">
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										Daily active users
										<el-tooltip
											effect="dark"
											content="Number of users who logged into the product in one day"
											placement="top">
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
							<div class="statistic-footer">
								<div class="footer-item">
									<span>than yesterday</span>
									<span class="green">
										24%
										<el-icon>
											<CaretTop />
										</el-icon>
									</span>
								</div>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="top-card">
					<div style="display: flex">
						<div style="display: flex; align-items: center">
							<el-icon size="80"><HelpFilled /></el-icon>
						</div>
						<div class="statistic-card">
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										Daily active users
										<el-tooltip
											effect="dark"
											content="Number of users who logged into the product in one day"
											placement="top">
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
							<div class="statistic-footer">
								<div class="footer-item">
									<span>than yesterday</span>
									<span class="green">
										24%
										<el-icon>
											<CaretTop />
										</el-icon>
									</span>
								</div>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="top-card">
					<div style="display: flex">
						<div style="display: flex; align-items: center">
							<el-icon size="80"><HelpFilled /></el-icon>
						</div>
						<div class="statistic-card">
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										Daily active users
										<el-tooltip
											effect="dark"
											content="Number of users who logged into the product in one day"
											placement="top">
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
							<div class="statistic-footer">
								<div class="footer-item">
									<span>than yesterday</span>
									<span class="green">
										24%
										<el-icon>
											<CaretTop />
										</el-icon>
									</span>
								</div>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="top-card">
					<div style="display: flex">
						<div style="display: flex; align-items: center">
							<el-icon size="80"><HelpFilled /></el-icon>
						</div>
						<div class="statistic-card">
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										Daily active users
										<el-tooltip
											effect="dark"
											content="Number of users who logged into the product in one day"
											placement="top">
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
							<div class="statistic-footer">
								<div class="footer-item">
									<span>than yesterday</span>
									<span class="green">
										24%
										<el-icon>
											<CaretTop />
										</el-icon>
									</span>
								</div>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 中部图表1&2 -->
		<el-row :gutter="20" style="margin-bottom: 20px">
			<el-col :span="12"><el-card>1</el-card></el-col>
			<el-col :span="12"><el-card>1</el-card></el-col>
		</el-row>
		<!-- 中部图表3&4 -->
		<el-row :gutter="20" style="margin-bottom: 20px">
			<el-col :span="12"><el-card>1</el-card></el-col>
			<el-col :span="12"><el-card>1</el-card></el-col>
		</el-row>
		<!-- 底部其他 -->
	</el-card>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
:global(h2#card-usage ~ .example .example-showcase) {
	background-color: var(--el-fill-color) !important;
}

// 顶部概览数据
.top-card {
	// 元素水平分布
	display: flex;
	justify-content: space-between;
}

.el-statistic {
	--el-statistic-content-font-size: 28px;
}

.statistic-card {
	height: 100%;
	padding: 20px;
	border-radius: 4px;
	background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	font-size: 12px;
	color: var(--el-text-color-regular);
	margin-top: 16px;
}

.statistic-footer .footer-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.statistic-footer .footer-item span:last-child {
	display: inline-flex;
	align-items: center;
	margin-left: 4px;
}

.green {
	color: var(--el-color-success);
}
.red {
	color: var(--el-color-error);
}
</style>
