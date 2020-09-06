import api from '../../http/api'
export default{
    // 开启命名空间
    namespaced:true,
//存储共享的数据
  state: {
    roles: [], //  角色列表
},
//同步修改state的值
mutations: {
    setuserr(state,data){
        state.userr = data
    }
},
//这个是发请求的
actions: {
    async getroles ({commit}) {
        try{
            let res = await api.getroles()
            console.log(res ,"角色列表")
            if(res.meta.status === 200){
                commit("setuserr" ,res.data)
            }
        }catch(err){
            console.log(err)
        }
    }
},
}

