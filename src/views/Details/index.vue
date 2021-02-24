<template>
	<div class="page">
		<div class="page-head">
			<i>
				<a href="/list/list.html">
					<img src="/images/back black.png" alt="">
				</a>
			</i>
			<ul>
				<li class="active">商品</li>
				<li>详情</li>
				<li>推荐</li>
			</ul>
			<span><img src="/images/more.png" alt=""></span>
		</div>
		<div class="container">
	        <div class="scroll-container" ref="scroll">
		        <ul class="scroll-content" ref="scrollContent">
			        <li><img :src="banner[banner.length-1]" alt="" /> </li>
			        <li v-for="item in banner">
				        <img :src="item" alt="" />
			        <li><img :src="banner[0]" alt="" /> </li>

		        </ul>
	        </div>
        </div>
	    <div class="page-content">
		<div class="good-news">
			<div class="collect_price">
				<div class="collect_price-pri" v-text="'￥' + product.price + '.00'">

				</div>
				<div class="collect_price-col">
					<i class="iconfont icon-collect"></i>
					<span>收藏</span>
				</div>
			</div>
			<div class="good-name">
				<span>MI自营</span>
			</div>
			<div class="good_brief">
				人工智能语音系统，4K HDR，内置小爱同学，海量片源
			</div>
			<div class="sub_pay">
				<span>分期</span>
				<p>可选3/6/12期</p>
				<i class="next"><img src="../Profile/img/ia_100000044.png" alt=""></i>
			</div>
			<div class="good_num" @click="shopCount">
				<span>已选</span>
				<p v-text="product.count + '件'"></p>
				<img src="../Profile/img/ia_100000044.png" alt="">
			</div>
			<div class="good_locat">
				<span>送至</span>
				<div class="locat">
					<input type="text" name="" id="" value="北京北京市海淀区清河街道">
					<em>有货</em>
				</div>
				<i class="next"><img src="../Profile/img/ia_100000044.png" alt=""></i>
			</div>
			<div class="good_delivery">
				<div class="delivery_mode">
					<i class="icon-next"></i>
					<span>满99包邮</span>
					<i class="icon-next"></i>
					<span>小米自营</span>
					<i class="icon-next"></i>
					<span>7天无理由</span>
				</div>
				<i class="next"><img src="../Profile/img/ia_100000044.png" alt=""></i>
			</div>
			<div class="good_popularity">
				<i>榜</i>
				<p>65英寸及以上销售第一名</p>
				<span class="next"><img src="../Profile/img/ia_100000044.png" alt=""></span>
			</div>
		</div>
		<div class="good-store">
			<div class="good-store_l">
				<i class="store-logo"><img src="/images/detalis/ia_100000148.jpg" alt=""></i>
				<div class="store-name">
					<span>小米</span>
					<em>自营</em>
					<p>为发烧而生 </p>
				</div>
			</div>
			<div class="good-store_r">
				<span>进入频道</span>    <i><img src="/profile/img/ia_100000044.png" alt=""></i>
			</div>
		</div>
		<div class="tab">
			<ul class="tab-title">
				<li class="active">商品详情</li>
				<li>常见问题</li>
			</ul>
			<div class="tab-content">
				<div class="active"></div>
				<div>2</div>
			</div>
		</div>
		<div class="bottom-nav">
			<div class="bottom-brand">
				<a href="/home/home.html"><i><img src="/images/detalis/ia_100000148.jpg" alt=""></i></a>
				<p>小米</p>
			</div>
			<div class="bottom-cart">
				<a href="/cart/cart.html"><i class="iconfont icon-cart"></i></a>
				<p>购物车</p>
			</div>
			<div class="cart-shop">
				<div class="bottom-add-cart">
					加入购物车
				</div>
				<div class="bottom-shop">
					立即购买
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import imagesloaded from "imagesloaded";
	import IScroll from "iscroll";
	export default {
	     name: "Detail",
	     data() {
	        return {
	                product: {},
		        banner:[]
	        }
	     },
	     methods: {

	     },
	     watch: {
	             banner() {
	                     this.$refs.scrollContent.style.width = (this.banner.length + 2)+ "00%";
	                     this.$nextTick(() => {
                                     imagesloaded(this.$refs.scrollContent, () => {
	                                     this.$nextTick(() => {
	                                          this.scroll = new IScroll(this.$refs.scroll, {
	                                                     scrollY: false,
		                                             scrollX: true,
		                                             snap: true,
		                                             momentum:false,
	                                             });
	                                          this.scroll.on("scrollStart", () => {
	                                                  clearTimeout(this.timer)
	                                          })
	                                          this.scroll.on("scrollEnd",() => {
	                                                  this.scroll.disable();
	                                                  if(this.scroll.currentPage.pageX === 0){
	                                                          this.scroll.goToPage(this.banner.length,0,0)
	                                                  }else if(this.scroll.currentPage.pageX === this.banner.length + 1){
	                                                          this.scroll.goToPage(1,0,0);
	                                                  }
                                                          else{}
                                                          this.scroll.enable();
                                                          this.timer = setTimeout(() => {this.scroll.next()},3000);
	                                          });
	                                          this.scroll.goToPage(1,0,0);
                                                     this.timer = setTimeout(() => {this.scroll.next()},3000)
	                                     })
	                             })
	                     })
	             }
	     },
	     created() {
	             this.$http({url: "/product/model/" +this.$route.params.id})
		             .then(product => {
		                     this.product = product;
		                     product.count  = 1;
		                     this.banner = this.product.bannerImgs.split(",");
		             })
	     }
	};
