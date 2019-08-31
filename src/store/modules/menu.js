import {addRoleRelation} from '@/api/setting/sysrole'
import {getSysmenuList} from '@/api/setting/sysmenu'
const menu = {
  state: {
    menuList:[],
    checkNodes:[],
    roleId:0,
  },

  mutations: {
    
    SET_NODES: (state, checkNodes) => {
      state.checkNodes = checkNodes
      console.log(state.checkNodes)
    },
    SET_ROLEID:(state, roleId)=>{
      state.roleId = roleId
    }
  },

  actions: {
    setMenuList({commit},parmas){
      return new Promise((resole,reject) =>{
        getSysmenuList(parmas).then(res =>{

        })
      })
    },
    setCheckNodes({ commit }, checkNodes) {
      console.log(checkNodes)
      return new Promise((resole,reject) =>{
        commit('SET_NODES',checkNodes)

        resole()
      })
      
    },
    setRoleId({commit},roleId){
      commit('SET_ROLEID',roleId)
    },
    setRolePromission({state}) {
      
      return new Promise((resolve, reject) => {
        let parmas ={}
        parmas.menuIds = state.checkNodes
        parmas.roleId = state.roleId
        addRoleRelation(parmas).then(res =>{
          console.log(res)
          resolve(res)
        })
      })
    },


  }
}

export default menu
