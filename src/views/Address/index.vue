<template>
	<div class="page-continer">
		<div class="page-header">
			<i @click="back">
				<img src="/images/back black.png" alt="">
			</i>
			<span>收货地址</span>
		</div>
		<div class="page-content hide-scroll">
			<ul class="page-content-locat">
				<li v-for="item in addressList" :key="item.id">
					<div class='content-locat-nameLocat'>
						<span v-text="item.receiveName"></span>
						<i v-text="item.receivePhone"></i>
					</div>
					<div class='content-locat-bottom'>
						<span class='approve'> 默认</span>
						<p v-text="item.receiveRegion + item.receiveDetail">
						</p>
						<router-link :to="`/EditAddress/${item.id}`">
							<i class='iconfont icon-bianji'></i>
						</router-link>
					</div>
				</li>
			</ul>
		</div>
		<div class="page-foot">
			<div class="add-locat">
				<router-link to="/EditAddress/0">
					增加地址
				</router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
          export default {
                  name: "Address",
	          data() {
                          return {
                              addressList:[],
                          }
	          },
	          methods: {
                          back() {
                                  history.back();
                          },
	          },
	          created() {
                         this.$http({url: '/address/list'})
	                         .then(data => {
	                                 this.addressList = data;
	                         })
	          },
          };
</script>

<style scoped>
	body,html{
		overflow: hidden;
	}
	.page-continer{
		height: 100%;
		display: flex;
		flex-direction: column;
		color: #666;
		box-sizing: border-box;
		padding: 15px;
		overflow: auto;
	}
	.page-header{
		height: 45px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		font-size: 21px;
		padding: 0 3px;
	}
	.page-header i{
		width: 24px;
		height: 24px;
		margin-bottom: 12px;
		margin: 2px 0 0 0;
	}
	.page-header span{
		width: 244px;
		height: 39px;
		line-height: 39px;
		text-align: center;
		margin-left: 26px;
	}
	.page-content{
		flex-grow: 1;
		overflow: auto;
	}
	.page-content .page-content-locat{
		overflow: auto;
	}
	.page-foot{
		height: 44px;
		flex-shrink: 0;
		position: relative;
		margin-bottom: 15px;
	}
	.add-locat{
		text-align: center;
		line-height: 44px;
		font-size: 16px;
		margin: 15px 0;
		height: 44px;
		width: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		border: 1px solid #999;
	}
	ul.page-content-locat{
		overflow: auto;
		display: flex;
		flex-direction: column;
	}
	.page-content-locat li{
		height: 26.666666vw;
		font-size: 15px;
		border-bottom: 1px solid #ccc;
		color: rgb(51, 51, 51);
		padding-left: 14px;
	}
	.content-locat-nameLocat{
		height: 5.333333vw;
		display: flex;
		align-items: center;
		padding-top:5.333333vw ;
	}
	.content-locat-nameLocat span{
		flex-grow: 1;
		width: 49.333333vw;
		line-height:5.333333vw ;
	}
	.content-locat-nameLocat i{
		margin-right: 37px;
		line-height:5.333333vw ;
		text-align: right;
	}
	.content-locat-bottom{
		height: 35px;
		padding-top: 5px;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.content-locat-bottom span{
		width: 33px;
		height: 18px;
		align-self: flex-end;
		word-break: keep-all;
		border: 1px solid #B60909;
		color: #B60909;
		display: none;
	}
	.content-locat-bottom span.show{
		display: block;

	}
	.content-locat-bottom p{
		color: rgb(102, 102, 102);
		flex-grow: 1;
		font-size: 12px;
		margin-left: 10px;
		margin-right: 60px;
		overflow: hidden;
		text-emphasis: none;
		white-space: nowrap;
	}
	.content-locat-bottom i{
		color: #ccc;
		margin: 10px 16px 10px 10px;
	}
	.page-continer-new{
		background-color: #f1f1f1;
		padding: 0;
	}
	.add-message li{
		display: block;
		height: 50px;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
		box-sizing: border-box;
		padding:16px 16px;
		font-size: 13px;
		color: rgb(51, 51, 51);
	}
	.add-message li input{
		border: 0;
		outline: none;
		margin-left: 20px;
	}
	.save-locat{
		margin-top: 7px;
		height: 14.933333vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.save-locat span{
		width: 80px;
		height: 36px;
		background-color: saddlebrown;
		color: #fff;
		text-align: center;
		line-height: 36px;
		font-size: 14px;
	}
	.set-default{
		height: 52px;
		margin-top: 5px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		background-color: #fff;
	}
	.set-default input{
		width: 18px;
		height: 18px;
	}
	.set-default span{
		margin-left: 18px;
		color: rgba(0, 0, 0, 0.8);
		font-size: 13px;
	}
	.page-header-new{
		padding: 0 12px;
	}
	.del-locat{
		display: none;
		font-size: 14px;
		margin-top: 7px;
		padding-left: 18px;
		line-height: 14.933333vw;
		color: red;
		background-color: #fff;
	}
	.del-locat.show{
		display: block;
	}
</style>