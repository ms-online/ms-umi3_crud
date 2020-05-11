import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, message } from 'antd';
import { getTypeList, add, getDetails, edit } from '@/services/courseApi';
import { history, useParams } from 'umi';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 8 },
};

const { Option } = Select;

const Details = () => {
  const [typeList, setTypeList] = useState([]);
  const { id } = useParams();
  const [form] = Form.useForm();

  // 加载完成执行
  useEffect(() => {
    getTypeDatas();
    id && init(id);
  }, []);

  const getTypeDatas = () => {
    getTypeList().then((res: any) => {
      if (res && res.datas) {
        setTypeList(res.datas);
      }
    });
  };

  // 初始化课程记录数据
  const init = (id: string) => {
    getDetails({ id }).then((res: any) => {
      if (res && res.success && res.datas) {
        form.setFieldsValue({ ...res.datas });
      }
    });
  };

  // 表单校验成功
  const onFinish = (values: object) => {
    id
      ? edit({ id, ...values }).then((res: any) => {
          if (res && res.success) {
            message.success(res.msg);
            history.push('/course/list');
            return;
          }
          message.error(res ? res.msg : '编辑失败');
        })
      : add(values).then((res: any) => {
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
      <Form {...layout} name="basic" onFinish={onFinish} form={form}>
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
