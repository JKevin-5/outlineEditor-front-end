<template>
    <!-- 文档编辑界面 -->
    <div class="pb-5" style="overflow-y: auto;overflow-x: hidden;height: 800px">
        <!-- 模版编辑栏 -->
        <b-row>
            <b-col>
                <b-button-group style="display: flex; position: fixed;z-index: 1071;">
                    <b-dropdown left :text=font>
                        <b-dropdown-item @click="changeFontFamily('SimSun')">宋体</b-dropdown-item>
                        <b-dropdown-item>微软雅黑</b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown left text="添加文本">
                        <b-dropdown-item @click="addParagraph('subhead')"><span style="font-size: 24px">二级标题</span></b-dropdown-item>
                        <b-dropdown-item @click="addParagraph('thirdhead')"><span style="font-size: 20px">三级标题</span></b-dropdown-item>
                        <b-dropdown-item @click="addParagraph('paragraph')">段落</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click="addTable1">表格</b-dropdown-item>
                        <b-dropdown-item @click="addCourseInfo">课程信息表</b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown text="保存" split  ref="dropdown"  @click="save">
                        <b-dropdown-form>
                            <b-form-group>
                                <b-form-checkbox switch>自动保存</b-form-checkbox>
                            </b-form-group>
                        </b-dropdown-form>
                    </b-dropdown>
                    <b-dropdown id="dropdown-form" text="设置" ref="dropdown" >
                        <b-dropdown-form>
                            <b-form-group label="文档名称" label-for="dropdown-form-name" @submit.stop.prevent description="默认为空白">
                                <b-form-input
                                    id="dropdown-form-name"
                                    size="sm"
                                    style="width:200px"
                                    v-model="name"
                                ></b-form-input>
                            </b-form-group>
                            <b-button variant="primary" size="sm" @click="hideDropdown">确认</b-button>
                            <b-form-group label="模板版本编号" label-for="dropdown-form-tId" class="mt-3" description="默认为最新模板">
                                <b-form-input
                                    id="dropdown-form-tId"
                                    size="sm"
                                    style="width:200px"
                                    v-model="t_id"
                                ></b-form-input>
                            </b-form-group>
                            <b-button variant="primary" size="sm" @click="getTemplate();hideDropdown()" >导入</b-button>
                        </b-dropdown-form>
                    </b-dropdown>
                    <b-button @click="download()">下载</b-button>
                </b-button-group>
            </b-col>
        </b-row>
        <!-- 编辑区域 -->
        <b-row cols="1" class="mt-5">
    
            <!-- 编辑区域 -->
            <b-col class="mt-3" v-for="(item,index) in data" :key="index">
                <b-row cols="12">

                    <!-- 段落类型 -->
                    <b-col cols="2" class="text-center" align-self="center">
                        <!-- 主标题-title类型 -->
                        <label v-if="item.type=='title'">主标题：</label>

                        <!-- 固定表格类型 -->
                        <label v-if="item.type=='fixedTable'">课程信息：</label>

                        <!-- 表格类型 -->
                        <label v-if="item.type=='table'">表格：</label>

                        <!-- 普通文本类型 -->
                        <b-form-select v-if="item.type=='subhead'||item.type=='thirdhead'||item.type=='paragraph'" v-model="item.type" :options="options" style="border-width: 0;width:130px" class="ml-3"></b-form-select>
                        
                    </b-col>
                    
                    
                    <!-- 段落内容编辑部分 -->
                    <b-col cols="7" align-self="center">
                        <!-- 主标题 -->
                        <b-input-group v-if="item.type=='title'" >
                            <b-form-input placeholder="请输入内容" class="textarea textinput" size="lg" :plaintext="item.status" v-model="item.content"></b-form-input>
                        </b-input-group>

                        <!-- 二级标题/三级标题 -->
                        <b-input-group v-if="item.type=='subhead'||item.type=='thirdhead'">
                            <b-form-input placeholder="请输入内容" :plaintext="item.status" v-model="item.content" style="font-weight: bold;" class="textinput"></b-form-input>
                        </b-input-group>

                        <!-- 段落 -->
                        <b-input-group v-if="item.type=='paragraph'">
                            <b-form-textarea placeholder="请输入内容" :plaintext="item.status" v-model="item.content" rows="2" max-rows="15" class="textinput"></b-form-textarea> 
                        </b-input-group>

                        <!-- 固定课程信息查询 -->
                        <b-input-group prepend="课程查询" v-if="item.type=='fixedTable'" v-show="item.content==null" class="pt-4">
                            <b-form-input :list="'my-list'+index"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="info" @click="confirmCourse(index)">确定</b-button>
                            </b-input-group-append>
                        </b-input-group>

                        <!-- 固定表格填充 -->
                        <b-table-simple class="mt-3" v-if="item.type=='fixedTable'&&item.content!=null" hover small caption-top responsive bordered>
                            <b-tbody>
                                <b-tr style="text-align: center;">
                                    <b-th class="text-center " >课程编号</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.course_id"></b-input></b-td>
                                    <b-th class="text-center">学分</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.credit"></b-input></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-th class="text-center" >总学时</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.period"></b-input></b-td>
                                    <b-th class="text-center">实验/上机学时</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.practice_hour"></b-input></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-th class="text-center">课程名称</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.course_name_cn"></b-input></b-td>
                                    <b-th class="text-center">英文名称</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.course_name_en"></b-input></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-th class="text-center">课程类别</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.obligatory"></b-input></b-td>
                                    <b-th class="text-center">适用专业</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.discipline"></b-input></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-th class="text-center">执笔人</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.author"></b-input></b-td>
                                    <b-th class="text-center">审核人</b-th>
                                    <b-td><b-input class="fixcol" v-model="item.content.reviewer"></b-input></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-th class="text-center">先修课程</b-th>
                                    <b-td colspan="3"><b-input class="fixcol" v-model="item.content.precondition"></b-input></b-td>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>

                        <!-- 循环表格新建 -->
                        <b-input-group v-if="item.type=='table'&&item.content.data.length==0">
                            <b-input-group-prepend>
                                <b-input-group-text>列数</b-input-group-text>
                                <b-form-spinbutton v-model="item.content.cols" min="1" max="10"></b-form-spinbutton>
                                <b-input-group-text>行数</b-input-group-text>
                                <b-form-spinbutton v-model="item.content.rows" min="1" max="20"></b-form-spinbutton>  
                            </b-input-group-prepend>
                            
                            <b-input-group-append>
                                <b-button variant="info" @click="addTable(index)" v-if="item.content.cols>=1&&item.content.rows>=1">确定</b-button>
                            </b-input-group-append>
                        </b-input-group>

                        <!-- 循环表格填充 -->
                        <b-table-simple class="mt-3" v-if="item.type=='table'&&item.content.data.length!=0" hover small caption-top responsive bordered>
                            <caption>
                                <b-input-group prepend="表格注释">
                                     <b-form-input v-model="item.content.tablenote" :disabled="item.status.tablenote" style="text-align: center;"></b-form-input>
    
                                </b-input-group>
                            </caption>
                            
                            <!-- 表头 -->
                            <b-thead>
                                <b-tr>
                                    <b-th v-for="(head,i) in item.content.header" :key="i" class="text-center">
                                        <b-input v-model="item.content.header[i]" style="border-width: 0;text-align: center;font-weight: bold;" :plaintext="item.status.header"></b-input>
                                    </b-th>
                                </b-tr>
                            </b-thead>

                            <!-- 表身 -->
                            <b-tbody>
                                <b-tr v-for="(data,i) in item.content.data" :key="i">
                                    <b-td v-for="(it,n) in data" :key="n" class="text-center" >
                                        <b-form-textarea v-model="data[n]" style="border-width: 0;" rows="2" max-rows="9"></b-form-textarea>
                                    </b-td>
                                    <b-row>
                                        <b-col>
                                            <b-button variant="link" @click="delTableRow(index,i)">删除</b-button>
                                        </b-col>
                                        <b-col>
                                            
                                        </b-col>
                                    </b-row>
                                        
                                        <b-button variant="link" @click="addTableRow(index,i+1)">添加</b-button>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                       
                    </b-col>
                    
                    <!-- 段落操作栏 -->
                    <b-col cols="2" align-self="center" v-if="item.type!='title'"> 
                        <b-button-group>
                            <b-button  variant="outline-danger" @click="deleteParagraph(index)">删除</b-button>
                            <b-button  variant="outline-secondary" class="">在下方添加</b-button>
                        </b-button-group>
                    </b-col>

                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import {getDocumentById, newDocument,saveDocumentById,autoId} from '@/network/documentApi'
