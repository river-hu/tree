import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:true,
    token:"",
    data:{},
    isios:''
  },
  mutations: {
    loaded (state){
      state.loading = false;
    },
    load_start (state){
      state.loading = true;
    }
  },
  actions: {

  }
})
