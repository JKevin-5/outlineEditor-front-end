<template>
    <b-col class="justify-content-md-center  sideNav" >
            <b-list-group style="max-width: 300px;">
                <b-list-group-item  to="/home/setting" class="d-flex align-items-center">
                    <b-avatar variant="primary" :text=username class="mr-3"></b-avatar>
                    <span class="mr-auto">个人设置</span>
                </b-list-group-item>
                <b-list-group-item to="/home" class="d-flex align-items-center">
                    <b-icon icon="house-door-fill" class="ml-3 mr-4"></b-icon>
                    <span class="mr-auto">首页</span>
                    <b-badge>12</b-badge>
                </b-list-group-item>

                <b-list-group-item  to="/home/template" v-show="confirmPermission()">
                    <b-icon icon="file-earmark" class="ml-3 mr-4"></b-icon>
                    <span class="mr-auto">模版管理</span>
                </b-list-group-item>

                <b-list-group-item  to="/home/document">
                    <b-icon icon="file-earmark-text" class="ml-3 mr-4"></b-icon>
                    <span class="mr-auto">文档管理</span>
                </b-list-group-item>

                <b-list-group-item  to="/home/course" v-show="confirmPermission()">
                    <b-icon icon="book" class="ml-3 mr-4"></b-icon>
                    <span class="mr-auto">课程管理</span>
                </b-list-group-item>

                <b-list-group-item to="/home/user" v-show="confirmPermission()"> 
                    <b-icon icon="people-fill" class="ml-3 mr-4"></b-icon>
                    <span class="mr-auto">权限管理</span>
                </b-list-group-item>
            </b-list-group>
        </b-col>
</template>
<script>
export default {
    data(){
        return{
            username:this.$store.state.user.name
        }
    },
    computed:{

    },
    methods:{
        confirmPermission(){
            console.log(this.$store.state.user.authority);
            if(this.$store.state.user.authority==0){
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>
