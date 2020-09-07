import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import jurisdiction from './jurisdiction/jurisdiction'
import Statistics from './Statistics/Statistics'

Vue.use(Vuex)

export default new Vuex.Store({
  //存储共享的数据
  state: {
  },
  //同步修改state的值
  mutations: {
  },
  //这个是发请求的
  actions: {
  },
  // 模块
  modules: {
    user, //用户管理
    jurisdiction, //权限管理
    Statistics //数据统计
  }
})
