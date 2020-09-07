import service from './index'

export default {
  //登录
  login({ username, password }) {
    return service.post('/login', {
      username,
      password
    })
  },
  //侧部路由
  getMenus() {
    return service.get('/menus')
  },
  //用户数据列表
  getusers({ pagenum, pagesize, query }) {
    return service.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
  },
  //添加用户
  getuserlist({ username,password,email,mobile }) {
    return service.post(`/users`, {
      username,
      password,
      email,
      mobile
    })
  },
  //删除用户
  deleteuser(id) {
    return service.delete(`users/${id}`)
  },
  //修改用户状态
  getetusers({uId,type}){
    return service.put(`users/${uId}/state/${type}`)
  },
  //编辑用户
  getuserser({id,email,mobile}){
    return service.put(`users/${id}`,{email,mobile})
  },
  // 搜索用户
  getusersjkl(id){
     return service.get(`/users/${id}`)
  },
  //分配用户角色
  getusersolp({id,rid}){
    return service.put(`users/${id}/role`,{rid})
  },
  //角色列表
  getroles() {
    return service.get("roles");
},
//添加角色列表
  getrolesw({roleName,roleDesc}){
    return service.post(`/roles`,{
      roleName,roleDesc
    })
  },
//编辑提交角色
 getrolesr({id,roleName,roleDesc}){
   return service.put(`roles/${id}`,{roleName,roleDesc})
 },
 //删除角色
 getrolesid(id){
   return service.delete(`roles/${id}`)
 },
 //统计图表
 getreports(){
  return service.get(`/reports/type/1`)
 },
//  获取权限列表
 getrights(type){
   return service.get(`rights/${type}`)
 }
}