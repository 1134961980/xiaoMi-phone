<template>
	<ul class="page-foot_nav">
		<li>
			<router-link to="/home">
				<i></i><span>首页</span>
			</router-link>
		</li>
		<li>
			<router-link to="/category">
				<i></i><span>分类</span>
			</router-link>
		</li>
		<li>
			<router-link to="/taste">
				<i></i><span>品味</span>
			</router-link>
		</li>
		<li>
			<router-link to="/cart">
				<i></i><span>购物车</span>
			</router-link>
		</li>
		<li>
			<router-link to="/profile">
				<i></i><span>个人</span>
			</router-link>
		</li>
	</ul>
</template>

<script>
     export default {
             name: "MiNav"
     };
</script>

<style>
	ul.page-foot_nav{
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #fff;
	}
	.page-foot_nav li{
		height: 100%;
		display: block;
		float: left;
		width: 20%;
	}
	.page-foot_nav li a{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.page-foot_nav li a i{
		width: 24px;
		height: 24px;
		background: url(nav_bg.png) no-repeat;
		/* 在图片宽高比不变的情况下，以短的一边适应盒子 */
		background-size: cover;
	}
	.page-foot_nav li:nth-child(1) i{
		background-position: 0 0px;
	}
	.page-foot_nav li:nth-child(2) i{
		background-position: 0 22.222222%;
	}
	.page-foot_nav li:nth-child(3) i{
		background-position: 0 44.444444%;
	}
	.page-foot_nav li:nth-child(4) i{
		background-position: 0 66.666666%;
	}
	.page-foot_nav li:nth-child(5) i{
		background-position: 0 88.888888%;
	}
	/* 百分比的算法
		       参照物：容器减整个图片的差，百分比计算的分母
			小数保留6位*/
	.page-foot_nav li:nth-child(1) a.router-link-active i{
		background-position: 0 11.111111%;
	}
	.page-foot_nav li:nth-child(2) a.router-link-active i{
		background-position: 0 33.333333%;
	}
	.page-foot_nav li:nth-child(3) a.router-link-active i{
		background-position: 0 55.555555%;
	}
	.page-foot_nav li:nth-child(4) a.router-link-active i{
		background-position: 0 77.777777%;
	}
	.page-foot_nav li:nth-child(5) a.router-link-active i{
		background-position: 0 100%;
	}

	.page-foot_nav span{
		font-size: 10px;
		color: #666;
	}
</style>