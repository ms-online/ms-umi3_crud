import React, { useState, useEffect } from 'react';
import { Table, Input, Button, message } from 'antd';
import { getList, remove } from '@/services/courseApi';
import { history, Link } from 'umi';

const index = () => {
  const [datas, setDatas] = useState([]);
  const [keywords, setKeyWords] = useState('');
  const { Search } = Input;

  useEffect(() => {
    getDatas({ keywords });
  });

  // 获取课程列表
  const getDatas = (params: object) => {
    getList(params).then((res: any) => {
      if (res && res.datas) {
        setDatas(res.datas);
      }
    });
  };

  // 搜索
  const handleSearch = (keywords: string) => {
    setKeyWords(keywords);
    getDatas({ keywords });
  };

  // 删除
  const handleRemove = (id: string) => {
    remove({ id }).then((res: any) => {
      if (res && res.success) {
        message.success(res.msg);
        getDatas({ keywords });
        return;
      }
      message.warning(res ? res.msg : '删除异常');
    });
  };

  let columns = [
    {
      title: '课程类别',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '课程名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '课程总价',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
    },
    {
      title: '课程数量',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: '课程地址',
      key: 'address',
      dataIndex: 'address',
      render: (text: string) => (
        <>
          <a target="blank" href={text}>
            查看课程
          </a>
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: { id: string }) => (
        <>
          <Link to={`/course/edit/${record.id}`}>编辑</Link>
          <a onClick={() => handleRemove(record.id)}>删除</a>
        </>
      ),
    },
  ];

  // 跳转至添加课程页面
  const handleAdd = () => {
    history.push('/course/add');
  };
  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        添加课程
      </Button>
      <Search
        placeholder="搜索课程"
        style={{ width: 200 }}
        onSearch={handleSearch}
      />
      <Table columns={columns} dataSource={datas} />
    </div>
  );
};

export default index;
