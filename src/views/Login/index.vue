<template>
    <div>
	    <h1>欢迎登陆小米有品</h1>
	    <div v-show="loginMode" class="login-phone">
		    <input class="phone" type="text" v-model.trim="login.name" placeholder="请输入用户名">
		    <input class="code" type="password" v-model="login.password" placeholder="请输入密码">
		    <button class="btn-login-phone" @click="login_up">登录</button>
		    <button class="btn-toggle"  @click="loginMode = !loginMode"
		            v-text="loginMode ? '手机验证码登录': '用户名密码登录'"></button>
	    </div>
	    <div v-show="!loginMode" class="login-pwd">
		    <input type="text" v-model.trim="login.name">
		    <input type="password" v-model="login.password">
		    <button class="btn-login-pwd">登录</button>
		    <button class="btn-toggle"  @click="loginMode = !loginMode"
		            v-text="loginMode ? '手机验证码登录': '用户名密码登录'"></button>
	    </div>
	    <div class="else-logo">
	    <div class="else-login">
		    <div class="else-title"><i></i><span>其它方式登录</span><i></i></div>
		     <div class="logo">
			     <a href="#"><img src="/images/Aipay (1).png" alt=""></a>
			     <a href="#"><img src="/images/weChat.png" alt=""></a>
			     <a href="#"><img src="/images/xinlang.png" alt=""></a>
			     <a href="#"><img src="/images/apple.png" alt=""></a></div>
		     </div>
	    </div>
	    <div class="bottom-nav">
		    <a href="#"><span>简体</span></a><i></i>
		    <a href="#"><span>繁体</span></a><i></i>
		    <a href="#"><span>English</span></a><i></i>
		    <a href="#"><span>常见问题</span></a><i></i>
		    <a href="#"><span>隐私政策</span></a>
	    </div>
    </div>
</template>

<script type="text/ecmascript-6">

	export default {
	        name: "Login",
                data() {
                        return{
                                login:{
                                        name:"",
                                        password:""
                                },
                                loginMode:true
                        }
                },
                methods:{
                        login_up() {
                                this.$http({
	                                method:"post",
                                        url:"/user/login_pwd",
                                        data:{
                                                name:this.login.name,
                                                pwd:this.login.password
                                        }
                                })
                                        .then(data => {
                                                sessionStorage.setItem("token",data);
                                                sessionStorage.setItem("name",this.login.name);
                                                this.$router.replace(this.$route.query.to || "/profile")
                                        })
                        }

                }
	};
</script>

<style scoped>
	body{
		background: url(login.png) no-repeat center;
		background-size: 100% 100%;
	}
	h1{
		margin: 0 auto;
		padding: 60px 0 10px 0;
		width: 75.466666vw;
		height: 15.733333vw;
		text-align: center;
		line-height: 15.733333vw;
	}
	.login-phone, .login-pwd{
		width: 75.466666vw;
		height: 15.733333vw;
		margin: 0 auto;
	}
	input{
		width: 100%;
		height: 4.8vw;
		padding: 15.75px 8px 14px;
		border: 0;
		outline: none;
		border-bottom: 1px solid #999;
		color: black;
		background-color: #fff;
	}
	.btn-login-phone,.btn-toggle,.btn-login-pwd{
		display: block;
		width: 100%;
		height: 12.533333vw;
		margin: 48px 0 14px 0;
		line-height: 44px;
		border-radius: 24px;
		border: 0;
		font-size: 14px;
		background: linear-gradient(to right, #E4BB7E, #D1A96E );
		outline: none;
		color: #fff;
		font-weight: bold;
	}
	.btn-toggle{
		margin-top: 0%;
		background: rgba(0,0,0,.06);
		color: #666;
	}
	.else-login{
		position: fixed;
		bottom: 31.933333vw;;
		height: 17.866666vw;
		width: 95.466666vw;
		left: 50%;
		transform: translateX(-50%);
	}
	.else-login .else-title{
		height: 7.733333vw;
		display: flex;
		align-items: center;
		color: #666;
		font-size: 14px;
	}
	.else-title i{
		height: 1px;
		background-color: #ccc;
		flex-grow: 1;
	}
	.else-logo{
		height: 10.133333vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.else-logo img{
		width: 28px;
		height: 28px;
		margin: 10px 10px 0;
	}
	.bottom-nav{
		height: 20.933333vw;
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.bottom-nav a{
		height: 4.8vw;
		line-height: 4.8vw;
		padding:0 13px;
	}
	.bottom-nav i{
		height: 14px;
		width: 1px;
		background-color: #ccc;
		margin-top: 3px;
	}
	.logo{
		display: flex;
		justify-content: center;
	}
</style>