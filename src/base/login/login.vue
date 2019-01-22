<template>
  <div class="fullscreen" ref="zgformsubmit" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="6" :offset="9" class="formbox">
        <span class="logo"><img src="@/common/img/logo.png" alt=""></span>
        <h3><span>快捷登录</span></h3>
        <el-form ref="loginform" :model="loginform" :rules="loginrules" :status-icon="true" width="100%">
          <el-form-item prop="username">
            <el-input v-model.trim="loginform.username" placeholder="请输入学员姓名" :readonly="yzming" prefix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item prop="usertel">
            <el-input v-model.number.trim="loginform.usertel" placeholder="请输入手机号码" :readonly="yzming" prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item prop="yzm" v-if="fyzm">
            <el-input v-model.number.trim="loginform.yzm" placeholder="验证码">
              <el-button slot="append" v-if="!yzming" ref="yzmbtn" @click="yzmfieldpd()" type="primary">{{yzmtxt}}</el-button>
              <el-button slot="append" v-if="yzming" :disabled="yzming">{{ yzmtime }}s</el-button>
            </el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button @click="submitloginform('loginform')" :loading="loading" :disabled="loginbtnstatus" type="primary" style="display: block; width: 100%; margin: 0px auto;">{{ loadbtntxt }}</el-button>
          </el-form-item>
        </el-form>
        <form v-show="false" id="zgform" name="zgform" target="_self" action="http://hlj.offcn.com/index.php?m=formguide&amp;c=index&amp;a=show&amp;formid=280&amp;action=js&amp;siteid=1" onsubmit="document.charset='GBK';" method="post" accept-charset="gb2312">
            <input type="text" name="info[name]" v-model.trim="loginform.username" id="name" placeholder="请输入姓名" value="">
            <input type="text" name="info[tel]" v-model.trim="loginform.usertel" id="tel" placeholder="请输入手机号" value="">
            <input type="text" name="info[yzm]" v-model.trim="loginform.yzm" id="yzm" placeholder="验证码" value="">
            <input type="submit" name="dosubmit" id="dosubmit" value="提交">
        </form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import jq from 'common/js/jquery-1.9.1.min'
export default {
  name: 'login',
  data: function () {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入学员姓名'));
      }
      setTimeout(() => {
        if (value.length < 2 || value.length >5) {
          return callback(new Error('姓名格式不正确'));
        } else {
          callback();
        }
      }, 200);
    };
    var validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          return callback(new Error('手机号码格式不正确'));
        } else {
          const telreg = /^(13[0-9]|14[0-9]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
          //console.log(value)
          if (!telreg.test(value)) {
            return callback(new Error('请输入正确的手机号码'));
          }else{
            callback();
            this.yzmfieldpd();
          }
        }
      }, 200);
    };
    var validateYzm = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          return callback(new Error('验证码格式不正确'));
        } else {
          const yzmreg = /^\d{4}$/;
          if (!yzmreg.test(value)) {
            return callback(new Error('验证码格式不正确'));
          }else{
            callback();
            this.loginbtnstatus = false;
          }
        }
      }, 200);
    };
    return {
      loading: false,
      loginbtnstatus: true,
      loadbtntxt: "OK 登录",
      fyzm:false,
      yzming: false,
      yzmtxt: "获取验证码",
      yzmtime: 60,
      loginform:{
        username: '',
        usertel: '',
        yzm: ''
      },
      loginrules: {
        username: [
          { validator: validateName, trigger: 'blur' }
        ],
        usertel: [
          { validator: validateTel, trigger: 'blur' }
        ],
        yzm: [
          { validator: validateYzm, trigger: 'blur' }
        ]
      }
    }
  },
  created: function(){
    this.$store.commit('getStorage')
    this.isloginpd()
  },
  methods: {
    isloginpd: function(){
      var that = this
      const usntel = this.$store.state.userinfo.usertel
      if (usntel) {
        that.$options.methods.haslogin(that)
      }
    },
    haslogin: function(that){
      that.loading = true;
      that.loadbtntxt = "登录中..."
      setTimeout(function(){
        that.loading = false;
        that.$message({
          message: '登录成功',
          type: 'success'
        });
        that.loadbtntxt = "OK 登录";
        if (window.history.length <= 1) {
          that.$router.push({ path:'/kszl/gjgwy/'});
          return false
        } else {
          that.$router.go(-1)
        }
      }, 1500)
    },
    submitloginform (){
      var that = this;
      that.$refs.loginform.validate((valid) => {
         if(valid){
            //网站表单提交
            that.$store.dispatch('saveUserName',that.loginform.username);
            that.$store.dispatch('saveUserTel',that.loginform.usertel);
            if (that.fyzm) {
              that.$options.methods.zgformaction()
            }
            that.$options.methods.haslogin(that)
         }else{
            that.loading = false;
            that.loadbtntxt = "OK 登录"
            console.log('用户名或手机号码错误')
         }
      })
    },
    zgformaction: function($event){
      //模拟提交
      $("#dosubmit").trigger('click');
    },
    yzmfieldpd: function(){
      var that = this;
      if (!that.fyzm) {
        that.$http.jsonp('http://hlj.offcn.com/index.php?m=formguide&c=index&a=formyzm&formid=280&mobile=' + that.loginform.usertel + '&callback=?')
        .then(function(response){
          if (response.body.status == 1) {
            that.fyzm = true;
            that.$options.methods.hqyzm(that);
          }else if (response.body.status == 2){
            //console.log('已经注册，可直接登录')
            that.fyzm = false;
            that.loginbtnstatus = false;
            return;
          }
        })
        .catch(function(error){
          //console.log("请求错误" + error);
        })
      }
    },
    hqyzm: function(tha){
      var aytotime;
      if (!tha.yzming) {
        clearInterval(aytotime)
        tha.yzming = true;
        aytotime = setInterval(function(){
          if (tha.yzmtime > 0) {
            tha.yzmtime --
          }else{
            clearInterval(aytotime)
            tha.yzming = false;
            tha.yzmtime = 60;
            tha.yzmtxt = "重新获取"
            return;
          }
        }, 1000)
      }
      
    }
  }
}
</script>

<style scoped>
  .fullscreen{ background: url('../../common/img/bg3.jpg') no-repeat center; background-size: 100% 100%; }
  .logo{ display: flex; width: 240px; height: auto; border-radius: 5px; margin: 5px auto 6%; background: #fff; padding: 15px 25px; flex-wrap: wrap; align-items: center; }
  .logo img{ width: 100%; height: auto; display: block; }
  .formbox{ min-width: 340px; background: #fff; padding: 20px; border-radius: 5px; margin-top: 10%; box-shadow: 0px 5px 30px #ffd5d5; }
  .formbox form{ padding: 10px 9%; }
  .formbox h3{ font-size: 18px; line-height: 2; text-align: center; font-weight: normal; margin-bottom: 30px; }
  .formbox h3 span{ display: inline-block; border-bottom: 2px solid #f00; cursor: pointer;}
</style>
