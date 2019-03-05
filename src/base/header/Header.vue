<template>
  <el-header v-loading="loading">
    <el-row>
      <el-col :span="4" class="logowidth">
        <a class="logo" href="http://hlj.offcn.com/" target="_blank"><img src="@/common/img/nlogo.png" :alt="headtitle"></a>
      </el-col>
      <el-col :span="6" class="userinfo">
        <!-- 未登录 -->
        <el-button size="mini" v-if="!islogin" @click="loginpath()" type="primary" plain>登录</el-button>
        <!-- 已登录 -->
        <el-dropdown v-if="islogin">
          <span class="el-dropdown-link userinfo-con">
            <img :src='"@/common/img/hdimg" + hdnum + ".png"' :alt="headtitle">{{ username }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click.stop="logout()">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      loading: false,
      islogin: false,
      username: '',
      hdimg: [1,2,3],
      hdnum: null,
      headtitle: '黑龙江中公教育',
    }
  },
  created: function(){
    this.$store.commit('getStorage')
    this.hdimgrondom()
    this.isloginpd()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    hdimgrondom: function(){
      this.hdnum = Math.ceil(this.hdimg.length*Math.random());
    },
    isloginpd: function(){
      this.username = this.$store.state.userinfo.username
      if (this.username == null || this.username == undefined) {
        this.islogin = false
      } else {
        this.islogin = true
      }
    },
    logout: function(){
      var that = this;
      that.loading = true;
      this.$store.commit('removeUserinfo');
      this.$store.commit('removeStorage');
      setTimeout(function(){
        that.$message('退出登陆成功')
        that.loading = false;
        that.islogin = false;
      },300)
    },
    loginpath: function(){
      this.$router.push({ path: '/login/' })
    }
  },
  computed:{
    // onRoutes() {
    //   return this.$router.path.push('/', '');
    // }
  }
}
</script>

<style scoped>
.el-header{ padding: 0px 10px; line-height: 60px; background: rgba(255,255,255,1); box-shadow: 0px 5px 20px #d5e8ff; z-index: 10; position: relative; }
.el-header .logowidth{ width: 190px; }
.logo{ width: 100%; display: block; height:60px; padding: 5px 5px; position: relative; text-align: left; box-sizing: border-box;
border-right-width: 1px; border-color: hsla(62,77%,76%,.3); border-right-style: solid; }
.logo img{ height: 100%; display: inline-block; }
.el-header .el-menu{ background: transparent; }
.el-header .el-menu .el-submenu .el-submenu__title span,.el-header .el-menu .el-menu-item span{ font-size: 15px; }
.el-header .tools{ width: 60px; height: 60px; font-size: 20px; text-align: center; line-height: 60px; color: #333; }
.el-header .tools:active{ background: #334156; }
.el-header .userinfo{ height: 60px; padding: 0 15px 0 0; color: #333; text-align: right; float: right; }
.el-header .userinfo .el-dropdown{ display: inline-block; vertical-align: top; position: relative; }
.userinfo-con{ width: 100%; cursor: pointer; color: #333; text-align: right; }
.userinfo-con img{ width: 40px; height: 40px; border-radius: 50%; margin: 10px; float: right; }
</style>
