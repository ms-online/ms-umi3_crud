import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, message } from 'antd';
import { getTypeList, add } from '@/services/courseApi';
import { history } from 'umi';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 8 },
};

const Details = () => {
  const [typeList, setTypeList] = useState([]);
  const { Option } = Select;

  // 加载完成执行
  useEffect(() => {
    getTypeDatas();
  }, []);

  const getTypeDatas = () => {
    getTypeList().then((res: any) => {
      if (res && res.datas) {
        setTypeList(res.datas);
      }
    });
  };

  // 表单校验成功
  const onFinish = (values: object) => {
    add(values).then((res: any) => {
      if (res && res.success) {
        message.success(res.msg);
        history.push('/course/list');
        return;
      }
      message.error(res ? res.msg : '添加失败');
    });
  };

  return (
    <div>
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item
          label="课程类别"
          name="type"
          rules={[{ required: true, message: '请选择课程类别' }]}
        >
          <Select>
            {typeList.map((item: { value: string; label: string }, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="课程名字"
          name="name"
          rules={[{ required: true, message: '请选择课程名字' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程总价"
          name="totalPrice"
          rules={[{ required: true, message: '请选择课程总价' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程数量"
          name="amount"
          rules={[{ required: true, message: '请选择课程数量' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程地址"
          name="address"
          rules={[{ required: true, message: '请选择课程地址' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Details;
