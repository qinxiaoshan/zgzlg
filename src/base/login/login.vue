<template>
  <div class="fullscreen loginpage" ref="zgformsubmit" v-loading="loading">
    <div class="formbox">
      <span class="logo"><img src="@/common/img/logo.png" alt=""></span>
      <h3><span>快捷登录</span></h3>
      <el-form ref="loginform" :model="loginform" :rules="loginrules" :status-icon="true" width="100%">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="city">
              <el-select v-model="loginform.city" placeholder="所在地市">
                <el-option
                  v-for="cityitem in citylist"
                  :key="cityitem"
                  :label="cityitem"
                  :value="cityitem">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="xiangmu">
              <el-select v-model="loginform.xiangmu" placeholder="考试类型">
                <el-option
                  v-for="xiangmuitem in xiangmulist"
                  :key="xiangmuitem"
                  :label="xiangmuitem"
                  :value="xiangmuitem">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="username">
          <el-input v-model.trim="loginform.username" maxlength="4" placeholder="请输入学员姓名" :readonly="yzming" clearable prefix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item prop="usertel">
          <el-input v-model.number.trim="loginform.usertel" maxlength="11" placeholder="请输入手机号码" :readonly="yzming" clearable prefix-icon="el-icon-mobile-phone"></el-input>
        </el-form-item>
        <el-form-item prop="yzm" v-if="fyzm">
          <el-input v-model.trim="loginform.yzm" maxlength="4" clearable placeholder="验证码">
            <el-button slot="append" v-if="!yzming" ref="yzmbtn" @click="yzmfieldpd()" type="primary">{{yzmtxt}}</el-button>
            <el-button slot="append" v-if="yzming" :disabled="yzming">{{ yzmtime }}s</el-button>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button @click="submitloginform('loginform')" :loading="loading" :disabled="loginbtnstatus" type="primary" round style="display: block; width: 100%; margin: 0px auto;">{{ loadbtntxt }}</el-button>
        </el-form-item>
      </el-form>
      <form v-show="false" id="zgform" name="zgform" target="_self" action="http://hlj.offcn.com/index.php?m=formguide&amp;c=index&amp;a=show&amp;formid=280&amp;action=js&amp;siteid=1" onsubmit="document.charset='GBK';" method="post" accept-charset="gb2312">
          <input type="text" name="info[city]" v-model.trim="loginform.city" id="city" placeholder="请输入所在地市" value="">
          <input type="text" name="info[xiangmu]" v-model.trim="loginform.xiangmu" id="xiangmu" placeholder="请输入考试类型" value="">
          <input type="text" name="info[name]" v-model.trim="loginform.username" id="name" placeholder="请输入姓名" value="">
          <input type="text" name="info[tel]" v-model.trim="loginform.usertel" id="tel" placeholder="请输入手机号" value="">
          <input type="text" name="info[yzm]" v-model.trim="loginform.yzm" id="yzm" placeholder="验证码" value="">
          <input type="submit" name="dosubmit" id="dosubmit" value="提交">
      </form>
    </div>
  </div>
</template>

<script>
import jq from 'common/js/jquery-1.9.1.min'
export default {
  name: 'login',
  data: function () {
    var validateCity = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择所在地市'));
      }else{
        setTimeout(() => {
          callback();
        }, 100);
      }
    };
    var validateXiangmu = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择考试类型'));
      }else{
        setTimeout(() => {
          callback();
        }, 100);
      };
    };
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
      //console.log(!Number.isInteger(value))
      setTimeout(() => {
        var renum = /^[0-9]+.?[0-9]*$/;
        if (!renum.test(value)) {
          return callback(new Error('验证码格式不正确'));
        } else {
          const yzmreg = /^\d{4}$/;
          if (!yzmreg.test(value)) {
            return callback(new Error('验证码格式不正确'));
          }else{
            if (this.yzmreal != value) {
              return callback(new Error('验证码输入错误'));
            }else{
              callback();
              this.loginbtnstatus = false;
            }
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
      yzmreal: '',
      loginform:{
        city: '',
        xiangmu: '',
        username: '',
        usertel: '',
        yzm: ''
      },
      citylist: ["哈尔滨","齐齐哈尔","牡丹江","大庆","佳木斯","鸡西","双鸭山","伊春","七台河","鹤岗","黑河","绥化","大兴安岭"],
      xiangmulist: ["黑龙江公务员","国家公务员","事业单位","银行招聘","教师招聘","教师资格","特岗教师","国企招聘","招警","消防","选调生","三支一扶","考研","其他"],
      loginrules: {
        city: [
          { validator: validateCity, trigger: 'change' }
        ],
        xiangmu: [
          { validator: validateXiangmu, trigger: 'change' }
        ],
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
          that.$router.push({ path:'/kszl/hljgwy/'});
          return false
        } else {
          that.$router.go(-1)
        }
      }, 1500)
    },
    submitloginform (){
      var that = this;
      console.log(that.$refs.loginform)
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
      if (!that.yzming) {
        that.$http.jsonp('http://hlj.offcn.com/index.php?m=formguide&c=index&a=formyzm&formid=280&mobile=' + that.loginform.usertel + '&callback=?')
        .then(function(response){
          this.yzmreal = response.body.yzm;
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
  .fullscreen{ background: url('../../common/img/bg4.jpg') no-repeat center; background-size:cover; }
  .logo{ display: flex; width: 220px; height: auto; border-radius: 5px; margin: 0px auto 5px; padding: 10px 20px; flex-wrap: wrap; align-items: center; }
  .logo img{ width: 100%; height: auto; display: block; }
  .formbox{ width: 320px; background: #fff url('../../common/img/formboxtop.jpg') no-repeat center top; padding: 120px 20px 20px; border-radius: 12px; box-shadow: 0px 15px 80px #eee; background-size: 100% auto; opacity: 0.85; filter: alpha(opacity=85 ); position: absolute; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0); }
  .formbox form{ padding: 10px 6%; }
  .formbox h3{ font-size: 18px; line-height: 2; text-align: center; font-weight: normal; margin-bottom: 20px; }
  .formbox h3 span{ display: inline-block; border-bottom: 2px solid #f00; cursor: pointer;}
  .el-form-item{ margin-bottom: 17px; }
</style>
