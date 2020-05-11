import { ErrorShowType } from 'umi';

type CourseList = {
  id: string;
  type: string;
  name: string;
  totalPrice: string;
  amount: string;
  address: string;
  remark?: string;
};

let courseList: CourseList[] = [
  {
    id: '1',
    type: 'React系',
    name: 'dva',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/382788?tuin=c9304a42',
  },
  {
    id: '2',
    type: 'React系',
    name: 'umi2',
    totalPrice: '¥58',
    amount: '999',
    address: 'https://ke.qq.com/course/470529?tuin=c9304a42',
  },
  {
    id: '3',
    type: 'React系',
    name: 'reacthooks',
    totalPrice: '¥38',
    amount: '999',
    address: 'https://ke.qq.com/course/464538?tuin=c9304a42',
  },
];

// 获取路径参数
function getUrlParam(url: string, key: string) {
  // 获取参数
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)'); // 匹配目标
  var result = url.split('?')[1].match(reg); // 返回参数值
  return result ? decodeURIComponent(result[2]) : '';
}

// 获取课程列表
const getCourseList = (req: { url: string }, res: any) => {
  let keywords = getUrlParam(req.url, 'keywords');
  let filterList =
    !keywords || keywords == ''
      ? courseList
      : courseList.filter((item: { type: string; name: string }) => {
          console.log(item.type);
          return (
            item.type.indexOf(keywords) !== -1 ||
            item.name.indexOf(keywords) !== -1
          );
        });
  res.send({
    success: true,
    datas: filterList,
    keywords: keywords,
  });
};

// 添加
const addCourse = (
  req: {
    body: CourseList;
  },
  res: any,
) => {
  let { type, name, totalPrice, amount, address } = req.body;
  courseList.unshift({
    id: Date.now().toString(),
    type: type,
    name: name,
    totalPrice: totalPrice,
    amount: amount,
    address: address,
  });
  res.send({ msg: '添加成功', success: true });
};

// 详情
const getDetails = (req: { url: string }, res: any) => {
  let id = getUrlParam(req.url, 'id');
  let index = courseList.findIndex((item: any) => item.id == id);
  if (index == -1) {
    res.send({ msg: '课程记录不存在', success: false });
    return;
  }
  res.send({ success: true, datas: courseList[index] });
};

// 编辑
const editCourse = (
  req: {
    body: CourseList;
  },
  res: any,
) => {
  let { id } = req.body;
  let index = courseList.findIndex((item: any) => item.id == id);
  if (index == -1) {
    res.send({ msg: '课程记录不存在', success: false });
    return;
  }
  courseList[index] = { ...req.body };
  res.send({ msg: '编辑成功', success: true });
};

export default {
  '/api/courseList': getCourseList,
  '/api/dictionary/type': {
    datas: [
      { label: 'React系', value: 'React入门到实战' },
      { label: 'Vue系', value: 'Vue入门到实战' },
      { label: 'Node系', value: 'Node入门到实战' },
      { label: 'uniapp系', value: 'uniapp入门到实战' },
    ],
  },
  'POST /api/course/add': addCourse,
  '/api/course/details': getDetails,
  'POST /api/course/edit': editCourse,
};
