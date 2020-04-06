import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findMatchInfo} from '@/services/matchInfo'

const TableList = () => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '比赛 ID',
      dataIndex: 'id',
      align: 'center',
      copyable: true,
      sorter: true,
    },
    {
      title: '比赛名',
      dataIndex: 'matchName',
      align: 'center',      
      ellipsis: true,
    },
    {
      title: '报名开始时间',
      dataIndex: 'createTime',
      align: 'center',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '比赛开始时间',
      dataIndex: 'startTime',
      align: 'center',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '比赛结束时间',
      dataIndex: 'endTime',
      align: 'center',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '要求团队规模',
      dataIndex: 'teamSize',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '第一奖励',
      dataIndex: 'championAward',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '递减梯度',
      dataIndex: 'decrementParameter',
      align: 'center',
      hideInSearch: true,
    },    
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="比赛列表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey="id"
        request={(params) => findMatchInfo(params)}
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
