<template>
<b-container class="main" fluid>
<!--动态面板-->
  <b-row cols="1">
    <!--导航栏-->
    <b-col class="mb-3">
      <Navbar/>
    </b-col>
    <b-col>
      <b-row cols="12">
        <!-- 侧边导航栏 -->
        <b-col lg="2">
            <sidebar/>
        </b-col>
        <!-- 显示界面 -->
        <b-col lg="9" offset-lg="1">
            <router-view></router-view>
        </b-col>
    </b-row>
    </b-col>
  </b-row>
</b-container>

</template>
<script>
import Navbar from '../components/common/navbar.vue'
import sidebar from '../components/common/sidebar.vue'
export default {
  components:{
    Navbar,
    sidebar
  }
}
</script>
<style scoped>
.main{
  padding: 0px;
}
</style>