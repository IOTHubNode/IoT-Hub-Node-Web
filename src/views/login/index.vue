<template>
	<div class="layout">
		<el-container>
			<el-aside :xs="0" class="aside hidden-xs-only">
				<div class="logo">
					<svg-icon name="login-img" width="360px" height="340px"></svg-icon>
				</div>
				<div class="title-1">IOT-Hub-Node</div>
				<div class="title-2">开箱即用的通用物联网平台</div>
			</el-aside>
			<el-main class="main">
				<!-- <div>
					<div class="logo">
						<svg-icon name="login-img" width="360px" height="340px"></svg-icon>
					</div>
					<div class="title-1">IOT-Hub-Node</div>
					<div class="title-2">开箱即用的通用物联网平台</div>
				</div> -->
				<el-card class="box-card">
					<div class="main-title-1 hidden-xs-only">IOT-Hub-Node</div>
					<div class="main-title-2 hidden-xs-only">开箱即用的通用物联网平台</div>
					<el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
						<el-tab-pane label="登陆" name="first">
							<el-form class="login-form" label-position="left">
								<el-form-item label="账户">
									<el-input v-model="loginData.Account" placeholder="请输入账户" />
								</el-form-item>
								<el-form-item label="密码">
									<el-input
										v-model="loginData.Password"
										type="password"
										show-password
										placeholder="请输入密码" />
								</el-form-item>
								<el-form-item label="验证码" class="centered-label">
									<el-input v-model="code" placeholder="请输入验证码">
										<template #append>
											<div class="login-code" width="100%" @click="refreshCode">
												<SIdentify :identifyCode="identifyCode"></SIdentify>
											</div>
										</template>
									</el-input>
								</el-form-item>

								<div class="login-bottom">
									<div>
										<span class="forget-password-button" @click="forgetPassword">忘记密码?</span>
									</div>
									<div>
										<el-button class="login-button" type="primary" @click="loginButton">
											登陆
										</el-button>
									</div>
									<div class="go-register">
										还没有账户?
										<span class="go-register-button">立即注册</span>
									</div>
								</div>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="注册" name="second">
							<el-form class="register-form" :label-position="labelPosition" label-width="70px">
								<el-form-item label="账户">
									<el-input v-model="registerData.Account" placeholder="请输入账户" />
								</el-form-item>
								<el-form-item label="密码">
									<el-input
										v-model="registerData.Password_1"
										type="password"
										show-password
										placeholder="请输入密码" />
								</el-form-item>
								<el-form-item label="确认密码">
									<el-input
										v-model="registerData.Password_2"
										type="password"
										show-password
										placeholder="请输入密码" />
								</el-form-item>
								<el-form-item label="邮箱">
									<el-input v-model="registerData.Email_Phone" placeholder="请输入邮箱或手机号" />
								</el-form-item>
								<div class="register-bottom">
									<div>
										<el-button class="register-button" type="primary" @click="registerButton">
											注册
										</el-button>
									</div>
								</div>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-main>
		</el-container>
	</div>
	<!-- 忘记密码组件 -->
	<foget ref="fogetP"></foget>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// 引入用户仓库
import useAccountStore from '@/stores/modules/account';
// 引入验证码组件
import SIdentify from '@/components/SIdentify/index.vue';
// 引入忘记密码组件
import foget from './components/forgetPassword.vue';
// 引入element-plus的消息提示
import { ElMessage, ElNotification } from 'element-plus';
// 引入数据类型
import type { LoginData } from '@/api/account/type';
//引入获取当前时间的函数
import { getTime } from '@/utils/time';
// 创建数据仓库
const accountStore = useAccountStore();

const activeName = ref('first');
const router = useRouter();

//随机串内容,从这里随机抽几个显示验证码
const identifyCodes = '1234567890abcdefjhijklinopqrsduvwxyz';
//验证码图片内容
const identifyCode = ref('');

//表单对齐方式
const labelPosition = ref('left');

interface RegisterData {
	Account: string;
	Password_1: string;
	Password_2: string;
	Email_Phone: string;
	Code: string;
	Check: boolean;
}

// 定义登陆表单数据
const loginData: LoginData = reactive({
	Account: '1234',
	Password: '1234'
});

// 验证码
const code = ref('');

// 定义注册表单数据
const registerData: RegisterData = reactive({
	Account: '',
	Password_1: '',
	Password_2: '',
	Email_Phone: '',
	Code: '',
	Check: false
});

