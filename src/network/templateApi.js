import {get,post,deletes} from './axios'

//获取保存时时间
export function nowTime(){
    // 获取当前日期
    var date = new Date();
    // 获取当前月份
    var nowMonth = date.getMonth() + 1;
    // 获取当前是几号
    var strDate = date.getDate();
    // 获取当前小时
    var nowHour = date.getHours();
    // 获取当前分钟
    var nowMinutes = date.getMinutes();
    // 获取当前秒钟
    var nowSeconds = date.getSeconds();
    // 添加分隔符“-”
    var seperator = "-";
    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
    }
    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
    }
    // 对小时进行处理，0-9时在前面添加一个”0“
    if (nowTime>=0 && nowTime <=9){
        nowTime = "0"+nowTime;
    }
    // 对分钟进行处理，0-9分在前面添加一个”0“
    if (nowMinutes>=0 && nowMinutes <=9){
        nowMinutes = "0"+nowMinutes;
    }
    // 对秒钟进行处理，0-9秒在前面添加一个”0“
    if (nowSeconds>=0 && nowSeconds <=9){
        nowSeconds = "0"+nowSeconds;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd hh:mm:ss)的日期
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate + " "+ nowHour+":"+nowMinutes+":"+nowSeconds;
    return nowDate;
}

//获取所有模板信息
export const getAllTemplates=() => get('/showTemplates');

//删除模板
export const deleteTemplate=(id) => deletes('/deleteTemplate/'+id);

//获取指定id模板信息
export const getTemplateById=(id) => get('/getTemplate/'+id);

//获取最新模板信息
export const getLastTemplate=(date) => get('/getLastTemplate/'+date);

//保存模板，p：参数
export const saveTemplateById= p => post('/updateTemplate',p);

//下载模板
export const downloadTemplate= p => post('/word',p);

//新建模板
export const newTemplate= (p) => post('/insertTemplate',p);

//获取自增id
export const autoId=() => post('/autoIdByTemplate');