import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findFightingCapacity } from '@/services/fightingCapacity'

const TableList = () => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '变动 ID',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '变化时间',
      dataIndex: 'createTime',
      align: 'center',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '比赛 ID',
      dataIndex: ['matchInfoByMatchInfoId','id'],
      align: 'center',
    },
    {
      title: '比赛名称',
      dataIndex: ['matchInfoByMatchInfoId','matchName'],
      align: 'center',
    },
    {
      title: '奖励',
      dataIndex: 'reward',
      align: 'center',
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
