<template>
	<div class="cart">
		<div class="cart-continer">
			<div class="cart-head">
				<div class="head_title">
					<i @click="$router.back()"><img src="./img/back black.png" alt=""></i>
					<span>购物车</span>
					<em @click="isEdit = !isEdit" v-text="isEdit ? '完成':'编辑'"></em>
				</div>
			</div>
			<div class="cart-content" v-if="list.length > 0">
				<div class="content_title">
					<div class="content_title_l">
						<i class="good_checkbox"></i>
						<span>小米自营</span>
					</div>
					<div class="content_title_r">
						<i></i>
						<span>已免运费</span>
					</div>
				</div>
				<div class="good" v-for="item in list" :key="item.id">
					<i class="good_checkbox" v-show="!isEdit" :class="{checked:item.checked1}" 	@click="item.checked1=!item.checked1"></i>
					<i class="good_checkbox" v-show="isEdit"  :class="{checked:item.checked2}" @click="item.checked2=!item.checked2"></i>
					<img :src="`http://localhost:3000${item.avatar}`" alt="" class="good_avatar" />
					<div class="good_news">
						<div class="good_name" v-text="item.name">
						</div>
						<div class="good_priceCount">
							<div class="good_price">
								<i>￥</i>
								<span class="price" v-text="item.price"></span>
							</div>
							<ul class="good_count">
								<mi-count :count="item.count" @increase="increaseHandler(item.id)"
								          @decrease="decreaseHandler(item.id)"></mi-count>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<p v-else>暂无相关商品</p>
			<div class="cart-foot" v-show="!isEdit">
				<div class="cart-all_chose">
					<i class="good_checkbox" :class="{checked:isAllCheck}"  @click="toggleAllCheck"></i>
					<span>全选</span>
				</div>
				<div class="cart_all_price">
					<span>合计:</span> <em><i class="all_price"  v-text="`￥${total}.00`"></i></em>
					<p>活动优惠￥250.00</p>
				</div>
				<div class="cart_account">
					结算(<i class="all_count" v-text="`${amount}`">0</i>)
				</div>
			</div>
			<div class="cart-foot" v-show="isEdit">
				<div class="cart-all_chose">
					<i class="good_checkbox" :class="{checked:isAllCheck}"  @click="toggleAllCheck"></i>
					<span>全选</span>
				</div>
				<div class="cart_del" @click="delGood">
					删除(<i class="all_del" v-text="`${amount}`"></i>)
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
      import  axios from 'axios';
      import  MiCount from '../../components/mi-count'

      export default {
              name: 'Cart',
              data: function(){
                      return {
                              show: true,
                              list: [],
                              isEdit: false
                      }
              },
	      components: {
                      "mi-count": MiCount
	      },
              methods: {
                      toggleAllCheck: function(){
                              var flag = this.isAllCheck;
                              this.list.forEach(item => item[this.isEdit?"checked2":"checked1"] = !flag)
                      },
                      increaseHandler: function(id){
                              this.list.forEach(item =>{
                                      if(item.id == id){
                                              axios({
                                                      method: "post",
                                                      url: "/cart/increase/" + id,
                                                      headers: {
                                                              "Authorization": sessionStorage.getItem("token")
                                                      }
                                              })
                                                      .then(response =>{
                                                              if(response.status === 200){
                                                                      switch(response.data.code){
                                                                              case 200:
                                                                                      ++item.count;
                                                                                      break;
                                                                              case 401:
                                                                                      sessionStorage.removeItem("token");
                                                                                      sessionStorage.removeItem("name");
                                                                                      this.$routerr.replace({
                                                                                              path: "/login",
                                                                                              query: {to: this.$route}
                                                                                      });
                                                                                      break;
                                                                              case 199:
                                                                              case 404:
                                                                              case 500:
                                                                                      alert(response.data.msg)
                                                                      }
                                                              }
                                                      })
                                      }
                              })
                      },
                      decreaseHandler: function(id){
                              this.list.forEach(item =>{
                                      if(item.id == id){
                                              axios({
                                                      method: "post",
                                                      url: "/cart/decrease/" + id,
                                                      headers: {
                                                              "Authorization": sessionStorage.getItem("token")
                                                      }
                                              })
                                                      .then(response =>{
                                                              if(response.status === 200){
                                                                      switch(response.data.code){
                                                                              case 200:
                                                                                      --item.count;
                                                                                      break;
                                                                              case 199:
                                                                              case 404:
                                                                              case 401:
                                                                              case 500:
                                                                                      alert(response.data.msg)
                                                                      }
                                                              }
                                                      })
                                      }
                              })
                      },
                      delGood: function(){
                              var good_del = [];
                              var i = 0;
                              this.list.forEach(item =>{
                                      if(item.checked2){
                                              good_del[i] = item.id;
                                              var j = this.list.findIndex(item);
                                              this.list.splice(j, 1)
                                              i++;
                                      }
                              })

                              axios({
                                      method: "post",
                                      url: "/cart/remove",
                                      headers: {
                                              "Authorization": sessionStorage.getItem("token")
                                      },
                                      data: {
                                              ids: good_del
                                      }
                              })
                                      .then(response =>{
                                              if(response.status === 200){
                                                      switch(response.data.code){
                                                              case 200:
                                                                      break;
                                                              case 199:
                                                              case 404:
                                                              case 401:
                                                              case 500:
                                                                      alert(response.data.msg)
                                                      }
                                              }
                                      })

                      }
              },
              computed: {
                      // 总价格
                      total: function(){
                              var result = 0;
                              this.list.forEach(item =>{
                                      if(item.checked1) result += item.price * item.count;
                              });
                              return result;
                      },
                      amount: function(){
                              var result = 0;
                              this.list.forEach(item =>{
                                      if((!this.isEdit) && item.checked1) result += item.count;
                                      if((this.isEdit) && item.checked2) result += item.count;
                              });
                              return result;
                      },
                      isAllCheck: function(){
                              if(this.isEdit){
                                      return this.list.every(item => item.checked2)
                              }else{
                                      return this.list.every(item => item.checked1)
                              }
                      }
              },
              created: function(){
                      axios({
                              method: "post",
                              url: "/cart/list",
                              headers: {
                                      "Authorization": sessionStorage.getItem("token")
                              }
                      })
                              .then(response =>{
                                      if(response.status === 200){
                                              switch(response.data.code){
                                                      case 200:
                                                              response.data.data.forEach(item =>{
                                                                      item.checked1 = true;
                                                                      item.checked2 = false;
                                                              })
                                                              this.list = response.data.data;
                                                              break;
                                                      case 199:
                                                      case 404:
                                                      case 401:
                                                      case 500:
                                                              alert(response.data.msg)
                                              }
                                      }
                              })
              }
      }
