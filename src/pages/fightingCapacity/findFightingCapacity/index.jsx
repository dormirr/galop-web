import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findFightingCapacity } from '@/services/fightingCapacity'

const TableList = () => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '变化时间',
      dataIndex: 'createTime',
      align: 'center',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '比赛 ID',
      dataIndex: ['matchInfoByMatchInfoId','id'],
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '比赛名称',
      dataIndex: ['matchInfoByMatchInfoId','matchName'],
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '奖励',
      dataIndex: 'reward',
      align: 'center',
      valueType: 'digit',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="战斗力变化表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        search={false}
        rowKey="id"
        request={(params) => findFightingCapacity(params)}
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
