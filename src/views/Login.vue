<template>
  <!--主要容器 b-container-->
  <b-container class="justify-content-md-center" >

    <!--头部空白行 b-row-->
    <b-row align-v="start" class="justify-content-md-center" style="height:100px;">
    </b-row>

    <!--中部登录注册框主体 b-row-->
    <b-row align-v="center" class=" shadow p-3 mb-5 bg-white rounded">
      <b-col md="12" class="">
        <b-card no-body  >
          <b-row no-gutters>
            <!--左边图标列 b-col-->
            <b-col md="6">
              <b-card bg-variant="" text-variant="dark"  class="text-center" style="height:630px;margin:20px">
                <h1 style="width:400px;padding-top:190px;padding-left:50px">课程大纲在线编辑管理系统</h1>
              </b-card>
            </b-col>
            <!--右边窗口列 b-col-->
            <b-col md="6" class="d-flex justify-content-center">
              <b-card-body style="max-height:700px;max-width: 400px" class="mt-4">
                <Signin class="mt-5"/>
              </b-card-body>
            </b-col>
          </b-row>
         </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>
<script>
import Signin from '../components/login/Signin.vue'

export default{
  components:{
    Signin
  }
}
</script>
