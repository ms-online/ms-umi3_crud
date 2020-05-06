import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import { getList } from '@/services/courseApi';

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
    },
    {
      title: '操作',
      key: 'action',
      render: (record: { id: string }) => (
        <>
          <a>编辑</a>
          <a>删除</a>
        </>
      ),
    },
  ];
  return (
    <div>
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