</script>

<style scoped>
	.cart{
		width: 100%;
		height: 100%;
	}
	.cart-continer{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #f1f1f1;
	}
	.cart-head{
		height: 48vw;
		background: url(img/cart-bac.png) no-repeat center;
		background-size: 100%;
		flex-shrink: 0;
	}
	.head_title{
		height: 23.466666vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
	}
	.head_title i{
		width: 24px;
		height: 24px;
		margin-left: 8px;
	}
	.head_title span{
		font-size: 20px;
	}
	.head_title em{
		font-size: 14px;
		margin: 5px 19px 5px 10px;
		border-bottom-left-radius: 20px;
	}
	.cart-content{
		flex-grow: 1;
		margin: 0 auto;
		width: 94.666667vw;
		background-color: #fff;
		margin-top: -24.533333vw;
		border-radius: 16px;
		overflow: auto;
		box-sizing: border-box;
		padding: 0 10px;
	}
	.cart_null{
		position: absolute;
		height: 66.133333vw;
		top: 80px;
		left: 0;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f1f1f1;
	}
	.cart_null img{
		width: 24vw;
		height: 24vw;
	}
	.cart_null i{
		margin-top: 13px;
		color: rgb(102, 102, 102);
		font-size: 12px;
	}
	.cart_null span{
		height: 35px;
		width: 69px;
		border-radius: 16px;
		border: 1px solid #666;
		text-align: center;
		line-height: 35px;
		margin-top: 14px;
	}
	.cart .content_title{
		height: 11.733333vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 3px;
	}
	.cart .content_title_l{
		font-size: 14px;
		color: rgb(51, 51, 51);
	}
	.cart .content_title_r{
		font-size: 11px;
		color: rgb(102, 102, 102);
		padding-left: 4px;
		line-height: 44px;
	}
	.cart .cart-foot{
		width: 100vw;
		height: 14.4vw;
		background-color: #fff;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 10px;
	}
	.cart .cart-all_chose span{
		font-size: 13px;
		color: rgb(51, 51, 51);
	}
	.cart .cart_all_price{
		flex-grow: 1;
		text-align: right;
	}
	.cart .cart_all_price span{
		font-size: 13px;
		color: #000;
		font-weight: 600;
	}
	.cart .cart_all_price em{
		font-size: 16px;
		color: rgb(191, 17, 17);
	}
	.cart .cart_all_price p{
		color: rgb(191, 17, 17);
		font-size: 10px;
	}
	.cart .cart_account{
		background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
		color: #fff;
		border-radius: 19px;
		width: 25.6vw;
		height: 10.10333vw;
		text-align: center;
		line-height: 10.103333vw;
		font-size: 15px;
		font-weight: 600;
	}
	.cart .cart_del{
		background: linear-gradient(to right, rgb(240, 78, 46), rgb(213, 16, 16));
		color: #fff;
		border-radius: 19px;
		width: 25.6vw;
		height: 10.10333vw;
		text-align: center;
		line-height: 10.103333vw;
		font-size: 15px;
		font-weight: 600;
		position: absolute;
		right: 10px;
	}

	.cart .good{
		height: 22.933333vw;
		margin-top: 10px;
		display: flex;
		align-items: center;
	}
	.cart .good i{
		flex-shrink: 0;
	}
	.cart .good .good_avatar{
		height: 22.933333vw;
		width:  22.933333vw;
		margin:0 10px;
		flex-shrink: 0;
	}
	.cart .good .good_news{
		height: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.cart .good_news .good_name{
		height: 10.666666vw;
		width: 55.466666vw;
		font-size: 14px;
		line-height: 20px;
		color: #000;
		text-indent: 1em;
	}
	.cart .good_news .good_priceCount{
		width: 100%;
		height: 5.6vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	.cart .good_priceCount .good_price{
		color: rgb(191, 17, 17);
		font-size: 15px;
	}
	.cart .good_price i{
		font-size: 10px;
	}
	.cart .good_count li{
		width: 5.6vw;
		height: 5.6vw;
		text-align: center;
		line-height: 5.6vw;
		float: left;
		font-size: 18px;
		color: #000;
		font-weight: 700;
	}
	.cart .good_count .count{
		color: #515151;
		font-weight: 500;
		font-size: 13px;
		background-color: #f1f1f1;
	}

	.cart .good_checkbox{
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(img/icon_checkbox_uncheck.png) no-repeat center;
		background-size: 100% 100%;
	}
	.cart .good_checkbox.checked{
		background: url(img/icon_checkbox_check.png) no-repeat center;
		background-size: 100% 100%;
	}
</style>