<template>
  <!-- 模版管理 -->
  <div>
    <!-- 面包屑 -->
    <b-row>
      <b-breadcrumb >
        <b-breadcrumb-item to="/home">首页</b-breadcrumb-item>
        <b-breadcrumb-item active>模板管理</b-breadcrumb-item>
      </b-breadcrumb>
    </b-row>
    <!-- 编辑区域 -->
    <b-row cols="12">
      <b-col cols="3" class="ml-2">
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="table"
            align="right"
            class="m-3 "
          >
          </b-pagination>
      </b-col>
      <b-col cols="4" offset="2">
        <b-form-group
          label="筛选："
          label-cols-sm="3"
          label-align-sm="right"
          label-for="filterInput"
          class="m-3"
        >
          <b-input-group >
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button class="ml-3" to="/home/template/tEditor"><b-icon icon="file-earmark-plus" aria-hidden="true"></b-icon></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
    <!-- 模板列表 -->
    <b-row cols="12">
      <b-col cols="8" offset="1">
          <b-table
          id="table" 
          :bordered= true
          :busy= load
          :outlined= true 
          :items="data"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :fields="fields">
          <template v-slot:cell(操作)="row">
            <b-button size="sm" @click="editTemplate(row.item.id)" class="mr-2">编辑</b-button>
            <b-button size="sm" @click="deleteTemplate(row.item.id)" class="mr-2">删除</b-button>
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
  </div>
</template>
<script>
import {getAllTemplates,deleteTemplate} from "@/network/templateApi"

export default {
    data(){
      return{
        filter: null,
        perPage: 8,
        currentPage: 1,
        load:true,
        fields:[{key:'id',label:'版本编号'},{key:'date',label:'时间',sortable: true},{key:'remark',label:'备注'},'操作'],
        data:[],
        filterOn: ['remark','authority']

      }
    },
    computed:{
      rows(){
        return this.data.length
      }
    },
    methods:{
      //显示状况
        makeToast(variant,content) {
        this.$bvToast.toast(content, {
          title: `提示信息`,
          variant: variant,
          solid: true
        })
        },
      //删除模版
      deleteTemplate:function(id){
        deleteTemplate(id).then(res =>{
          this.makeToast('success','删除成功!');
          getAllTemplates().then(res =>{
            this.data=res.data;
            this.load=false;
          })
        }).catch(err =>{
          this.load=true;
          this.makeToast('danger','删除失败!'+<br/>+'具体原因：'+err);
          console.log(err);
        })
      },
      //编辑模板
      editTemplate:function(id){
        this.$router.push({name:'tEditorById',params:{templateId:id}});
      }

    },
    beforeCreate:function(){
      getAllTemplates().then(res =>{
        console.log('success');
        this.data=res.data;
        this.load=false;
      })
    },
    updated:function(){
      
    }

}
</script>
<style scoped>
/* Busy table styling */
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}
</style>