// 定义登陆方法
const loginButton = async () => {
	// 判断验证码是否正确
	if (code.value !== identifyCode.value) {
		ElMessage.error('验证码错误，请重新输入！');
		// 刷新
		refreshCode();
		return;
	}
	// 临时校验,账户密码不为控
	if (!loginData.Account || !loginData.Password) {
		ElMessage.error('账户或密码不能为空！');
		return;
	}
	//调用登陆方法
	try {
		await accountStore.accountLogin(loginData);
		// 路由跳转
		router.push('/home/sysview');
		ElNotification({
			title: `HI,${getTime()}好!`,
			message: '登陆成功!',
			type: 'success'
		});
	} catch (error) {
		ElMessage.error('登录时出现错误，请重试！');
	}
};

// 定义注册方法
const registerButton = async () => {
	//const res = await register(registerData);
	//console.log(res);
};

//获取验证码的值
const makeCode = (l: number) => {
	for (let i = 0; i < l; i++) {
		//通过循环获取字符串内随机几位
		//identifyCode.value += identifyCodes[randomNum(0, this.identifyCodes.length)];
		identifyCode.value += identifyCodes[Math.floor(Math.random() * identifyCodes.length)];
	}
};

// 重置验证码
const refreshCode = () => {
	identifyCode.value = '';
	code.value = '';
	makeCode(4);
};

// 定义忘记密码组件的引用
const fogetP = ref();
// 忘记密码方法
const forgetPassword = () => {
	console.log('忘记密码');
	// 打开忘记密码组件
	fogetP.value.open();
};

// ------------生命周期函数-------
// 组件挂载完毕
onMounted(() => {
	refreshCode(); // 重置验证码
});
</script>

<style scoped lang="scss">
.layout {
	width: 100%;
	height: 100vh;

	// 侧面
	.aside {
		// 阴影
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 40%;
		height: 100vh;
		background: linear-gradient(135deg, #5bdf82, #47caff);

		// 圆角
		border-radius: 1%;
		box-shadow: 0 0 5px 1px #999;

		.logo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 65%;
			margin-top: -160px;

			.svg-icon {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: -100px;
			}
		}

		.title-1 {
			font-size: 46px;
			font-weight: bold;
			background: linear-gradient(135deg, #3777b7, #449d42);
			background-clip: text;
			-webkit-background-clip: text; /*将设置的背景颜色限制在文字中*/
			-webkit-text-fill-color: transparent; /*给文字设置成透明*/
		}
		.title-2 {
			margin-top: 15px;
			font-size: 40px;
			font-weight: bold;
			color: #3e3f43;
		}
	}

	// 主内容
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 60%;
		height: 100vh;

		// 强制去除原有padding，使el-aside和el-main贴合
		padding: 0 !important;
		background-color: #fff;

		.main-title-1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 10px;
			margin-bottom: 10px;
			font-size: 25px;
			font-weight: bold;
		}

		.main-title-2 {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 2px;
			margin-bottom: 2px;
			font-size: 13px;
			color: #7a7373;
		}

		.box-card {
			width: 55%;
			height: 70%;

			// 登陆表单
			.login-form {
				width: 80%;
				margin: 0 auto;

				.el-form-item {
					margin: 20px auto;
				}

				// 底部外壳
				.login-bottom {
					width: 100%;

					.forget-password-button {
						float: right;
						margin-top: -5px;
						margin-right: 10px;
						margin-bottom: 10px;
						font-size: 13px;
						color: #0960bd;
						cursor: pointer; /* 鼠标悬停变小手 */
					}

					.login-button {
						width: 100%;
						height: 36px;
						margin-bottom: 10px;
					}

					.go-register {
						display: flex;
						justify-content: center; /* 水平居中 */
						margin: auto 0;
						font-size: 13px;

						.go-register-button {
							margin-left: 5px;
							color: #0960bd;
							cursor: pointer; /* 鼠标悬停变小手 */
						}

						.register-button {
							width: 100%;
							height: 36px;
							margin-bottom: 10px;
						}
					}
				}
			}

			// 注册表单
			.register-form {
				width: 80%;
				margin: 0 auto;

				.el-form-item {
					margin: 10px auto;
				}

				// 底部外壳
				.register-bottom {
					width: 100%;

					// 注册按钮
					.register-button {
						width: 100%;
						height: 36px;
						margin-bottom: 10px;
					}
				}
			}
		}
	}
}
</style>
