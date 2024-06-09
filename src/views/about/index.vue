<template>
	<el-scrollbar height="650px">
		<div class="about-page">
			<section class="hero">
				<img src="@/assets/img/logo.png" alt="IoT-Hub-Node Logo" class="logo" />
				<h1>
					关于
					<a href="https://www.iothubnode.top" target="_blank">
						<strong>IoT-Hub-Node</strong>
					</a>
				</h1>
				<p>基于 Node.js 的开源物联网设备接入管理平台</p>
			</section>

			<section class="mission">
				<h2>平台使命</h2>
				<div class="cards">
					<div class="card" v-for="(mission, index) in missions" :key="index">
						<h3>{{ mission.title }}</h3>
						<p>{{ mission.description }}</p>
					</div>
				</div>
			</section>

			<section class="features">
				<h2>平台功能</h2>
				<div class="cards">
					<div class="card" v-for="(feature, index) in features" :key="index">
						<p>{{ feature }}</p>
					</div>
				</div>
			</section>

			<section class="team">
				<h2>团队成员</h2>
				<div class="team-members">
					<div v-for="member in teamMembers" :key="member.id" class="team-member">
						<img src="@/assets/img/author.png" :alt="member.name" />
						<h3>{{ member.name }}</h3>
						<p>{{ member.role }}</p>
					</div>
				</div>
			</section>

			<section class="contact">
				<h2>联系我们</h2>
				<p>如有任何问题或需要帮助，请随时联系我们。</p>
				<ul>
					<li>电子邮件: duruofu@iothubnode.com</li>
					<li>电话: (123) 456-7890</li>
					<li>地址: xxxxx Street Name, City, Country</li>
				</ul>
			</section>

			<section class="links">
				<h2>相关链接</h2>
				<ul>
					<li>
						<a href="https://github.com/IOTHubNode/IoT-Hub-Node" target="_blank">GitHub 仓库</a>
					</li>
					<li><a href="https://www.iothubnode.top" target="_blank">项目文档</a></li>
				</ul>
			</section>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
const teamMembers = [
	{ id: 1, name: 'Duruofu', role: '前端开发', photo: '@/assets/img/author.png' },
	{ id: 2, name: '杜若甫', role: '后端开发', photo: '@/assets/img/author.png' },
	{ id: 3, name: 'Duruofu', role: '运维支持', photo: '@/assets/img/author.png' }
	// 添加更多团队成员信息
];

const missions = [
	{ title: '高效管理', description: '提供高效的设备接入和管理解决方案。' },
	{ title: '灵活部署', description: '云端或本地私有部署，满足不同需求。' },
	{ title: '易用性', description: '简化设备管理和数据处理流程。' },
	{ title: '多接口支持', description: '支持多种通信接口，实现灵活连接。' },
	{ title: '丰富的API', description: '提供丰富的 REST API，方便开发。' },
	{ title: '未来扩展', description: '不断优化和扩展功能，支持更多场景。' }
];

const features = [
	'设备接入和管理',
	'数据存储和处理',
	'指令下发和规则引擎',
	'多种通信接口支持 ',
	'丰富的 REST API',
	'云端或本地私有部署支持'
];
</script>

<style scoped lang="scss">
.about-page {
	font-family: 'Arial, sans-serif';
	line-height: 1.6;
	//background-color: #f5f5f5;

	.hero {
		padding: 20px 20px;
		text-align: center;
		position: relative;

		.logo {
			width: 150px;
			height: auto;
		}

		h1 {
			font-size: 4em; /* 放大标题字体 */
			margin-bottom: 0.5em;
			text-align: center;
			background: linear-gradient(to right, #42b883, #35495e);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-weight: bold; /* 加粗标题 */
		}

		p {
			font-size: 1.5em;
		}
	}

	.mission,
	.features {
		margin: 40px 0;
		text-align: center;

		h2 {
			font-size: 2.5em;
			margin-bottom: 0.5em;
			background: linear-gradient(to right, #42b883, #35495e);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			text-align: center;
		}

		.cards {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 20px;

			.card {
				border: 1px solid #ddd;
				border-radius: 8px;
				padding: 20px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				flex: 1 1 calc(33.333% - 40px);
				max-width: calc(33.333% - 40px);
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				h3 {
					font-size: 1.5em;
					margin-bottom: 0.5em;
					background: linear-gradient(to right, #42b883, #35495e);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				p {
					font-size: 1.2em;
					flex-grow: 1;
				}
			}
		}
	}

	.team,
	.contact,
	.links {
		margin: 40px 0;
		text-align: center;

		h2 {
			font-size: 2.5em;
			margin-bottom: 0.5em;
			background: linear-gradient(to right, #42b883, #35495e);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			text-align: center;
		}

		p,
		ul {
			font-size: 1.2em;
			text-align: center;
		}

		ul {
			list-style: none;
			padding: 0;

			li {
				margin: 5px 0;
			}
		}

		.team-members {
			display: flex;
			flex-wrap: wrap;
			gap: 20px;
			justify-content: center;

			.team-member {
				flex: 1 1 200px;
				text-align: center;

				img {
					width: 120px; /* 调整头像大小 */
					height: 120px; /* 调整头像大小 */
					border-radius: 50%;
					margin-bottom: 10px;
				}

				h3 {
					margin: 10px 0 5px;
					font-size: 1.5em;
					text-align: center;
					background: linear-gradient(to right, #42b883, #35495e);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				p {
					font-size: 1.1em;
					text-align: center;
				}
			}
		}
	}
}
</style>