</script>

<style scoped>
	.container{ width:100%;}
	.scroll-container{width: 100%; overflow: hidden; touch-action: pan-x}
	ul.scroll-content{white-space: nowrap; font-size: 0}
	ul.scroll-content li { display: inline-block; width: 100vw;}
	ul.scroll-content li img{width: 100%}
	img{
		height: 100%;
		width: 100%;
	}

	.page-head{
		width: 100%;
		height: 50px;
		position: fixed;
		top: 0;
		z-index: 9;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.page-head i{
		width: 24px;
		height: 24px;
		margin-left: 8px;
	}
	.page-head span{
		width: 24px;
		height: 24px;
		margin-right: 10px;

	}
	.page-head ul li{
		display: inline-block;
		margin: 0 16px;
		font-size: 14px;
	}
	.good-news{
		background-color: #f1f1f1;
	}
	.good-news>div{
		background-color: #fff;
		padding: 0 6px 0 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.collect_price{
		height: 10.666666vw;
		margin-top: 4px;
	}
	.collect_price-pri{
		color: rgb(180, 115, 31);
		display: inline-block;
		font-size: 18px;
		font-weight: 600;
	}
	.collect_price-pri i{
		font-size: 26px;
		font-weight: 600;
		line-height: 34px;
	}
	.collect_price-col{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.icon-collect{
		font-size: 16px;
	}
	.good-name{
		height: 6.666666vw;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
	}
	.good-name span{
		text-align: center;
		color: #fff;
		background-color: rgb(233, 161, 67);
		width: 52px;
		height: 21px;
		border-radius: 12px;
		margin-top: 3px;
		line-height: 21px;
	}
	.good-name p{
		flex-grow: 1;
		font-size: 17px;
		line-height: 25px;
		color: rgb(51, 51, 51);
		font-weight: 600;
		margin-left: 12px;
	}
	.good_brief{
		padding-top: 6px;
		line-height: 24px;
		font-size: 12px;
	}
	.sub_pay{
		height: 13.333333vw;
		margin: 10px 0;
		color: rgb(51, 51, 51);
		font-size: 13px;
	}
	.sub_pay span{
		font-weight: bold;
		line-height: 21px;
		color: rgb(51, 51, 51);
		margin-right:17px ;
	}
	.sub_pay p{
		flex-grow: 1;
	}
	.next{
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
	.good_num{
		line-height: 50px;
		font-size: 14px;
	}
	.good_num span{
		color: rgb(51, 51, 51);
		font-weight: 600;
		margin-right: 12px;
	}
	.good_num p{
		flex-grow: 1;
		border-bottom: 1px solid #f1f1f1;
	}
	.good_num img{
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
	.good_locat{
		height: 21.066666vw;
	}
	.good_locat span{
		align-self: flex-start;
		line-height: 62px;
		font-weight: bold;
		font-size: 13px;
		color: rgb(51, 51, 51);
		margin-right: 26px;
	}
	.good_locat .locat{
		flex-grow: 1;
		color: rgb(51, 51, 51);
		font-size: 13px;
		line-height: 21px;
	}
	.good_locat .locat input{
		display: block;
		width: 100%;
		border: 0;
		outline: none;
	}
	.good_locat .locat em{
		color: rgb(255, 27, 27);
	}
	.good-news .good_delivery{
		height: 13.333333vw;
		background-color: #f9f9f9;
		margin-top: 10px;
	}
	.delivery_mode {
		display: flex;
		line-height: 19px;
		font-size: 11px;
		color: rgb(51, 51, 51);
	}
	.delivery_mode span{
		margin-right: 21px;
	}
	.good-news .good_popularity{
		height: 12.266666vw;
		background-color: rgb(250, 234, 237);
		margin: 10px 0;
		font-size: 14px;
	}
	.good_popularity i{
		background-color: rgb(233, 161, 67);
		color: #fff;
		text-align: center;
		width: 18px;
		height: 24px;
		border-radius: 0 0  12px 12px;
	}
	.good_popularity p{
		flex-grow: 1;
		margin-left: 24px;
		font-weight: 600;
		color: rgb(51, 51, 51);
	}
	.tab-title{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 13.333333vw;
	}
	.tab-title li{
		width: 25vw;
		text-align: center;
		line-height: 100%;
		font-size: 14px;
	}
	.tab-content{
		font-size: 0;
		padding-bottom: 50px;
	}
	.tab-title li.active{
		color: rgb(188, 124, 0);
	}
	.tab-content div{
		display: none;
	}
	.tab-content div.active{
		display: block;
	}
	.good-store{
		padding: 0 12px;
		height: 29.066666vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.good-store_l{
		display: flex;
	}
	.good-store_l .store-logo img{
		width: 39px;
		height: 39px;
	}
	.good-store_r i img{
		width: 16px;
		height: 16px;
	}
	.store-name{
		margin-left: 10px;
	}
	.store-name span{
		font-size: 15px;
		margin-bottom: 2px;
	}
	.store-name em{
		display: inline-block;
		font-size: 10px;
		width: 20px;
		height: 14px;
		margin: 0 0 6px 7px;
		padding: 2px 4px;
		color: rgb(180, 115, 31);
		border: 1px solid rgb(180, 115, 31);
	}
	.good-store_r{
		color: rgb(159, 128, 82);
		font-size: 13px;
	}
	.good-store_r span{
		margin-right: 3px;
	}
	.bottom-nav {
		height: 14.72vw;
		display: flex;
		align-items: center;
		color: rgb(48, 49, 51);
		font-size: 9px;
		font-weight: bold;
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #fff;
	}
	.bottom-nav>div{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 6px;
	}
	.bottom-nav .bottom-brand{
		width: 11.109333vw;
		height: 14.133333vw;
	}
	.bottom-brand i img{
		width: 25px;
		height: 25px;
	}
	.bottom-cart{
		height: 14.133333vw;
		width: 12.503333vw;
	}
	.icon-cart{
		font-size: 25px;
	}
	.bottom-nav .cart-shop{
		width: 68.082666vw;
		height: 11.46666vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		color: #fff;
		border-radius: 16px;
		text-align: center;
		line-height: 10.133333vw ;
		margin: 0 0 0 15px;
	}
	.bottom-nav .bottom-add-cart{
		background: linear-gradient(to right, rgb(240, 206, 123), rgb(221, 177, 81));
		border-bottom-left-radius: 19px;
		border-top-left-radius: 19px;
		height: 100%;
		flex-grow: 0.5;
	}
	.bottom-shop{
		background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
		border-bottom-right-radius: 19px;
		border-top-right-radius: 19px;
		height: 100%;
		flex-grow: 0.5;
	}
</style>