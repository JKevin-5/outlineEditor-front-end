<template>
<!-- 课程编辑页面 -->
    <div>
        <b-row>
            <!-- 面包屑 -->
            <b-breadcrumb >
                <b-breadcrumb-item to="/home/course">课程管理</b-breadcrumb-item>
                <b-breadcrumb-item active>新建课程</b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>
        <b-row>
            <!-- 课程编辑界面 -->
                <b-form style="height: 800px;width:600px;margin:20px;">
                    <b-form-group label-cols-sm="4" label="课程编号：" label-for="input-1" >
                        <b-form-input id="input-1" v-model="courseInfo.course_id" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="课程名称：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.course_name_cn" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="英文名称：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.course_name_cn" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="学分：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="课程类别：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="适用专业：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="实验/上机学时：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="先修课程：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="版本：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="执笔人：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label="审核人：" label-for="input-1">
                        <b-form-input id="input-1" v-model="courseInfo.credit" required placeholder=""></b-form-input>
                    </b-form-group>
                </b-form>
            
        </b-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            courseInfo:{

            }
        }
    }

}
</script>
<style scoped>

</style>