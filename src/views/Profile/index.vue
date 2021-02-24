<template>
	<div class="profile">
		<div class="page-continer">
			<div class="page-header">
				<div class="page-header_user">
					<a @click="toLogin">
						<img src="./img/ia_100000026.png" alt="" />
						<span class="user-name" v-text="token ? name:'请登录'"></span>
					</a>
				</div>
				<i v-show="token"><a href="/login/login.html"><img src="./img/ia_100000044.png" class="login-icon" alt=""/></a href="/login/login.html"></i>
			</div>
			<div class="page-content">
				<div class="order">
					<router-link to="../Order"><span>我的订单</span></router-link>
					<i><img src="./img/ia_100000044.png" alt=""></i>
				</div>
				<div class="page-content_serve">
					<ul>
						<li>
							<a href="#">
								<i><img src="./img/ia_100000029.png" alt=""></i>
								<span>待付款</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i><img src="./img/ia_100000030.png" alt=""></i>
								<span>待收款</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i><img src="./img/ia_100000031.png" alt=""></i>
								<span>评价</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i><img src="./img/ia_100000032.png" alt=""></i>
								<span>退款/售后</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="page-content_menu">
					<ul>
						<li>
							<div><a href="#">
								<i><img src="./img/ia_100000033.png" alt=""></i>
								<span>我的资产</span>
							</a>
							</div>
							<em><img src="./img/ia_100000044.png" alt=""></em>
						</li>
						<li>
							<div><a href="#">
								<i><img src="./img/ia_100000035.png" alt=""></i>
								<span>我的收藏</span>
							</a>
							</div>
							<em><img src="./img/ia_100000044.png" alt=""></em>
						</li>
						<li>
							<div><router-link to="../Address">
								<i><img src="./img/ia_100000037.png" alt=""></i>
								<span>地址管理</span>
							</router-link>
							</div>
							<em><img src="./img/ia_100000044.png" alt=""></a></em>
						</li>
						<li>
							<div><a href="#">
								<i><img src="./img/ia_100000039.png" alt=""></i>
								<span>资质证照</span>
							</a>
							</div>
							<em><img src="./img/ia_100000044.png" alt=""></em>
						</li>
						<li>
							<div><a href="#">
								<i><img src="./img/ia_100000041.png" alt=""></i>
								<span>协议规则</span>
							</a>
							</div>
							<em><img src="./img/ia_100000044.png" alt=""></em>
						</li>
						<li>
							<div><a href="#">
								<i><img src="./img/ia_100000043.png" alt=""></i>
								<span>帮助与反馈</span>
							</a>
							</div>
							<em><img src="./img/ia_100000044.png" alt=""></em>
						</li>
					</ul>
				</div>
				<div class="exit">
					<button @click="toLogin"  v-show="token">退出</button>
				</div>
			</div>
			<div class="page-foot">
				<mi-nav></mi-nav>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from  "axios"
	import MiNav from "../../components/mi-nav"

	export default {
	        name:"Profile",
		components:{
	                "mi-nav": MiNav
		},
                data: function(){
                        return {
                                token:sessionStorage.getItem("token"),
                                name: sessionStorage.getItem("name")
                        }
                },
                methods:{
                        toLogin(){
                                sessionStorage.clear("token")
                                this.$router.push({path:'/login'})
                        }
                }
	};
</script>

<style scoped>
	.profile{
		width: 100%;
		overflow: hidden;
		height: 100%;
	}
	.profile .page-continer{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.profile .page-header{
		height: 99px;
		padding: 0 30px 0  30px;
		background-color: saddlebrown;
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
	}
	.profile .page-header .page-header_user a{
		color: #fff;
	}
	.profile .page-header_user img{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.profile .page-header i{
		width: 18px;
		height: 18px;
	}
	.profile .page-header i img{
		width: 100%;
		height: 100%;
	}
	.profile .page-content{
		margin-top: 0;
		flex-grow: 1;
		border-top: 5px solid #eeeeee;
		border-bottom: 1px solid #eeeeee;
		font-size: 14px;
		color:#666;
		display: flex;
		flex-direction: column;
		padding: 0;
	}
	.profile .page-content .order{
		padding: 0 20px 0 20px;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.profile .order i{
		width: 15px;
		height: 15px;
	}
	.profile .order i img{
		width: 100%;
		height: 100%;
	}
	.profile .page-content_serve ul{
		height: 69px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 5px solid #eeeeee;
		border-top: 1px solid #eeeeee;
	}
	.profile .page-content_serve li{
		width: 25%;
		height: 100%;
	}
	.profile .page-content_serve li a{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width:100%;
		height: 100%;
	}
	.profile .page-content_serve li i{
		display: block;
		width: 40px;
		height: 40px;
	}

	.profile .page-foot{
		height: 50px;
		flex-shrink: 0;
	}
	.profile .page-content_menu ul{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.profile .page-content_menu ul li{
		height: 49px;
		border-bottom: 1px solid #eeeeee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px 0 20px;
	}
	.profile .page-content_menu ul li a{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content:center;
		align-items: center;
	}
	.profile .page-content_menu li a i{
		display: inline-block;
		width: 38px;
		height: 38px;
	}
	.profile .page-content_menu li em{
		width: 15px;
		height: 15px;
	}
	.profile .page-content_menu li:nth-child(3){
		border-bottom: 5px solid #eeeeee;
	}
	.profile .exit{
		flex-grow: 1;
		height: 45px;
		display: flex;
		justify-content: center;
		background-color: #f1f1f1;
	}
	.profile .exit button{
		outline: none;
		background-color: #fff;
		color: #333;
		width: 100px;
		margin: 5px 0 0 0;
		height: 45px;
		text-align: center;
		line-height: 45px;
		border: 0ch;
	}
</style>