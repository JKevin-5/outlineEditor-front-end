<template>
    <html lang="en">
    <div>
        <b-form class="form-login" @submit="comfirmUser">
            <b-form-group class="text-center" >
              <h2>登录</h2>
            </b-form-group>
            
            <b-form-group 
                id="input-group-1" 
                label="用户名" 
                label-for="input-1" 
            >
                <b-form-input 
                  id="input-1" 
                  required
                  placeholder="请输入您的账号" 
                  v-model="form.userName" ></b-form-input>
            </b-form-group>
            
            <b-form-group 
                id="input-group-2"
                label="密码"
                label-for="input-2"
            >
            <b-form-input type="password" id="input-2" required placeholder="请输入您的密码" v-model="form.passWord" ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3">
                <b-form-checkbox-group v-model="form.checked" id="checkboxes-4" >
                </b-form-checkbox-group>
            </b-form-group>
            
            <b-form-group id="input-group-4" >
              <b-button variant="primary" type="submit">提交</b-button>
            </b-form-group>
        </b-form>
        
    </div>
    </html>
</template>
<script>
import {comfirmUserInfo,getUser} from "@/network/userApi"

export default{
  data(){
    return{
      form:{
        userId:'',
        userName:'',
        passWord:'',
        name:''
      }
    }
  },
  methods:{

    //显示状况
    makeToast(variant,content) {
        this.$bvToast.toast(content, {
          title: `提示信息`,
          variant: variant,
          toaster: "b-toaster-top-center",
          solid: true
        })
    },
    
    //确认账号信息
    comfirmUser(evt){
      evt.preventDefault()
      comfirmUserInfo({
        userId:'',
        userName: this.form.userName,
        passWord: this.form.passWord,
        name:'',
        authority:''
      }).then(res=>{
        if(res.data!=200){
          this.makeToast('success','登录成功！请等待跳转');
          this.getUserInfo(res.data);
          var c=setTimeout(this.change,2000);
        }else{
          this.makeToast('danger','账号或密码错误！');
        }
        
      }).catch(err=>{
        this.makeToast('danger','账号或密码错误！');
      })
    },
    //获取用户信息
    getUserInfo(id){
      getUser(id).then(res=>{
        this.$store.commit('login',res.data);
      })
    },change(){
      this.$router.push('/home');
  }
    

  }

}
</script>