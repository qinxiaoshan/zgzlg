<template>
  <div class="hello">
    ddd
  </div>
</template>

<script>
export default {
  data () {
    return {
  		zllists:[]  // 资料列表
    }
  },
  mounted: function(){
  	this.getZldate()
  },
  methods: {
  	getZldate: function(argument) {  //获取数据
		var that = this
		// that.$http.jsonp('https://api.eolinker.com/v1/Api/getApiList')
		// .then(function(response){
		// 	console.log(response)
		// })
	},
  },
}
</script>

<style lang="scss" scoped>
	
</style>
