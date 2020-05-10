import {get,post,deletes} from './axios'

//获取所有文档信息
export const getAllDocuments=() => get('/getDocuments');

//删除文档
export const deleteDocument=(id) => deletes('/deleteDocument/'+id);

//获取指定id文档
export const getDocumentById=(id) => get('/getDocument/'+id);

//保存文档
export const saveDocumentById= (p) => post('/updateDocument',p);

//新建文档
export const newDocument=(p) => post('/insertDocument',p);

//获取自增id
export const autoId=() => post('/autoIdByDocument'); 
