import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
  // 开启命名空间 这个文件就是单独的一个vuex的模块
  namespaced: true,
  state: {
    menus: [], //路由变量
    users: [],//用户列表
    total: 0, //条数
    userlist: [],//添加用户
    roles: [], //  角色列表
  },
  //同步修改state的值
  mutations: {
    setMenus(state, data) {
      state.menus = data
    },
    setusers(state, data) {
      state.users = data
    },
    setTotal(state, data) {
      state.total = data
    },
    setuserlist(state, data) {
      state.userlist = data
    },
    setroles(state, data) {
      state.roles = data;
    },
  },
  //这个是发请求的
  // 所有的请求都写在actions里面
  // action里面的方法可以传两个参数 第一个参数是整个store(vuex对象) 第二个参数是请求的参数
  actions: {
    // 所有的请求都写在actions里面
    // action里面的方法可以传两个参数 第一个参数是整个store(vuex对象) 第二个参数是请求的参数
    //路由请求
    async getMenus({ commit }) {
      let res = await api.getMenus()
      if (res.meta.status === 200) {
        // 提交mutation
        commit('setMenus', res.data)
        console.log(res.data, 'menus')
        console.log(router.options.routes, "路由结构")
        let page = router.options.routes.filter((item) => {
          return item.path === "#";
        });
        console.log(page, "有icon的路由");
        res.data.map((item1, index1) => {
          item1.icon = page[index1].meta.icon;
          // console.log(item1.icon)
          item1.children.map((item2, index2) => {
            item2.icon = page[index1].children[index2].meta.icon;
            // console.log(item2.icon, index1, index2, "子级图标");
          });
        });
      }
      res.data.map(item => {
        item.children.map(item1 => {
          item1.path =`/${item.path}/${item1.path}`
        })
      })
    },
    //登录请求
    async login({ commit }, { username, password }) {
      let res = await api.login({
        username,
        password
      })
      if (res.meta.status === 200) {
        // 存储信息
        localStorage.setItem('adminToken', res.data.token)
        localStorage.setItem('adminUser', JSON.stringify(res.data))
        // 跳转路由
        router.push('/')
        // 提示用户
        Message.success('登录成功')
      } else {
        Message.error(res.meta.msg)
      }
    },
    //用户数据列表请求
    async getusers({ commit }, { pagenum, pagesize, query }) {
      //try尝试的意思
      console.log(commit)
      try {
        let res = await api.getusers({
          pagenum,
          pagesize,
          query
        })
        console.log(res, res.meta.status, "列表")
        if (res.meta.status === 200) {
          commit('setusers', res.data.users)
          commit('setTotal', res.data.total)
        }
      } catch (err) {
        console.log(err)
      }
    },
    //添加用户
    async getuserlist({ dispatch }, { username, password, email, mobile, pagenum, pagesize, query }) {
      try {
        let res = await api.getuserlist({
          username, password, email, mobile
        })
        console.log(res.data, "添加")
        dispatch('getusers', {
          pagenum, pagesize, query
        })
      } catch (err) {
        console.log(err)
      }
    },
    //删除用户
    async deleteuser({ dispatch }, { id, pagenum, pagesize, query }) {
      try {
        let res = await api.deleteuser(id)
        console.log(res, "111")
        if (res.meta.status === 200) {
          Message.success('删除成功')
          //调用获取用户列表的接口
          dispatch('getusers', {
            pagenum, pagesize, query
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    //编辑用户
    async getuserser({ dispatch }, { id, email, mobile, pagenum, pagesize, query }) {
      try {
        let res = await api.getuserser({ id, email, mobile })
        console.log(res, "编辑用户")
        dispatch('getusers', {
          pagenum, pagesize, query
        })
      } catch (err) {
        console.log(err)
      }
    },
    //修改用户状态
    async getetusers({ dispatch }, { uId, type, pagenum, pagesize, query }) {
      try {
        let res = await api.getetusers({ uId, type })
        dispatch('getusers', {
          pagenum, pagesize, query
        })
      } catch (err) {
        console.log(err)
      }
    },
    //搜索用户
    async getusersjkl({ dispatch }, { id }) {
      try {
        let res = await api.getusersjkl({ id, pagenum, pagesize, query })
        dispatch('getusers', {
          pagenum, pagesize, query
        })
      } catch (err) {
        console.log(err)
      }
    },
    //分配用户
    async getusersolp({ dispatch }, { id, rid, query, pagenum, pagesize }) {
      try {
        let res = await api.getusersolp({ id, rid, pagenum, pagesize, query })
        if (res.meta.status === 200) {
          Message.success(res.meta.msg)
          dispatch("getusers", {
            pagenum, pagesize, query
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 角色列表
    async getroles({ commit }) {
      try {
        let res = await api.getroles();
        console.log(res.meta.status, "角色列表");
        if (res.meta.status === 200) {
          Message.success(res.meta.msg);
          commit("setroles", res.data);
        } else if (res.meta.status === 400) {
          Message.error(res.meta.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // getMenus() {
    //   api.getMenus().then().catch()
    // }
  },
}