import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findTeam, applyTeam } from '@/services/team'

const TableList = () => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '团队 ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true,
      copyable: true,
      valueType: 'digit',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      sorter: true,      
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '团队名称',
      dataIndex: 'teamName',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '团队简介',
      dataIndex: 'teamProfile',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '团队战斗力',
      dataIndex: 'teamFightingCapacity',
      align: 'center',
      sorter: true,
      valueType: 'digit',
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
              applyTeam(record.id);
            }}>
            加入团队
        </Button>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="团队列表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey="id"
        request={(params) => findTeam(params)}
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
