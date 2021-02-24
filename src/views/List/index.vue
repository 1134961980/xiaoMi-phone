<template>
	<div class="page-continer">
		  <i class="Rocket"></i>
		<div class="page-header">
			<i><a href="/category/category.html"><img src="/images/back black.png" alt=""></a></i>
			<input type="text" class="page-header-search">
			<em ><img @click="showMode=!showMode" src="/images/category.png" alt=""></em>
		</div>
		<div class="page-nav">
			<ul class="page-nav-title">
				<li class="orderDir">
					<span>排序</span>
					<i class="iconfont icon-paixufan-copy" @click="changeOrderDir"></i>
				</li>
				<li class="orderCol" :class="{active: this.orderCol==='price'}"  @click="changeOrderCol('price')">
					<span>价格</span>
				</li>
				<li class="orderCol" :class="{active: this.orderCol==='sale'}"   @click="changeOrderCol('sale')">
					<span>销量</span>
				</li>
				<li class="orderCol" :class="{active: this.orderCol==='rate'}"   @click="changeOrderCol('rate')">
					<span>热度</span>
				</li>
			</ul>
		</div>
		<div class="page-content" ref ="scroll">
			<div class="scroll-content">
				<ul class="goods-list">
				<li  v-for="item in list"  :keys="item.id"  :class="{change: showMode}">
					<router-link :to="`/Details/${item.id}`">
						<img class="avatar" :src="item.avatar" />
						<div class='good-news'>
							<div class='name' v-text="item.name"></div>
							<div class='brief'  v-text="item.brief"></div>
							<div class='good-price'>
								<span class='price' v-text="`￥${item.price}`"></span>
							</div>
							<div class='sale' v-text="`销量：${item.sale}`"></div>
							<div class='good-rate'>
								<span v-text="`${item.rate}条评论`"></span>
								<i>好评：98%</i>
							</div>
						</div>
					</router-link>
				</li>
			</ul>
			        <p v-text="info"></p>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import IScroll from "iscroll/build/iscroll-probe";
	import imagesLoaded from  "imagesloaded";

	export default {
	        name:"List",
                data (){
                        return {
                                name:"",
                                list:[],
	                        cid: parseInt(this.$route.params.cid),
                                showMode:false,
                                orderCol: "price",
                                orderDir: "asc",
	                        pageSize:6,
	                        isLoading:false,
	                        hasMore:true,
	                        isTriggerLoadMore:false
                        }
                },
		beforeDestroy(){
                     this.scroll.destroy();
                     this.scroll = null;
		},
                methods: {
                        changeOrderCol(col){
                                if(this.isLoading) {
                                        this.$notice("亲，您的操作太频繁了");
                                        return
                                }
                                this.orderCol = col;
                                this.getData()
                        },
                        changeOrderDir(){
                                if(this.isLoading) {
                                        this.$notice("亲，您的操作太频繁了");
                                        return
                                }
                                this.orderDir=  this.orderDir == 'asc' ? 'desc' : 'asc';
                                this.getData()
                        },
                        searchHandler() {
                                if(this.isLoading){
                                        alert("亲，您的操作太频繁了");
                                        return;
                                }
                                this.getData();
                        },
                        getData(isLoadMore = false) {
                                if(!isLoadMore) this.list = [];
                                this.isLoading = true;
                                this.$http({
                                        url:"/product/list",
                                        method:"post",
                                        data: {
                                                name:"",
                                                cid:"17",
                                                orderCol: this.orderCol,
                                                orderDir: this.orderDir,
                                                begin:isLoadMore? this.list.length : 0,
                                                pageSize: this.pageSize
                                        }
                                })
	                                .then( data => {
                                                this.list =  this.list.concat(data);
                                                this.hasMore = data.length === this.pageSize;
                                                this.isLoading = false;
	                                })

                        },
                        initOrRefreshScroll: function(){
                                this.$nextTick(() =>{
                                        imagesLoaded(this.$refs.scroll, () =>{
                                                this.$nextTick(() =>{
                                                        if(!this.scroll){
                                                                this.scroll = new IScroll(this.$refs.scroll, {
                                                                        deceleration: 0.003,
	                                                                click:true,
                                                                        bounce: false,
                                                                        probeType: 2
                                                                });
                                                                this.scroll.on("scroll", () =>{
	                                                                if(this.isLoading || !this.hasMore) return;
	                                                               this.isTriggerLoadMore = this.scroll.y === this.scroll.maxScrollY;
                                                                })
                                                                this.scroll.on("scrollEnd", () =>{
	                                                                if(this.isTriggerLoadMore) {
	                                                                        this.isTriggerLoadMore = false
	                                                                        this.getData(true);
	                                                                }
                                                                })
                                                        }else{
                                                                this.scroll.refresh();
                                                        }
                                                })
                                        })
                                })
                        },
	                gotoTop() {
                                this.scroll.scrollTo(0,0,400)
	                }
                },
                computed: {
                     info() {
                             if(this.isLoading) return "加载中...";
                             else if(this.isTriggerLoadMore) return "放手立即加载...";
                             else if(this.hasMore) return "上拉加载更多...";
                             else if(this.list.length === 0) return "暂无更多商品，敬请期待"
	                     else return "没有更多商品了哦..."
                     }
                },
                created (){
                      this.getData()
                },
		watch: {
                        showMode() {
                                this.initOrRefreshScroll()
                        },
			list() {
                                this.initOrRefreshScroll()
			}
		}
	}
