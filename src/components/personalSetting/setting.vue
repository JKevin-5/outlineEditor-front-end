<template>
    <!-- 主体 -->
    <div >
        <!-- 面包屑 -->
        <b-row>
            <b-breadcrumb >
                <b-breadcrumb-item to="/home">首页</b-breadcrumb-item>
                <b-breadcrumb-item active>个人设置</b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>
        
        <b-row  class=" shadow bg-white rounded" style="width: 1000px" cols="11">
            <b-col class="p-5" cols="8" offset="1" >
                <b-row>
                    <h3>个人资料</h3> 
                </b-row>
                <b-row class="mt-3 mb-3">
                    <div>使用此系统的其它用户可能会看到部分信息。<a href="#">更多详细</a></div>
                </b-row>
                <b-row class="pt-4"><h5>名称：</h5>{{this.$store.state.user.name}}</b-row>
                <b-row class="pt-4"><h5>账号：</h5>{{this.$store.state.user.userName}}</b-row>
                <b-row class="pt-4"><h5>权限：</h5>{{this.$store.state.user.authority}}</b-row>
                <b-row class="pt-4"><b-button @click="showModal">修改密码</b-button></b-row>
                <!-- 修改密码的模态框 -->
                <b-modal id="modal-center" hide-footer  centered title="修改密码" ref="form" >
                    <b-form  @submit.stop.prevent="changePassword" class="form-login">
                        <b-form-group label="原密码" label-for="input-1" id="input-group-1">
                            <b-form-input type="password" id="input-1" v-model="oldPassWord" placeholder="请输入您的密码" required="required" ></b-form-input>    
                        </b-form-group>
                        <b-form-group label="新密码" label-for="input-2" description="密码最好同时包含字母、数字" id="input-group-2">
                            <b-form-input type="password" id="input-2" v-model="newPassWord" placeholder="请输入您的密码" required="required"  ></b-form-input>    
                        </b-form-group>
                        <b-form-group id="input-group-3" >
                            <b-button type="submit"  variant="primary" >提交</b-button>
                        </b-form-group>
                    </b-form>
                </b-modal>
            </b-col>
            <b-col cols="2">

            </b-col>
            
        </b-row>
    </div>
</template>
<script>
import {comfirmUserInfo,changePassword} from '@/network/userApi'
export default {
    data(){
        return{
            
            oldPassWord:'',
            newPassWord:''
        }
    },
    beforeCreate(){

    },
    methods:{
        showModal() {
            this.$refs['form'].show()
        },
        hideModal() {
            this.$refs['form'].hide()
        },
        sendInfo(){
            this.hideModal()
        },
        //显示状况
        makeToast(variant,content) {
            this.$bvToast.toast(content, {
            title: `提示信息`,
            variant: variant,
            toaster: "b-toaster-top-center",
            solid: true
            })
        },
        //修改密码
        changePassword(){
            //确认旧密码
            comfirmUserInfo({
                userId:'',
                userName: this.$store.state.user.userName,
                passWord: this.oldPassWord,
                name:'',
                authority:'' 
            }).then(res=>{
                if(res.data!=200){
                    //this.makeToast('success','旧密码正确！');
                    //修改密码
                    changePassword({
                        userId:this.$store.state.user.userId,
                        userName:'',
                        passWord: this.newPassWord,
                        name:'',
                        authority:'' 
                    }).then(res=>{
                        this.makeToast('success','修改密码成功！');
                        this.hideModal();
                        this.resetModal();
                    }).catch(err=>{
                        this.makeToast('danger','修改密码失败！');
                        this.resetModal();
                    })
                }else{
                    this.makeToast('danger','原密码错误，请重新尝试！');
                    this.resetModal();
                }
            }).catch(err=>{
                this.makeToast('danger','未知错误！');
                this.resetModal();
            })
            
            
        },
        //重置发帖模态框表单
        resetModal(){
            this.oldPassWord = '',
            this.newPassWord = ''
        },
    }

}
</script>