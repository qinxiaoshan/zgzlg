<template>
  <div v-on:mousemove="bgmove($event)" class="fullscreen">
    <el-col :span="20" :offset="2" class="indexhead">
      <el-col :span="4" class="indextoolbox">
        <transition name="fade">
          <a v-if='indexanimate' href="http://hlj.offcn.com/" target="_blank" class="tools"><i class="iconfont icon-shouye"></i></a>
        </transition>
      </el-col>
      <el-col :span="10" class="indexheadright">
        <transition name="fade">
          <div v-if='indexanimate' class="webaddress">hlj.offcn.com</div>
        </transition>
      </el-col>
    </el-col>
    <el-col :span="20" :offset="2" class="main">
      <el-container class="main-con">
        <div class="indexlogo">
          <div class="indexlogocolor" :class="{ logoactive:logoactivetab }">
            <span class="iconfont icon-offcn"></span>
          </div>
          <strong v-if='indexanimate'>中公资料馆</strong>
        </div>
        <transition name="fade">
          <a v-if='indexanimate' class="indexbtn" ref='indexbtn' @click.prevent.stop="conGo">开启精彩内容<span v-if='indexbtnCircle' class="indexbtnCircle"> </span></a>
        </transition>
        <transition name="fade">
          <h1 v-if='indexanimate' class="indexh1" ref='indexh1'><strong class="indexyear">2019</strong>黑龙江中公教育网络平台</h1>
        </transition>
      </el-container>
    </el-col>
    <div class="fullscreenbg">
      <img ref="fullscreenbgimg" src="@/common/img/indexbg1.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default{
  name: 'Kszl',
  data: function(){
    return {
      indexmenu:false,
      indexanimate:true,
      indexbtnCircle:false,
      logoactivetab:false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    leftmenucollapse:function() {
      this.indexmenu = !this.indexmenu
    },
    bgmove:function($event){
      this.$refs.fullscreenbgimg.style.left = '-' + ($event.clientX)/20 + 'px'
      this.$refs.fullscreenbgimg.style.top = '-' + ($event.clientY)/20 + 'px'
    },
    conGo:function(e){
      var that = this;
      that.indexbtnCircle = true
      setTimeout(function(){
        that.indexbtnCircle = false
        that.indexanimate = false
      },300)
      setTimeout(function(){
        that.logoactivetab = true
      },500)
      setTimeout(function(){
        that.$router.push({path:'/kszl/'});
      },3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.indexhead{ margin-top: 1%; position:relative; z-index: 10;  }
.indexlogo{ width: 100%; display: inline-block; text-align: center; justify-content: center; margin-top: 2%; margin-bottom: 2%; position: relative;
  strong{
    width: 100%;
    display: block;
    font-size: 110px;
    letter-spacing: 10px;
    font-weight: bold;
    flex: 1;
    text-align: center;
    color: #ff416d;
    line-height: 1.1;
  }
}
.indexlogocolor{ width: 100%; display: flex; text-align: center; justify-content:center;background: #ff416d url('../common/img/dsjb2.png') no-repeat center bottom; -webkit-background-clip: text; position: relative; overflow: hidden; animation: cityacolor 4s linear infinite alternate;
 -webkit-background-size: 200% 70%; background-size: 200% 70%;}
@keyframes cityacolor{
  0%{ background-position: left 0 bottom 0; }
  25%{ background-position: left 30% bottom 0; }
  50%{ background-position: left 60% bottom 0; }
  75%{ background-position: left 90% bottom 0;}
  100%{background-position: left 120% bottom 0; }
}
.indexlogo span{ font-size: 220px; font-weight: 100; color: transparent; }
.indexh1{ font-size: 26px; letter-spacing: 5px; line-height: 40px; margin: 20px; }
.indexyear{ display: block; }
.indexhead .el-menu,.indexhead .el-menu--inline{ background: transparent !important; }
.el-submenu .el-menu{ background: transparent !important; background-color: transparent !important; }
.indexhead .tools{ width: 60px; height: 60px; font-size: 26px; text-align: center; line-height: 60px; color: #333; display: inline-block; }
.indexhead .tools i{ font-size: 30px; }
.indexhead .tools:active{ background: #334156; color: #fff; }
.indexheadright{ float: right; position: relative; }
.webaddress{  font-size: 24px; font-weight: bold; float: right; line-height: 60px; text-align: right; position: relative; }
.webaddress:after{ width: 80px; height: 1px; background: #000; content: ''; position:absolute; right: 0px; bottom: 0px; }
.indextoolbox{ width: 60px; height: 60px; display: block; position: relative;}
.indextooltab{ width: 200px; position: absolute; top: 60px; left: 0px; z-index: 15; }
.indexbtn{ width: 200px; border: 1px solid #000; height: 50px; line-height: 50px; font-size: 18px; text-align: center; display: inline-block; margin: 5px; cursor: pointer; position:relative; overflow: hidden; }
.indexbtn:hover{ background: rgba(#b9d0ff,0.2); }
.indexbtn .indexbtnCircle{ width: 50px; height: 50px; display: block; background: #f60; border-radius: 50%; opacity: 0; position: absolute; top: 0;
left: 50%; margin-left: -25px; z-index: 1; transform: scale(1.1); animation: circleplus 0.3s linear; animation-fill-mode: forwards; }
@keyframes circleplus{
  0%{ transform: scale(1.1); opacity: 0.8; }
  100%{ transform: scale(5); opacity: 0.2; }
}
.logoactive{ animation: logoani 2s linear; animation-fill-mode: forwards; }
@keyframes logoani{
  0%{ transform: rotateY(0deg) }
  60%{ transform: rotateY(360deg) }
  100%{ transform: translate3d(0px,70px,50px) scale(1.4);}
}
.fullscreenbg{ width: 100%; display: block; position: absolute; top: 0px; bottom: 0px; left: 0px; z-index: 1; opacity: 0.4;}
.fullscreenbg img,.videoBoxVd{ width: 110%; height:110%; display: block; position: absolute; left: 0; top: 0;right: 0; z-index: 1;filter: blur(10px); -webkit-filter: blur(10px); }
</style>
