<template>
    <div>
        <!-- 面包屑 -->
        <b-row>
            <b-breadcrumb >
                <b-breadcrumb-item active>首页</b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>

        <!-- 消息框 -->
        <b-row cols="12" >
            <b-col cols="8" offset="1" style="height: 400px">
                <b-card no-body style="max-width: 900px;max-height: 800px">
                    <b-card-body style="overflow-y: auto;overflow-x: hidden;">
                        <b-card-title>消息通知</b-card-title>
                        <b-card-sub-title class="mb-2">Notification list</b-card-sub-title>
                        <!-- 通知列表 -->
                        <b-list-group >
                            <div v-for="(item,index) in data" :key="index">
                                <b-list-group-item href="#"  class="flex-column align-items-start" v-b-toggle="'collapse-'+index" >
                                    <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{item.addresser}}</h5>
                                    <small>{{sub(item.date)}}</small>
                                    </div>
                                    <p class="mb-1">
                                        {{JSON.parse(item.message).data }}
                                    </p>
                                    <small class="text-muted">文档：{{item.d_name}}</small>
                                </b-list-group-item>
                                <b-collapse :id="'collapse-'+index">
                                    <div class="m-3">
                                        <b-button @click="editDocument(item.d_id)">查看文档</b-button>
                                        <b-button class="ml-3" @click="showModal(item);">审核</b-button>
                                        <b-button class="ml-3">删除</b-button>
                                    </div>
                                </b-collapse>
                            </div>
                        </b-list-group>
                    </b-card-body>
                </b-card>
                <b-modal id="modal" centered title="提交" ref="form" @ok="sendBack(item)" @hidden="resetModal()" @show="resetModal">
                    <b-form-textarea v-model="message.data" no-resize placeholder="填写信息"></b-form-textarea>
                    <b-form-select v-model="status" :options="options" class="mt-2"></b-form-select>
                </b-modal>
            </b-col>
        </b-row>


    </div>
</template>
<script>
import { getMessages,timeSub,sendMessage } from '@/network/messageApi'
import { nowTime} from '@/network/templateApi'
export default {
    data(){
        return{
            data:[],
            message:{
                data:''
            },
            status:'',
            options:['审核通过','审核失败'],
            item:{}
        }
    },
    beforeCreate:function(){
        getMessages(this.$store.state.user.authority).then(res=>{
            this.data=res.data;
            //console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },
    methods:{
        showModal(items) {
            this.$refs['form'].show();
            this.item = items;
        },
        hideModal() {
            this.$refs['form'].hide()
        },
        resetModal(){
            this.message={data:''},
            this.status=''
        },
        //显示状况
        makeToast(variant,content) {
            this.$bvToast.toast(content, {
            title: `提示信息`,
            variant: variant,
            solid: true
            })
        },
        //时间差
        sub(dateString){
            return timeSub(dateString);
        },
        //编辑文档
        editDocument(id){
            this.$router.push({name:'dEditorById',params:{documentId:id}});
        },
        //审核
        sendBack(item){
            sendMessage({
                addresser: this.$store.state.user.name,
                receiver: item.receiver,
                date: nowTime(),
                d_id: item.d_id,
                d_name: item.d_name,
                message: JSON.stringify(this.message),
                status: this.status
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
        }
    }
}
</script>