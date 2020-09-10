import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from 'dayjs'
export default {
    // 开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        order:[], //订单
        total:0
    },
    //同步修改state的值
    mutations: {
        setorder(state ,data){
            state.order = data
        },
        settotal(state,data){
            state.total = data
        }
    },
    //这个是发请求的
    actions: {
        async getorders({ commit }, { query, pagenum, pagesize, user_id, pay_status, is_send,
            order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) {
            try {
                let res = await api.getorders({
                    query, pagenum, pagesize, user_id, pay_status, is_send,
                    order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr
                })
                if(res.meta.status === 200){
                    Message.success(res.meta.msg)
                res.data.goods.map(item => {
                    item.update_time = dayjs(item.update_time).format('YYYY-MM-DD/HH-mm-ss')
                    // if(item.pay_status === "0"){
                    //     Vue.set(item,"pay_statuss","未付款")
                    //   }
                    //   if(item.pay_status === "1"){
                    //     Vue.set(item,"pay_statuss","已付款")
                    //   }
                })
                console.log(res.data,"订单")
                }
                commit("setorder",res.data.goods)
                commit("settotal",res.data.total)
            } catch (err) {
                console.log(err)
            }
        },
        async getkuaidi({dispatch},{id}){
            let res = await api.getkuaidi({id})
            dispatch("")
        }
    },
}

