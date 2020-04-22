import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findMatchResult } from '@/services/matchResult'

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
      title: '比赛时间',
      dataIndex: ['matchInfoByMatchInfoId', 'startTime'],
      align: 'center',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '团队 ID',
      dataIndex: ['teamByTeamId', 'id'],
      align: 'center',
      copyable: true,
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '团队名称',
      dataIndex: ['teamByTeamId', 'teamName'],
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '比赛名次',
      dataIndex: 'ranking',
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="比赛结果"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        search={false}
        rowKey="id"
        request={(params) => findMatchResult(params)}
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
