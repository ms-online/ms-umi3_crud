import axios from 'axios';

// 检查请求状态
function checkStatus(response: { status: number; data: object }): object {
  if (response.status >= 200 && response.status < 300) {
    return { ...response.data };
  } else {
    return { msg: `请求出现错误${response.status}` };
  }
}

// 获取课程列表
export const getList = (params: object) => {
  return axios.get('/api/courseList', { params }).then(checkStatus);
};

// 获取课程类型列表
export const getTypeList = () => {
  return axios.get('/api/dictionary/type').then(checkStatus);
};

// 添加课程
export const add = (params: object) => {
  return axios.post('/api/course/add', params).then(checkStatus);
};
