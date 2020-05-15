<template>
  <!-- 课程管理 -->
  <div>
  <!-- 面包屑 -->
        <b-row>
            <b-breadcrumb >
                <b-breadcrumb-item to="/home">首页</b-breadcrumb-item>
                <b-breadcrumb-item active>课程管理</b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>  
    <!-- 新建按钮 -->
    <b-row>
      <b-col offset="8" >
        <b-button class="m-3" to="/home/course/cEditor"><b-icon icon="file-earmark-plus" aria-hidden="true"></b-icon></b-button>
      </b-col>
    </b-row>
    <!-- 模板列表 -->
    <b-row cols="12">
      <b-col cols="8" offset="1">
        <b-table 
          :bordered= true
          :busy= false
          :outlined= true 
          :items="data"
          :fields="fields">
          <template v-slot:cell(操作)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">编辑</b-button>
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">删除</b-button>
          </template>
        </b-table>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
  </div>
</template>
<script>
export default {
    data(){
      return{
        fields:['序号','时间','课程名称','操作'],
        data:[{
              序号:1,
              时间:'2020-04-06',
              课程名称:'《JavaWeb程序设计》'
            }]
      }
    },
    methods:{
      
    }
}
</script>