import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findMyRegistrationInfo } from '@/services/registrationInfo'

const TableList = () => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '比赛 ID',
      dataIndex: ['matchInfoByMatchInfoId', 'id'],
      align: 'center',
      copyable: true,
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '比赛名',
      dataIndex: ['matchInfoByMatchInfoId', 'matchName'],
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '比赛类型',
      dataIndex: ['matchInfoByMatchInfoId', 'matchType'],
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '报名开始时间',
      dataIndex: ['matchInfoByMatchInfoId', 'createTime'],
      align: 'center',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '比赛开始时间',
      dataIndex: ['matchInfoByMatchInfoId', 'startTime'],
      align: 'center',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '比赛结束时间',
      dataIndex: ['matchInfoByMatchInfoId', 'endTime'],
      align: 'center',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '要求团队规模',
      dataIndex: ['matchInfoByMatchInfoId', 'teamSize'],
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '第一奖励',
      dataIndex: ['matchInfoByMatchInfoId', 'championAward'],
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '递减梯度',
      dataIndex: ['matchInfoByMatchInfoId', 'decrementParameter'],
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '报名审核状态',
      dataIndex: 'registrationStatus',
      align: 'center',
      ellipsis: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="参赛列表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey="id"
        request={(params) => findMyRegistrationInfo(params)}
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
