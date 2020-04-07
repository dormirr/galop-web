import { Avatar } from 'antd';
import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findOneTeam } from '@/services/team'

const TableList = (props) => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const teamId = props.location.state.teamId;
  const columns = [
    {
      title: '头像',
      dataIndex: ['userByUserId', 'userPortrait'],
      align: 'center',
      hideInSearch: true,
      render: (text, record, index, action) => (
        <>
          <Avatar size="large" src={record.userByUserId.userPortrait} />
        </>
      ),
    },
    {
      title: '学号',
      dataIndex: ['userByUserId', 'userNumber'],
      align: 'center',
      copyable: true,
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: ['userByUserId', 'userName'],
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '战斗力',
      dataIndex: ['userByUserId', 'userFightingCapacity'],
      align: 'center',
      sorter: true,
      valueType: 'digit',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="成员列表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        search={false}
        rowKey="id"
        request={(params) => findOneTeam(params, teamId)}
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
