<template>
  <div class="fullscreen" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="6" :offset="9" class="formbox">
        <span class="logo"><img src="@/common/img/logo.png" alt=""></span>
        <h3><span>快捷登录</span></h3>
        <el-form ref="loginform" :model="loginform" :rules="loginrules" :status-icon="true" width="100%">
          <el-form-item prop="name">
            <el-input v-model.trim="loginform.name" placeholder="请输入学员姓名" prefix-icon="el-icon-edit"></el-input>
          </el-form-item>
          <el-form-item prop="tel">
            <el-input v-model.number.trim="loginform.tel" placeholder="请输入手机号码" prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item prop="yzm" v-if="fyzm">
            <el-input v-model.number.trim="loginform.yzm" placeholder="验证码">
              <el-button slot="append" v-if="!yzming" ref="yzmbtn" @click="yzmfieldpd()" type="primary">{{yzmtxt}}</el-button>
              <el-button slot="append" v-if="yzming" :disabled="yzming">{{ yzmtime }}s</el-button>
            </el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button @click="submitloginform('loginform')" :loading="loading" type="primary" style="display: block; width: 100%; margin: 0px auto;">{{ loadbtntxt }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
    };
    return {
      loading: false,
      loadbtntxt: "OK 登录",
      fyzm:false,
      yzming: false,
      yzmtxt: "获取验证码",
      yzmtime: 10,
      loginform:{
        name: '',
        tel: '',
        yzm: ''
      },
      loginrules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        tel: [
          { validator: validateTel, trigger: 'blur' }
        ],
        yzm: [
          { validator: validateYzm, trigger: 'blur' }
        ]
      }
    }
  },
  create:function(){
    
  },
  methods: {
    submitloginform (){
      this.$refs.loginform.validate((valid) => {
         if(valid){
            var that = this;
            that.loading = true;
            that.loadbtntxt = "登录中..."
            setTimeout(function(){
              that.loading = false;
              that.$message('登录成功');
              that.loadbtntxt = "OK 登录"
              that.$router.push({ path:'/kszl/gjgwy/'});
            }, 1500)
         }else{
            this.loading = false;
            this.loadbtntxt = "OK 登录"
            console.log('用户名或手机号码错误')
         }
      })
    },
    yzmfieldpd: function(){
      var that = this;
      that.$http.jsonp('http://hlj.offcn.com/index.php?m=formguide&c=index&a=formyzm&formid=258&mobile=' + that.loginform.tel + '&callback=?')
      .then(function(response){
        if (response.body.status == 1) {
          that.fyzm = true;
          that.$options.methods.hqyzm();
        }else if (response.body.status == 2){
          //console.log('已经注册，可直接登录')
          return;
        }
      })
      .catch(function(error){
        console.log("请求错误" + error);
      })
    },
    hqyzm: function(){
      var that = this
      that.yzming = true;
      var aytotime = setInterval(function(){
        if (that.yzmtime > 0) {
          that.yzmtime --
        }else{
          clearInterval(aytotime)
          that.yzming = false;
          that.yzmtime = 10;
          that.yzmtxt = "重新获取"
          return false;
        }
      }, 1000)
      
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
