<template>
    <!-- 权限管理 -->
    <div>
        <!-- 面包屑 -->
        <b-row>
            <b-breadcrumb >
                <b-breadcrumb-item href="/home">首页</b-breadcrumb-item>
                <b-breadcrumb-item active>权限管理</b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>
        <!-- 编辑区域 -->
        <b-row cols="12">
      <b-col cols="3" >
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
      <b-col cols="4" offset="3">
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
              <b-button class="ml-3" id="addUser"><b-icon icon="person-plus-fill" aria-hidden="true"></b-icon></b-button>
              <b-tooltip target="addUser">添加用户</b-tooltip>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

      </b-col>
      <b-col cols="2"></b-col>
      </b-row>
        <!-- 表格区域 -->
        <b-row cols="12">
        <b-col cols="9" offset="1">
            <b-table
            id="table" 
            :busy= load
            :outlined= true 
            :items="data"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            striped
            :fields="fields">
            <template v-slot:cell(操作)="row">
                <b-button size="sm" @click="editTemplate(row.item.id)" class="mr-2">编辑</b-button>
                <b-button size="sm" @click="deleteTemplate(row.item.id)" class="mr-2">删除</b-button>
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
            </template>

            <template v-slot:row-details="row">
                <b-card style="outline:none"> 
                <b-row class="mb-2" >
                    <b-col sm="2" class="text-sm-right" align-self="center" offset="1"><b>权限:</b></b-col>
                    <b-col sm="3"><b-input v-model="row.item.authority"></b-input></b-col>
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-row>
                </b-card>
            </template>

            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
                </div>
            </template>
            </b-table>
        </b-col>
        <b-col cols="2"></b-col>
    </b-row>
    </div>
</template>
<script>
import {getUsers} from "@/network/userApi"
export default {
    data(){
        return{
            filter: null,
            load:true,
            fields:[{key:'userId',label:'编号'},{key:'name',label:'姓名'},{key:'authority',label:'权限'},'操作'],
            perPage: 5,
            currentPage: 1,
            data:[]
        }
    },
    computed:{
        rows(){
            return this.data.length;
        }
    },
    beforeCreate:function(){
      getUsers().then(res=>{
          this.data = res.data;
          this.load = false;
      })
    },
    methods:{

    }
}
</script>