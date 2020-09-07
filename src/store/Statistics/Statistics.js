import api from '../../http/api'
import { Message } from 'element-ui'
export default {
    // 开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        reports:[]
    },
    //同步修改state的值
    mutations: {
        setreports(state, data) {
            state.reports = data;
        },
    },
    //这个是发请求的
    actions: {
        async getreports({commit} ){
            try{
                let res = await api.getreports()
                console.log(res.data,"数据统计")
               if(res.meta.status === 200){
                Message.success(res.meta.msg)
                localStorage.setItem('reports',JSON.stringify(res.data))
                commit('setreports',res.data.reports)
               }
            }catch(err){
                console.log(err)
            }
        }
        
    },
}