</script>

<style scoped>
	body,html{
		overflow: hidden;
	}
	.page-continer{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.rocket{
		position: fixed;
		bottom: 36px;
		right: 24px;
	}
	.page-content{
		overflow: hidden;   /* iscroll插件要求的*/
		touch-action: pan-y;  /* 消除iscroll的警告*/
	}
	ul.goods-list{
		background-color: #f1f1f1;
		overflow: auto;
		width: 100%;
	}
	.page-header{
		height: 11.733333vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}
	.page-header i,em{
		width: 24px;
		height: 24px;
		margin-left: 8px;
	}
	.page-header em{
		margin-right: 8px;
	}
	.page-header-search{
		width: 71.733333vw;
		height: 36px;
		background-color: rgb(244, 244, 244);
		border-radius: 20px;
		box-sizing: border-box;
		padding-left: 16px;
		outline: none;
		border: 0;
		margin: 0 6px;
	}
	.page-nav-title{
		display: flex;
		flex-shrink: 0;
	}
	.page-nav li{
		width: 25%;
		height: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(51, 51, 51);
		font-size: 14px;
	}

	.page-nav li.active{
		font-weight: 600;
		color: rgb(180, 115, 31);
	}
	ul.goods-list li{
		height: 49.333333vw;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		background-color: #fff;
	}
	ul.goods-list li.change{
		width: 45.6vw;
		height: 76.266666vw;
		display: block;
		float: left;
		border-radius: 12px;
		margin: 10px 0;
		padding: 0;
		margin-right: 5px;
		margin-left: 9px;
	}
	ul.goods-list li img{
		width: 33.6vw;
		height: 33.6vw;
	}
	ul.goods-list li a{
		width: 100%;
		height: 100%;
	}
	ul.goods-list .change img{
		height: 45.6vw;
		width: 100%;
	}
	.good-news{
		padding-left: 8px;
		width: 58.4vw;
		float: right;
	}
	.change .good-news{
		float: none;
		width: 100%;
	}
	.change .name{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.change .brief {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.good-news .name{
		color: rgb(51, 51, 51);
		font-size: 14px;
	}
	.good-news .brief{
		color: rgb(136, 136, 136);
		font-size: 11px;
		margin-top: 3px;
	}

	.good-news .good-price{
		margin: 6px 0;
	}
	.good-news .price{
		color: rgb(250, 79, 11);
		font-size: 17px;
	}
	.good-news .good-rate{
		margin: 6px 0;
		display: flex;
		justify-content: space-between;
	}
	.good-rate i{
		margin-right: 16px;
	}

</style>