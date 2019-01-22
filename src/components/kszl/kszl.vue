<template>
  <el-row class="fullscreen">
    <Header></Header>
    
    <el-col class="main">
      <LeftMenu></LeftMenu>
      
      <div class="main-con">
        <el-scrollbar class="hiddenX" style="width: 100%; height: 100%;">
          <div class="fixedcontainer clearfix">
            <el-col :span="24" class="content-wrapper">
              <transition name="slide-left" mode="out-in">
                <router-view ></router-view>
              </transition>
            </el-col>
          </div>
        </el-scrollbar>
      </div>
      
    </el-col>
  </el-row>
</template>

<script>
import Header from 'base/header/Header'
import LeftMenu from 'base/LeftMenu'
export default{
  data: function(){
    return {
      
    }
  },
  methods: {
    
  },
  components:{
    Header, LeftMenu
  }
}
</script>

<style lang="scss" scoped>

</style>
