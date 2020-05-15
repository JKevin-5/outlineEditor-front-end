<template>
  <div class="header">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">课程大纲编辑系统</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
         
        </b-nav-form>


        <b-nav-item-dropdown right class="pr-5">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            {{name}}
          </template>
          <b-dropdown-item to="/home/setting">设置</b-dropdown-item>
          <b-dropdown-item @click="logout">注销</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    data(){
      return {
        name: this.$store.state.user.name
      }
    },
    methods:{
      logout(){
        this.$store.commit('logout');
        this.$router.push('/login');
      }
    }

}
</script>

<style>
.header{
  
  position: sticky;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1071;
}
</style>