import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from 'dayjs'
export default {
    // 开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goods: [],   //商品列表
        total: 0,
        fication: [] //分类列表
    },
    //同步修改state的值
    mutations: {
        setgoods(state, data) {
            state.goods = data
        },
        settotal(state, data) {
            state.total = data
        },
        setfication(state, data) {
            state.fication = data
        }
    },
    //这个是发请求的
    actions: {
        // 商品列表
        async getgoods({ commit }, { query, pagenum, pagesize }) {
            try {
                let res = await api.getgoods({ query, pagenum, pagesize })
                console.log(res, "商品列表")
                commit("setgoods", res.data.goods)
                commit("settotal", res.data.total)
            } catch (err) { }
        },
        // 商品分类
        async getcategories({ commit }, { type, pagenum, pagesize }) {
            try {
                let res = await api.getcategories({ type, pagenum, pagesize })
                console.log(res.data.result, "商品分类")
                if (res.meta.status === 200) {
                    res.data.result.map(item => {
                        if (item.cat_level === 0) {
                            Vue.set(item, "cat_level", "一级")
                            if (item.children) {
                                item.children.map(item1 => {
                                    if (item1.cat_level === 1) {
                                        Vue.set(item1, "cat_level", "二级")
                                        if(item1.children){
                                            item1.children.map(item2 => {
                                                if(item2.)
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
                commit("setfication", res.data.result)
            } catch (err) {
                console.log(err)
            }
        }
    },
}

