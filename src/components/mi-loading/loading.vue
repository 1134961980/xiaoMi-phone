<template>
	<div class="loading">
		<p>loading...</p>
	</div>
</template>

<script type="text/ecmascript-6">

	export default {
	        name: "MiLoading",
	}
</script>

<style scoped>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0, 0.5);
	}
	p{
	     position: fixed;
		left: 50%;
		top:50%;
		transform: translate(-50%);
		color: #fff;
		font-size: 14px;
	}
</style>