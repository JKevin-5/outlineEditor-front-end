import {get,post,deletes} from './axios'

//获取该用户的通知消息
export const getMessages=(recevier) =>get('/getMessages/'+recevier);

//新建信息
export const sendMessage= p => post('/newMessage',p);

//时间差计算
export function timeSub(dateString){
    // 获取当前日期
    var date = new Date();
    
    // 获取当前是几号
    var strDate = date.getDate();
    // 获取当前小时
    var nowHour = date.getHours();
    // 获取当前分钟
    var nowMinutes = date.getMinutes();
    // 获取当前秒钟
    var nowSeconds = date.getSeconds();

    var date1 = dateString.split(' ');

    var day = date1[0].split('-')[2];

    var hour = date1[1].split(':')[0];

    var minute = date1[1].split(':')[1];

    var second = date1[1].split(':')[2];

    var days = strDate-day;
 
    var hours = nowHour-hour;

    var minutes = nowMinutes-minute;

    var seconds = nowSeconds-second;

    var sub ="";

    if(days>0){
        sub = sub+days+"天前";
    }
    if(hours>0){
        sub=sub+hours+"小时前";
    }
    if(minutes>0){
        sub=sub+minutes+"分钟前";
    }
    return sub;
}