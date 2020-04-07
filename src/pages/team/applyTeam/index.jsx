import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findApplyTeam, saveApplyTeam, deleteApplyTeam } from '@/services/team'

const TableList = () => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '申请时间',
      dataIndex: 'createTime',
      align: 'center',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,      
    },
    {
      title: '申请人学号',
      dataIndex: ['userByUserId','userNumber'],
      align: 'center',
      hideInSearch: true,    
    },
    {
      title: '申请人',
      dataIndex: ['userByUserId','userName'],
      align: 'center',
      ellipsis: true,
      hideInSearch: true,    
    },
    {
      title: '申请团队 ID',
      dataIndex: 'teamId',
      align: 'center',
      valueType: 'digit',
    },
    {
      title: '申请团队名称',
      dataIndex: 'teamName',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '个人战斗力',
      dataIndex: ['userByUserId','userFightingCapacity'],
      align: 'center',
      sorter: true,
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '申请状态',
      dataIndex: 'teamState',
      align: 'center',
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
              saveApplyTeam(record.id);
              action.reload();
            }}>
            同意申请
          </Button>          
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteApplyTeam(record.id);
              action.reload();
            }}>
            拒绝申请
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="申请列表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey="id"
        request={(params) => findApplyTeam(params)}
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
