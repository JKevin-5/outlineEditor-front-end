import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    tocken:'',
    user:{}
  },
  mutations: {
    //登录成功
    login(state,userInfo){
      state.isLogin=true;
      state.user=userInfo;
    },
    //注销
    logout(state){
      state.isLogin=false;
      state.user={}
    }
  },
  actions: {
  },
  modules: {
  }
})
