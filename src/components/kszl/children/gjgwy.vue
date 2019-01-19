<template>
  	<div class="zlbox">
		<div class="zlbox_list">
			<h3 class="contitle"><span>国家公务员考试备考资料</span></h3>
			<div class="zllist">
				<el-card class="zlcard" shadow="never" v-for="(zlitem,index) in zllists" :key="index">
					<div class="zlcardhead" slot="header">
			            <span class="zlcardheadtitle">{{ zlitem.filename }}</span>
			            <el-tag type="warning" size="small" v-if="zlitem.ksjd == 0"><i class="el-icon-edit"></i>笔试</el-tag>
			            <el-tag type="danger" size="small" v-if="zlitem.ksjd == 1"><i class="el-icon-view"></i>面试</el-tag>
			            <el-tag type="success" size="small" v-if="zlitem.fileyear">{{ zlitem.fileyear }}</el-tag>
			        </div>
			        <el-scrollbar style="width: 100%; height: 120px;">
						<div class="zlcardbody">
							<svg class="icon" aria-hidden="true">
								<use :xlink:href='"#icon-" + zlitem.filetype'></use>
							</svg>
							<p>{{ zlitem.filename }}</p>
						</div>
					</el-scrollbar>
					<div class="zlcardfoot">
						<el-button size="mini" @click.stop="zldownload(zlitem.fileaddress)">下载</el-button>
					</div>
				</el-card>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			zllists:[]  // 面授课程列表
		}
	},
	mounted: function(){
		this.getZldate()
	},
	methods: {
		getZldate: function(argument) {  //获取数据
			var that = this
			that.$axios.get('./static/json/kszl/hljgwy.json')
			.then(function(response){
				that.zllists = response.data
			})
			.catch(function(error){
				console.log("课程列表请求错误" + error);
			})
		},
		zldownload: function(fileaddress){
			//window.open(fileaddress)
			console.log(fileaddress)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
