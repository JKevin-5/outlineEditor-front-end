<template>
  <!-- 文档管理 -->
  <div>
    <!-- 面包屑 -->
        <b-row>
            <b-breadcrumb >
                <b-breadcrumb-item to="/home">首页</b-breadcrumb-item>
                <b-breadcrumb-item active>课程管理</b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>  
    <!-- 新建按钮 -->
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
      <b-col cols="3" offset="3">
        <b-form-group
          label="Filter"
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
              <b-button class="ml-3" href="/home/document/dEditor"><b-icon icon="file-earmark-plus" aria-hidden="true"></b-icon></b-button>
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
                :fields="fields">
            <template v-slot:cell(操作)="row">
                <b-button size="sm" @click="editDocument(row.item.id)" class="mr-2">编辑</b-button>
                <b-button size="sm" class="mr-2">提交</b-button>
                <b-button size="sm" @click="deleteDocument(row.item.id)" class="mr-2">删除</b-button>
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
import {getAllDocuments,deleteDocument} from '@/network/documentApi'
export default {
    data(){
      return{
        filter: null,
        perPage: 8,
        currentPage: 1,
        load: true,
        fields:[{key:'id',label:'编号'},{key:'date',label:'时间'},{key:'name',label:'文档名称'},{key:'t_id',label:'模板版本编号'},'操作'],
        data:[{
              id:1,
              date:'2020-04-06',
              name:'《JavaWeb程序设计》',
              t_id: '01'
            }]
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
      //删除文档
      deleteDocument:function(id){
        deleteDocument(id).then(res =>{
          this.makeToast('success','删除成功!');
          getAllDocuments().then(res =>{
            this.data=res.data;
            this.load=false;
          })
        }).catch(err =>{
          this.load=true;
          this.makeToast('danger','删除失败!'+<br/>+'具体原因：'+err);
        })
      },
      //编辑文档
      editDocument:function(id){
        this.$router.push({name:'dEditorById',params:{documentId:id}});
      }
    },
    beforeCreate:function(){
      getAllDocuments().then(res =>{
        console.log('load info success');
        this.data = res.data;
        this.load = false;
      })
    }
}
</script>