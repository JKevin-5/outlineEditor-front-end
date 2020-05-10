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
        
        <b-row align-v="center" class=" shadow p-3 mb-5 bg-white rounded" cols="12">
            <b-col class="p-5" cols="8" offset="1">
                <b-row>
                    <h3>个人资料</h3> 
                </b-row>
                <b-row class="mt-3 mb-3">
                    <div>使用此系统的其它用户可能会看到部分信息。<a href="">更多详细</a></div>
                </b-row>
                <b-row class="pt-4"><h5>名称：</h5>{{this.$store.state.user.name}}</b-row>
                <b-row class="pt-4"><h5>账号：</h5>{{this.$store.state.user.userName}}</b-row>
                <b-row class="pt-4"><h5>权限：</h5>{{this.$store.state.user.authority}}</b-row>
                <b-row class="pt-4"><b-button @click="showModal">修改密码</b-button></b-row>
                
                <!-- 修改密码的模态框 -->
                <b-modal id="modal-center" hide-footer  centered title="修改密码" ref="form" >
                    <form  @submit="sendInfo" style="outline:none;">
                        <b-form-group label="密码" label-for="input-1">
                            <b-form-input type="password" id="input-1" v-model="form.oldPassword" placeholder="请输入您的密码" required="required"  trim></b-form-input>    
                        </b-form-group>
                        <b-form-group label="新密码" label-for="input-2" description="密码在6-10位数之间，最好同时包含字母、数字">
                            <b-form-input type="password" id="input-2" v-model="form.newPassword" placeholder="请输入您的密码" required="required"  trim></b-form-input>    
                        </b-form-group>
                        <b-form-group id="input-group" >
                            <b-button type="submit"  variant="primary" >提交</b-button>
                        </b-form-group>
                    </form>
                </b-modal>
            </b-col>
            
        </b-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:[]

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
        }
    }

}
</script>