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

export default {
  '/api/courseList': getCourseList,
};
