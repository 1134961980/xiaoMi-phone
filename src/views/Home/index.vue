<template>
	<div>
		<mi-nav></mi-nav>
		<span>
			首页
		</span>
	</div>
</template>

<script type="text/ecmascript-6">
	import MiNav from "../../components/mi-nav"

	export default {
	        name:"Home",
		components:{
	                "mi-nav": MiNav
		},
		//创建
		beforeCreate() {

		},
		created() {
//                     this.$alert('hello')
			this.$loading.show();
			setTimeout(() => {
                                this.$loading.close();
			}, 1000)
		},
		//挂载
		beforeMount() {

		},
		mounted() {

		},
		//更新
		beforeUpdate(){

		},
		updated() {

		},
		//销毁
		beforeDestroy() {

		},
		destroyed() {

		}
	};
</script>

<style scoped>
	span{
		color: red;
	}
</style>