import {get,post} from './axios'

//获取所有课程信息
export const getCourses = () => get('/getCourses');

//获取指定name课程
export const getCourseByName=(courseName)=> get('/getCourse/'+courseName);