<template>
	<div class="page-continer page-continer-new">
		<div class="page-header page-header-new">
			<i @click="back">
				<img src="/images/back black.png" alt="">
			</i>
			<span>收货地址</span>
		</div>
		<div class="page-content">
			<ul class="add-message">
				<li>
					<span>收获人姓名</span>
					<input type="text" v-model="address.receiveName"   id="name" placeholder="请输入收货人姓名" class="receiveName">
				</li>
				<li>
					<span>手机号码</span>
					<input type="text" v-model="address.receivePhone"   id="phone" placeholder="请输入收货人电话" class="receivePhone">
				</li>
				<li>
					<span>所在地区</span>
					<input type="text"  v-model="address.receiveRegion"  id="locat" placeholder="请输入所在省/市/区/街道" class="receiveRegion regions-picker">
				</li>
				<li>
					<span>详细地址</span>
					<input type="text" v-model="address.receiveDetail"   id="small-locat" placeholder="请输入街道地址" class="receiveDetail">
				</li>
			</ul>
			<div class="set-default">
				<input type="checkbox" class="checkbox" :checked="address.isDefalut">
				<span>设为默认地址</span>
			</div>
			<div class="del-locat" @click="delAddress"   v-show="show !=0">
				删除收货地址
			</div>
			<div class="save-locat">
				<span class="save-data" @click="editAddress" v-show="show !=0">保存</span>
				<span class="save-data" @click="saveAddress" v-show="show ==0">保存</span>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
    export default {
            name:"EditAddress",
	    data() {
                    return {
                            address : {
                                    receiveName:"",
                                    receivePhone:"",
                                    receiveRegion:"",
                                    receiveDetail: "",
                            },
	                    show: this.$route.params.id,
                    }
	    },
	    methods:{
                  delAddress() {
                          this.$confirm("确定删除该地址？")
	                          .then( () =>{
                                          this.$http({url: '/address/remove/' + this.$route.params.id})
	                                          .then(data => {this.$router.replace("/Address")})
		                          }
	                          )
                  },
                  saveAddress() {
                          this.$confirm("确定增加改地址？")
	                          .then(() => {
                                          this.$http({
                                                  url:"/address/add",
                                                  method: "post",
                                                  data: {
                                                          receiveName:this.address.receiveName,
                                                          receivePhone:this.address.receivePhone,
                                                          receiveRegion:this.address.receiveRegion,
                                                          receiveDetail: this.address.receiveDetail
                                                  }
                                          })
	                                          .then(data => {
	                                                  this.$router.go(-1)
	                                          })
	                          })
            },
                  editAddress() {
                            this.$confirm("确定修改该地址?")
                                    .then(() =>{
                                            this.$http({
                                                    url: "/address/update",
	                                            method: "post",
                                                    data: {
                                                            id: this.$route.params.id,
                                                            receiveName: this.address.receiveName,
                                                            receivePhone: this.address.receivePhone,
                                                            receiveRegion: this.address.receiveRegion,
                                                            receiveDetail: this.address.receiveDetail
                                                    }
                                            }).then(data =>{
                                                    this.$router.go(-1)
                                            });
                                    })
                    },
		  back() { history.back()}
            },
            created() {
                    if(this.$route.params.id){
                            this.$http({
                                    url: '/address/model/' + this.$route.params.id,
                            })
                                    .then(data =>{
                                                    Object.assign(this.address, data);
                                    })
                    }
            }
    };
</script>

<style  scoped>
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
		font-size: 14px;
		margin-top: 7px;
		padding-left: 18px;
		line-height: 14.933333vw;
		color: red;
		background-color: #fff;
	}

</style>