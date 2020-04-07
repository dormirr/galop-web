import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findRegistrationInfo, saveApplyRegistrationInfo, deleteApplyRegistrationInfo } from '@/services/registrationInfo'

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
      title: '比赛 ID',
      dataIndex: ['matchInfoByMatchInfoId', 'id'],
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '比赛名称',
      dataIndex: ['matchInfoByMatchInfoId', 'matchName'],
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '团队 ID',
      dataIndex: ['teamByTeamId', 'id'],
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '团队名称',
      dataIndex: ['teamByTeamId','teamName'],
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '团队战斗力',
      dataIndex: ['teamByTeamId','teamFightingCapacity'],
      align: 'center',
      sorter: true,
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'registrationStatus',
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
              saveApplyRegistrationInfo(record.id);
              action.reload();
            }}>
            同意申请
          </Button>          
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteApplyRegistrationInfo(record.id);
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
        request={(params) => findRegistrationInfo(params)}
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
