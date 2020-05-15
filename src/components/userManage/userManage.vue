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
              <b-button class="ml-3" id="addUser" @click="showModal()"><b-icon icon="person-plus-fill" aria-hidden="true"></b-icon></b-button>
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
            :filterIncludedFields="filterOn"
            striped
            :fields="fields">
            <template v-slot:cell(操作)="row">
                <b-button size="sm" @click="deleteUser(row.item.userId)" class="mr-2">删除</b-button>
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    编辑
                </b-button>
            </template>

            <template v-slot:row-details="row">
                <b-card style="outline:none"> 
                <b-row class="mb-2" >
                    <b-col sm="2" class="text-sm-right" align-self="center" ><b>姓名:</b></b-col>
                    <b-col sm="3"><b-input v-model="row.item.name"></b-input></b-col>
                    <b-col sm="2" class="text-sm-right" align-self="center" ><b>权限:</b></b-col>
                    <b-col sm="3"><b-input v-model="row.item.authority"></b-input></b-col>
                </b-row>
                <b-row class="mb-2">
                    <b-col sm="2" class="text-sm-right" align-self="center" ><b>账号:</b></b-col>
                    <b-col sm="3"><b-input v-model="row.item.userName"></b-input></b-col>
                    <b-col sm="2" class="text-sm-right" align-self="center" ><b>密码:</b></b-col>
                    <b-col sm="3"><b-input v-model="row.item.passWord" type="password"></b-input></b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="2" class="text-sm-right" align-self="center" offset="8">
                    <b-button size="sm" @click="row.toggleDetails();updateUserInfo(row.item)">确定</b-button>
                    <b-button size="sm" @click="row.toggleDetails" class="ml-2">取消</b-button>
                  </b-col>
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

            <!-- 修改密码的模态框 -->
            <b-modal id="modal-center" hide-footer  centered title="添加用户" ref="form" >
                    <b-form  @submit.stop.prevent="addUser()" >
                        <b-form-group label="姓名" label-for="input-1" id="input-group-1">
                            <b-form-input id="input-1" v-model="form.name" placeholder="请输入姓名" required="required" ></b-form-input>    
                        </b-form-group>
                        <b-form-group label="账号" label-for="input-2" description="" id="input-group-2">
                            <b-form-input id="input-2" v-model="form.userName" placeholder="请输入账号" required="required"  ></b-form-input>    
                        </b-form-group>
                        <b-form-group label="密码" label-for="input-3" description="" id="input-group-3">
                            <b-form-input  id="input-3" v-model="form.passWord" placeholder="请输入密码" required="required"  ></b-form-input>    
                        </b-form-group>
                        <b-form-group label="权限" label-for="input-4" description="" id="input-group-4">
                            <b-form-input  id="input-4" v-model="form.authority" placeholder="请输入权限" required="required"  ></b-form-input>    
                        </b-form-group>
                        <b-form-group id="input-group-5">
                            <b-button type="submit"  variant="primary" >提交</b-button>
                        </b-form-group>
                    </b-form>
                </b-modal>
        </b-col>
        <b-col cols="2"></b-col>
    </b-row>
    </div>
</template>
<script>
import {getUsers,adduser,delUser,changeUserInfo} from "@/network/userApi"
export default {
    data(){
        return{
            filter: null,
            load:true,
            fields:[{key:'userId',label:'编号'},{key:'name',label:'姓名'},{key:'authority',label:'权限'},'操作'],
            perPage: 8,
            currentPage: 1,
            data:[],
            form:{},
            filterOn: ['name','authority']
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
      }).catch(err=>{
          this.makeToast('danger','获取用户列表失败')
      })
    },
    methods:{
      showModal() {
          this.$refs['form'].show()
      },
      hideModal() {
          this.$refs['form'].hide()
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
      //获取用户列表
      getusers(){
        getUsers().then(res=>{
          this.data = res.data;
          this.load = false;
        }).catch(err=>{
            this.makeToast('danger','获取用户列表失败')
        })
      },
      //添加用户
      addUser(){
        adduser({
          userName: this.form.userName,
          name: this.form.name,
          passWord: this.form.passWord,
          authority: this.form.authority
        }).then(res=>{
          this.makeToast('success','添加成功！');
          this.hideModal();
          this.resetModal();
          this.getusers();
        }).catch(err=>{
          this.makeToast('danger','添加失败！');
          this.resetModal();
        })
      },
      //删除用户
      deleteUser(id){
        delUser(id).then(res=>{
          this.makeToast('success','删除成功！');
          this.getusers();
        }).catch(err=>{
          this.makeToast('danger','删除失败！');
        })
      },
      //重置发帖模态框表单
      resetModal(){
          this.form = {
            userName:'',
            name:'',
            passWord:'',
            authority:''
          }
      },
      //更改用户信息
      updateUserInfo(item){
        changeUserInfo({
          userId: item.userId,
          userName: item.userName,
          passWord: item.passWord,
          name: item.name,
          authority: item.authority
        }).then(res=>{
          this.makeToast('success','更新信息成功！');
          this.getusers();
        }).catch(err=>{
          this.makeToast('danger','更新信息失败！');
        })
      }
    }
}
</script>