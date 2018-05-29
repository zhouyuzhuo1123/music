<template>
  <div id="container">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>
<style>
	html{
		width: 100%;
	    height: 100%;
	    margin:0;
	    padding:0;
	}
	body{
		height:100%;
		margin:0;
		padding:0;
	}
	#container{
		width: 100%;
		height:100%;
   		display: flex;
   		display: -webkit-flex;
	}
	
</style>