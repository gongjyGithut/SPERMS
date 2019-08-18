import { login, getInfo } from '@/api/login'


const user = {
  state: {
    name: '',
    roleid: ''
  },

  mutations: {
    
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roleid) => {
      state.roleid = roleid
    },
    SET_SESSION: (state, recordId) =>{
      sessionStorage.setItem('username', JSON.stringify(recordId))
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          //this.$store.dispatch('GetInfo',this.loginForm.username)
          commit('SET_SESSION', userInfo.username)//保存到session中
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state },username) {
      const recordId = username
      let parmas = {}
      parmas.recordId = recordId
      return new Promise((resolve, reject) => {
        getInfo(parmas).then(response => {
          
          let data = response.record
          
          commit('SET_NAME', data.uName)
          commit('SET_ROLES', data.roleId)
          //commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '')
        // removeToken()
        sessionStorage.removeItem('username')
        resolve()
      })
    }
  }
}

export default user
