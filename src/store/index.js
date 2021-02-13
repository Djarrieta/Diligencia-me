import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser:null,
    loading:false,
    alert:[],
    menuPrincipalItems:[
      {to:"/0/tareas",name:"Tareas"},
    ]
  }
})
