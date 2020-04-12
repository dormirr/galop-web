import { Avatar } from 'antd';
import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findUser, forgetUser } from '@/services/user'

const TableList = () => {
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
    </PageHeaderWrapper>
  );
};

export default TableList;
