import api from '../../http/api'
import { Message } from 'element-ui'
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
     //1.角色列表
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
},
}

