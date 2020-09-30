import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from 'dayjs'
import Vue from 'vue'
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
            } catch (err) {
                console.log(err)
            }
        },
        // 商品分类
        async getcategories({ commit }, { type, pagenum, pagesize }) {
            try {
                let res = await api.getcategories({ type, pagenum, pagesize })
                console.log(res, "商品分类")
                if (res.meta.status === 200) {
                    res.data.result.map(item => {
                        if (item.cat_level === 0) {
                            Vue.set(item, "cat_level", "一级")
                            if (item.children) {
                                item.children.map(item1 => {
                                    if (item1.cat_level === 1) {
                                        Vue.set(item1, "cat_level", "二级")
                                        if (item1.children) {
                                            item1.children.map(item2 => {
                                                if (item2.cat_level === 2) {
                                                    Vue.set(item2, "cat_level", "三级")
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
                commit("setfication", res.data.result)
                commit("settotal", res.data.total)
            } catch (err) {
                console.log(err)
            }
        },
        // 删除商品
        async goodsiddd({ dispatch }, { id, pagenum, pagesize, query }) {
            try {
                let res = await api.goodsiddd(id)
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    dispatch("getgoods", { pagenum, pagesize, query })
                }
            } catch (err) {
                console.log(err)
            }
        },
        //删除商品分类
        async getcategoriesfa({ dispatch }, { id, pagenum, pagesize, type }) {
            try {
                let res = await api.getcategoriesfa(id)
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg);
                    dispatch("getcategories", {
                        pagenum, pagesize, type
                    })
                }
            } catch (err) {
                console.log(err)
            }
        },
        //编辑提交分类
        async getcategoriespo({ dispatch }, { id, cat_name, pagenum, pagesize, type }) {
            try {
                let res = await api.getcategoriespo({ id, cat_name })
                dispatch("getcategories", {
                    pagenum, pagesize, type
                })
            } catch (err) {
                console.log(err)
            }
        },
        // 提交商品
        async getgoodspppp({ dispatch }, { goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight ,
            type, pagenum, pagesize}) {
            try {
               if()
            } catch (err) {
                console.log(err)
            }
        }
    },
}

