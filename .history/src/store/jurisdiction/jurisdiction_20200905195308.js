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
    setroles(state, data) {
        state.roles = data;
    },
},
//这个是发请求的
actions: {
    //1.分配用户角色请求
    async putusersrole({ dispatch }, { id, rid, query, pagenum, pagesize }) {
        try {
            let res = await api.putusersrole({ id, rid });
            if (res.meta.status === 200) {
                Message.success(res.meta.msg);
                dispatch("getuserlist", { query, pagenum, pagesize });
            } else if (res.meta.status === 400) {
                Message.error(res.meta.msg);
            }
        } catch (err) {
            console.log(err);
        }
    },
},
}

