import api from '../../http/api'
import { Message } from 'element-ui'
export default {
    // 开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        roles: [], //  角色列表
        rights:[], // 权限列表

    },
    //同步修改state的值
    mutations: {
        setroles(state, data) {
            state.roles = data;
        },
        setrights(state,data){
            state.rights = data
        },
        setcommitdelete(state, { roleId, data }) {
            // console.log(state.roles, "state.roles");
            // console.log(roleId ,11111);
            // console.log(data ,22);
            state.roles.map((item) => {
                if (item.id === roleId) {
                    item.children = data;
                }
            });
            // console.log(data ,22);
        },
    },
    //这个是发请求的
    actions: {
        //1.角色列表
        async getroles({ commit }) {
            try {
                let res = await api.getroles();
                console.log(res, "角色列表");
                // if (res.meta.status === 200) {
                //     Message.success(res.meta.msg);
                   
                // } else if (res.meta.status === 400) {
                //     Message.error(res.meta.msg);
                // }
                commit("setroles", res.data);
            } catch (err) {
                console.log(err);
            }
        },
        //添加角色列表
        async getrolesw({ dispatch }, { roleName, roleDesc }) {
            try {
                let res = await api.getrolesw({ roleName, roleDesc })
                console.log(res ,"添加角色列表")
                if(res.meta.status === 201){
                    Message.success(res.meta.msg)
                    dispatch("getroles",)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 2.编辑提交角色
        async getrolesr({ dispatch }, { id, roleName, roleDesc }) {
            try {
                let res = await api.getrolesr({ id, roleName, roleDesc })
                console.log(res, "编辑角色")
                if(res.meta.status === 200){
                    Message.success(res.meta.msg)
                    dispatch("getroles",)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //删除角色
        async getrolesid({dispatch},{id}){
            try{
                let res = await api.getrolesid(id)
                // console.log(res ,"删除角色")
                if(res.meta.status === 200){
                    Message.success(res.meta.msg)
                    dispatch("getroles")
                }
            }catch(err){
                console.log(err)
            }
        },
        //权限列表
        async getrights({commit},{type}){
            try{
                let res = await api.getrights({type})
                console.log(res,"权限列表")
                commit("setrights",res.data)
            }catch(err){
                console.log(err)
            }
        },
        //角色授权
        async getrolesjkl({dispatch},{roleId,rids}){
            try{
                let res = await api.getrolesjkl({
                    roleId,rids
                })
                dispatch("getroles")
            }catch(err){
                console.log(err);
            }
        },
        //删除指定权限
        async getrolesdel ({commit},{roleId,rightId}){
            try {
                let res = await api.getrolesdel({ roleId, rightId });
                if (res.meta.status === 200) {
                    // console.log(roleId, "roleId");
                    Message.success(res.meta.msg);
                    // console.log(res, "删除角色指定权限请求");
                    commit("setcommitdelete", { roleId: roleId, data: res.data });
                    console.log(res.data,999)
                    // console.log(roleId,555)
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
}

