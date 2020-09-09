import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from 'dayjs'
export default {
    // 开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goods:[],
        total:0
    },
    //同步修改state的值
    mutations: {
    setgoods(state ,data){
        state.goods = data
    },
    settotal(state,data){
        state.total = data
    }
    },
    //这个是发请求的
    actions: {
    async getgoods({commit} ,{query,pagenum,pagesize}){
        try{
            let res  = await api.getgoods({query,pagenum,pagesize})
            console.log(res ,"商品列表")
            commit("setgoods",res.data.goods)
            commit("settotal",res.data.total)
        }catch(err){}
    }
    },
}

