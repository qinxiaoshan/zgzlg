<template>
  	<div class="zlbox">
		<div class="zlbox_list">
			<h3 class="contitle"><span>{{ this.$route.name }}考试备考资料</span></h3>
			<div class="zlsearch">
				<el-card class="zlcard" shadow="never">
					<div class="zlcardhead" slot="header">
			            <span class="subtitle">快捷查找</span>
			        </div>
			        <div class="zlcardbody">
			        	<div style="margin-top: 10px;"></div>
			        	<el-input ref="searchinput" v-model.trim="search" placeholder="请输入内容" prefix-icon="el-icon-edit" :clearable="true"></el-input>
			        	<el-row class="checkboxgroup">
			        		<span class="labeltitle">热词搜索：</span>
							<el-button type="text" v-for="hotword in hotwords" @click="hotsearch(hotword)" :key="hotword">{{ hotword }}</el-button>
						</el-row>
			        </div>
				</el-card>
			</div>
			<div class="zllist">
				<el-card class="zlcard" shadow="never" v-for="(zlitem,index) in zlsearch" :key="index">
					<div class="zlcardhead" slot="header">
						<el-tooltip class="item" effect="dark" :content="zlitem.filename" placement="bottom-start">
				            <span class="zlcardheadtitle">{{ zlitem.filename }}</span>
				        </el-tooltip>
			            <el-tag type="warning" size="small" v-if="zlitem.ksjd == '笔试'"><i class="el-icon-edit"></i>{{ zlitem.ksjd }}</el-tag>
			            <el-tag type="danger" size="small" v-if="zlitem.ksjd == '面试'"><i class="el-icon-view"></i>{{ zlitem.ksjd }}</el-tag>
			            <el-tag type="success" size="small" v-if="zlitem.fileyear">{{ zlitem.fileyear }}</el-tag>
			        </div>
			        <el-scrollbar style="width: 100%; height: 120px;">
						<div class="zlcardbody">
							<svg class="icon" aria-hidden="true">
								<use :xlink:href='"#icon-" + zlitem.filetype'></use>
							</svg>
							<p v-html="zlitem.filedetail"></p>
						</div>
					</el-scrollbar>
					<div class="zlcardfoot">
						<el-button size="mini" @click.stop="zldownload(zlitem.fileaddress)"><i class="el-icon-download"></i>下载</el-button>
						<span class="vardfootinfo" v-if="zlitem.downloadnum">{{ zlitem.downloadnum }}人已下载</span>
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
			zllists:[],  // 资料列表
			searchlist: [],
			hotwords:[this.$store.state.year,"笔试","面试"],
			searched:false,
			search:''
		}
	},
	mounted: function(){
		this.getZldate()
	},
	computed: {
		zlsearch: function() {
        	var that = this;
        	const search = that.search;
            if (search) {
                return that.zllists.filter(items => {
                    return Object.keys(items).some(key => {
                        return String(items[key]).toLowerCase().indexOf(search) > -1
                    })
                })
                console.log(search)
            }
            return that.zllists
      	}
    },
	methods: {
		getZldate: function(argument) {  //获取数据
			var that = this
			that.$http.get('./static/json/kszl/hljgwy.json')
			.then(function(response){
				that.zllists = response.data
			})
			.catch(function(error){
				console.log("课程列表请求错误" + error);
			})
		},
		zldownload: function(fileaddress){
			var that = this;
			if (that.$store.state.userinfo.usertel == null || that.$store.state.userinfo.usertel == undefined) {
				this.$confirm('一键登录，即可海量下载, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'warning',
						message: '前往登录'
					});
					setTimeout(function(){
					 	that.$router.push({ path: '/login/' })
					}, 1000)
				}).catch(() => {
					//console.log('错过了好资料')
				})
			}else{
				window.open(fileaddress)
			}
		},
        hotsearch: function(val){
        	this.search = val
        	this.$refs.searchinput.focus()
        }
	}
}
</script>

<style lang="scss" scoped>

</style>
