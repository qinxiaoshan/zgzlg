<template>
  	<div class="container">
		<kszllist :ajaxUrl="ajUrl"></kszllist>
	</div>
</template>

<script>
import kszllist from 'components/kszl/public/kszllist'
export default {
	data () {
		return {
			ajUrl: './static/json/kszl/jszg.json'
		}
	},
	mounted: function(){
		
	},
	methods: {
		
	},
	components:{
	    kszllist
	}
}
</script>

<style lang="scss" scoped>

</style>
