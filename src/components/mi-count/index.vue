<template>
	<div class="mi-count">
		<button :disabled="count === 1" @click.prevent="decreaseHandler">-</button>
		<span class="count" v-text="count"></span>
		<button :disabled="count === maxCount" @click.prevent="increaseHandler">+</button>
	</div>
</template>

<script type="text/ecmascript-6">
     export default {
             name: "MCount",
             props: {
                     count:{
                             type: Number,
                             required:true
                     },
                     maxCount: {
                             type: Number,
                             default: 5
                     }
             },
             methods: {
                     increaseHandler() {
                             this.$emit("increase");
                             this.$emit("update:count",this.count + 1);
                     },
                     decreaseHandler() {
                             this.$emit("decrease");
                             this.$emit("update:count",this.count - 1);
                     }
             }
     };
</script>

<style scoped>
	.mi-count button,.count{
		display: inline-block;
		outline: none;
		background-color: #fff;
		border: 0;
		width: 21px;
		height: 21px;
		padding: 6px;
		text-align: center;
		line-height: 21px;
		color: #000;
	}
	.mi-count .count{
		background-color: #f1f1f1;
		font-size: 14px;
		font-weight: 500;
	}
</style>