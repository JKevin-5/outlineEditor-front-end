import {get,post,deletes} from './axios'

//获取所有用户
export const getUsers=() => get('/showUsers');

//获取用户
export const getUser=(id) => get('/getUser/'+id);

//确认用户信息
export const comfirmUserInfo= p => post('/confirm',p);

//删除用户
export const delUser=(id) => deletes('/deleteUser/'+id);

//新建用户
export const adduser= p => post('/insertUser',p);

//更改用户密码
export const changePassword= p => post('/updatePassWord',p);

//更改用户信息
export const changeUserInfo= p => post('/updateUserInfo',p);