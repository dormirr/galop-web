import { Avatar } from 'antd';
import React, { useRef, useState } from 'react';
import { Button, Card, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findUser, forgetUser } from '@/services/user'
import { connect } from 'dva';

const FormItem = Form.Item;

const TableList = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '头像',
      dataIndex: 'userPortrait',
      align: 'center',
      hideInSearch: true,
      render: (text, record, index, action) => (
        <>
          <Avatar size="large" src={record.userPortrait} />
        </>
      ),
    },
    {
      title: '学号/工号',
      dataIndex: 'userNumber',
      align: 'center',
      valueType: 'digit',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '战斗力',
      dataIndex: 'userFightingCapacity',
      align: 'center',
      sorter: true,
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (text, record, index, action) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              forgetUser(record.userNumber);
            }}>
            重置密码
        </Button>
        </>
      ),
    },
  ];

  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'user/downloadRole',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageHeaderWrapper>      
      <ProTable
        headerTitle="用户列表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey="id"
        request={(params) => findUser(params)}
        onChange={(_, _filter, sorter) => {
          const sorterResult = sorter;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
      />
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              导出战斗力排名
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['user/downloadRole'],
}))(TableList);
