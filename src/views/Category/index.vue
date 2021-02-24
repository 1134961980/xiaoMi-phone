<template>
	<div class="page-category">
		<div class="category-header">
			<div class="category-header-search">
				<i></i>
				<input type="text" name="" id="">
			</div>
		</div>
		<div class="category-content">
			<ul class="category-list-main">
				<li v-for="item in listMain" :key="item.id"
				    :class="{active: item.id === activeId}"
				    @click="toggleId(item.id)"
				>
					<span v-text="item.name"></span>
				</li>
			</ul>
			<div class="category-list-sub hide-scroll" v-if="listSub.length > 0">
				<img :src=avatar alt="" class="category-list-sub-banner">
				<ul class="category-list-sub-ul" v-if="listSub.length > 0">
					<li v-for="item in listSub" :key="item.id">
						<router-link to="/list/${item.id}">
							<img :src="item.avatar" alt="">
							<span v-text="item.name"></span>
						</router-link>
					</li>
				</ul>
			</div>
			<p v-else>暂无相关分类</p>
		</div>
		<mi-nav></mi-nav>
	</div>
</template>

<script type="text/ecmascript-6">
        import axios from 'axios';
        import MiNav from "../../components/mi-nav"

        export default {
                name: "Category",
	        components: {
                        "mi-nav": MiNav
	        },
                data: function(){
                        return {
                                listMain: [],
                                activeId: 0,
                                avatar: "",
                                listSub: [],
                        }
                },
                methods:{
                        toggleId: function(id){
                                if(this.activeId === id) return;
                                this.activeId = id;
                                this.avatar = this.listMain.find(item => item.id === id).avatar;
                                this.$http({url: "/category/list/0" + id})
	                                .then( data => {
                                                this.listSub = data;
	                                })
                        }
                }
        ,
                created() {
                          this.$http(  {url: "/category/list/0"})
	                        .then(data => {
                                this.listMain = data;
                                this.toggleId(this.listMain[0].id);
	                })
                }

        };
</script>

<style scoped>
	body,html{
		/* 控制整体 */
		height: 100%;
		width: 100%;
	}
	.page-category{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}
	.category-header{
		flex-shrink: 0;
		height: 45px;
		display: flex;
		padding: 0 12px;
		justify-content: center;
		align-items: center;
	}
	.category-header-search{
		padding-left: 7px;
		width: 98%;
		height: 71%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(246, 246, 246);
		border-radius: 15px;
	}
	.category-header-search i{
		display: block;
		width: 17px;
		height: 17px;
	}
	.category-header-search input{
		box-sizing: border-box;
		width: 88.62973%;
		height: 20px;
		outline: none;
		border: 0;
		padding:3px 12px;
		background-color: rgb(246, 246, 246);
	}
	.category-content{
		border-top: 2px solid rgb(246, 246, 246);
		border-bottom: 2px solid rgb(246, 246, 246);
		flex-grow: 1;
		overflow: auto;
		background-color: rgb(246, 246, 246);
		display: flex;
		width: 100%;
	}
	.category-list-main{
		height: 100%;
		overflow: auto;
		flex-shrink: 0;
		width: 24.8%;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.category-list-main li{
		height: 13.333333vw;
		display: flex;
		justify-content:center ;
		align-items: center;
	}
	.category-list-main li span{
		text-align: center;
		width: 19.733333vw;
		height: 6.4vw;
		line-height: 6.4vw;
		border-radius: 12px;
		font-size: 13px;
	}
	.category-list-main li.active span{
		background: linear-gradient(to right, rgb(241, 83, 56), rgb(223, 20, 15));
		color: #fff;
	}
	.category-list-sub{
		height: 100%;
		overflow: auto;
		flex-grow: 1;
		padding:0 2.666666vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 75%;
	}
	.category-list-sub-banner{
		margin-top: 2.666666vw;
		width: 69.866666vw;
		height: 20.266666vw;
		border-radius: 15px;
	}
	.category-list-sub-ul{
		width: 100%;
		flex-grow: 1;
	}
	.category-list-sub-ul li{
		float: left;
		height: 25.866666vw;
		width: 33%;
	}
	.category-list-sub-ul li a{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.category-list-sub-ul li a img{
		width: 78.3505%;
		height: 78.3505%;
	}
	.category-list-sub-ul li span{
		margin-top: 6px;
		text-align: center;
		line-height: 21.6494%;
	}
</style>