import {nowTime,getTemplateById} from '@/network/templateApi'
import axios, * as others from 'axios';
export default {
    data(){
        return{
            name:'',
            t_id: '',
            font:'SimHei',
            options:[
                {
                    value: 'subhead',
                    text: '二级标题：'
                },{
                    value: 'thirdhead',
                    text: '三级标题：'
                },{
                    value: 'paragraph',
                    text: '段落：'
                }
            ],
            data:[],
            content:{data:[]}
        }
    },
    beforeCreate:function(){
        if(this.$route.params.documentId){
            //获取相应id的模板内容
            getDocumentById(this.$route.params.documentId).then(res=>{
                this.name=res.data.name;
                this.data=res.data.content.data;
                this.date=res.data.date;
                this.t_id=res.data.t_id;
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    methods:{
        //创建段落
        addParagraph:function(type){
            this.data.push({type:type,content:'',status: false})
        },
        //创建课程信息表
        addCourseInfo:function(){
            this.data.push({type: 'fixedTable',content:{data:[]}});
        },
        //创建表格
        addTable1:function(){
            this.data.push({type: 'table',content:{tablenote:'',header:[],data:[],rows:0,cols:0},status:{tablenote:false,header:false}})
        },
        //删除段落
        deleteParagraph: function(index){
             this.data.splice(index,1);
        },
        //选定课程
        confirmCourse:function(index){
            this.data[index].content.data.push(
                            ["课程编号","0BH04227","学    分","3"],
                            ["总 学 时","48","实验/上机学时","实验：16学时"],
                            ["课程名称","Java Web技术","英文名称","The Technologies of Java Web"]);
        },
        //新建表格
        addTable:function(index){
            var cols =new Array;
            //循环建立表头
            for(var i=0;i<this.data[index].content.cols;i++){
                cols.push('');
            }
            this.data[index].content.header=cols;

            //循环建立行
            for(var i=0;i<this.data[index].content.rows;i++){
                var row = new Array;
                for(var j=0;j<this.data[index].content.cols;j++){
                    row.push('');
                }
                this.data[index].content.data.push(row);
            }
        },
        //表格删除行
        delTableRow:function(index,row){
            this.data[index].content.data.splice(row,1);
        },
        //表格添加行
        addTableRow:function(index,row){
            var rows = new Array;
            for(var j=0;j<this.data[index].content.cols;j++){
                rows.push('');
            };    
            this.data[index].content.data.splice(row,0,rows);
        },
        //字体按钮变化
        changeFontFamily:function(font){
            this.font=font;
        },
        //下载文件
        download(){
            this.content.data = this.data;
            axios.post("/api/word",JSON.stringify({
              content: JSON.stringify(this.content)
          }),
          {headers:{ 'Content-Type':'application/json'  },
           responseType: 'blob'
          }
          )
          .then((response)=>{
             //console.log(response.data);
             if(!response.data){
                return
            } 
            let data = response.data;
            let blob = new Blob([data],{type: 'application/ms-word'});
            let objectUrl = URL.createObjectURL(blob);
            let link = document.createElement("a"); 

            link.href = objectUrl
            link.setAttribute('download', ''+this.name)

            document.body.appendChild(link)
            link.click()
            console.log("导出成功！");
          })
          .catch((error)=>{
              console.log(error);
          })
        },
        //显示状况
        makeToast(variant,content) {
        this.$bvToast.toast(content, {
          title: `提示信息`,
          variant: variant,
          solid: true
        })
        },
        //保存当前文件
        save(){
            this.content.data = this.data;
            if(this.$route.params.documentId){
                saveDocumentById({
                    id: this.$route.params.documentId,
                    date: nowTime(),
                    name: this.name,
                    t_id: this.t_id,
                    content: JSON.stringify(this.content)
                }).then(res=>{
                    this.makeToast('success','保存成功！');
                    this.date=nowTime();
                    console.log("success");
                }).catch(err=>{
                    console.log(err);
                    this.makeToast('danger','保存失败！');
                })
            }else{
                newDocument({
                    date: nowTime(),
                    name: this.nowTime,
                    t_id: this.t_id,
                    content: JSON.stringify(this.content) 
                }).then(res=>{
                    this.makeToast('success','新建成功！');
                    this.date=nowTime();
                    autoId().then(res=>{
                        this.$route.params.documentId = res.data;
                        console.log(res.data);
                        console.log(this.$route.params.documentId);
                    }).catch(err=>{
                        console.log(err);
                    })
                    console.log("success");
                }).catch(err=>{
                    console.log(err);
                    this.makeToast('danger','新建失败！');
                })
            }
        },
        //关闭当前下拉菜单
        hideDropdown(){
            this.$refs.dropdown.hide(true);
        },
        //导入模板
        getTemplate(){
            getTemplateById(this.t_id).then(res=>{
                this.data= res.data.content.data;
                this.makeToast('success','导入成功！');
            }).catch(err=>{
                console.log(err);
                if(err.response.status==500){
                    this.makeToast('danger','模板不存在。\n导入失败！');
                }else{
                    this.makeToast('danger','导入失败！');
                }
                
            })   
        }
    }
}
</script>
<style scoped>
.textarea{
    /* border-width: 0; */
    text-align: center;
    font-weight: bold;
}
.textinput{
    outline:none;
    border: none;
}
.fixcol{
    border-width: 0;
    text-align: center;
}
</style>