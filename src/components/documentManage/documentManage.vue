<template>
  <!-- 文档管理 -->
  <div>
    <!-- 面包屑 -->
        <b-row>
            <b-breadcrumb >
                <b-breadcrumb-item to="/home">首页</b-breadcrumb-item>
                <b-breadcrumb-item active>文档管理</b-breadcrumb-item>
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
              <b-button class="ml-3" to="/home/document/dEditor"><b-icon icon="file-earmark-plus" aria-hidden="true"></b-icon></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
    <!-- 模板列表 -->
    <b-row cols="12">
        <b-col cols="9" offset="1">
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
            <template v-slot:cell(序号)="row">
                <span>{{row.index+1}}</span>
            </template>
            <template v-slot:cell(文档状态)="row" >
                <b-badge variant="secondary" class="ml-2" v-if="row.item.status=='未提交'">未提交</b-badge>
                <b-badge variant="secondary" class="ml-2" v-if="row.item.status=='审核中'">审核中</b-badge>
                <b-badge variant="secondary" class="ml-2" v-if="row.item.status=='审核未通过'">审核未通过</b-badge>
                <b-badge variant="secondary" class="ml-2" v-if="row.item.status=='审核通过'">审核通过</b-badge>
            </template>
            <template v-slot:cell(操作)="row">
              <div v-if="confirmUser(row.item.userName)">
                <b-button size="sm" @click="editDocument(row.item.id)" class="mr-2">编辑</b-button>
                <b-button size="sm" class="mr-2" @click="showModal();setInfo(row.item.id,row.item.name,row.item.status)">提交</b-button>
                <b-button size="sm" @click="deleteDocument(row.item.id)" class="mr-2">删除</b-button>
              </div>
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
    <b-modal id="modal" centered title="提交" ref="form" @ok="submit()" @hidden="resetModal()" @show="resetModal">
      <b-form-textarea v-model="message.data" no-resize placeholder="填写信息"></b-form-textarea>
    </b-modal>
  </div>
</template>
<script>
import {getAllDocuments,deleteDocument,getDocumentByUserName,changeStatus} from '@/network/documentApi'
import {nowTime} from '@/network/templateApi'
import {sendMessage} from '@/network/messageApi'
export default {
    data(){
      return{
        status:'',
        d_id:'',
        d_name:'',
        message:{
          data:''
        },
        filter: null,
        perPage: 8,
        currentPage: 1,
        load: true,
        fields:['序号',{key:'date',label:'时间'},{key:'name',label:'文档名称'},{key:'t_id',label:'模板版本编号'},{key:'userName',label:'编写人'},'文档状态','操作'],
        data:[],
        filterOn: ['date','name']
      }
    },
    computed:{
      rows(){
        return this.data.length
      }
    },
    methods:{
      showModal() {
            this.$refs['form'].show()
        },
      hideModal() {
            this.$refs['form'].hide()
        },
      setInfo(id,name,status){
        this.d_id=id;
        this.d_name=name;
        this.status=status;
      },
      resetModal(){
        this.message={data:''},
        this.d_id='',
        this.d_name='',
        this.status=''
      },
      submit(){
        if(this.status!='审核中'&&this.status!='审核通过'){
          sendMessage({
            addresser: this.$store.state.user.name,
            receiver: 0,
            date: nowTime(),
            d_id: this.d_id,
            d_name: this.d_name,
            message: JSON.stringify(this.message),
            status: '审核中'
          }).then(res=>{
            console.log("提交成功");
            this.changeStatus();
            this.makeToast('success','提交成功！');
            this.hideModal();
          }).catch(err=>{
            console.log("提交失败，err"+err);
            this.makeToast('danger','提交失败');
            this.hideModal();
          })
        }else{
          this.makeToast('danger','已提交，请勿重复提交！');
        }
      },
      //修改文档状态
      changeStatus(){
        changeStatus(this.d_id,'审核中'
        ).then(res=>{
            console.log("文档权限修改成功");
        }).catch(err=>{
            console.log("文档权限修改失败"+err);
        })
      },
      //权限查看
      confirmUser(userName){
        if(this.$store.state.user.name==userName){
          return true;
        }else{
          return false;
        }
      },
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
          this.getDocuments();
        }).catch(err =>{
          this.load=true;
          this.makeToast('danger','删除失败!'+<br/>+'具体原因：'+err);
        })
      },
      //编辑文档
      editDocument:function(id){
        this.$router.push({name:'dEditorById',params:{documentId:id}});
      },
      //导入文档记录判断
      getDocuments:function(){
        //若权限为系主任，可看所有文档
        if(this.$store.state.user.authority==0){
            getAllDocuments().then(res=>{
              this.data = res.data;
              this.load = false;
            })
        }else{
          //仅查看个人文档
            getDocumentByUserName(this.$store.state.user.name).then(res =>{
              console.log('load info success');
              this.data = res.data;
              this.load = false;
          })
        }
      }
    },
    beforeCreate:function(){
      //若权限为系主任，可看所有文档
      if(this.$store.state.user.authority==0){
          getAllDocuments().then(res=>{
            this.data = res.data;
            this.load = false;
          })
      }else{
        //仅查看个人文档
          getDocumentByUserName(this.$store.state.user.name).then(res =>{
            console.log('load info success');
            this.data = res.data;
            this.load = false;
        })
      }
    }
}
</script>