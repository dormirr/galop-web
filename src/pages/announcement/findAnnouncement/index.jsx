import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findAnnouncement, deleteApplyAnnouncement } from '@/services/announcement'
import { Button } from 'antd';
import Link from 'umi/link';

const TableList = () => {
  const actionRef = useRef();
  const [sorter, setSorter] = useState('');
  const columns = [
    {
      title: '公告标题',
      dataIndex: 'announcementTitle',
      align: 'center',
      ellipsis: true,
      render: (text, record, index, action) => (
        <>
          <Link to={{
            pathname: 'read-announcement',
            state: { id: record.id },
          }}>
            <Button
              type="link"
            >
              {record.announcementTitle}
            </Button>
          </Link>
        </>
      ),
    },
    {
      title: '公告发布时间',
      dataIndex: 'createTime',
      align: 'center',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '公告修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (text, record, index, action) => (
        <>
          <Link to={{
            pathname: 'save-apply-announcement',
            state: { id: record.id },
          }}>
            <Button
              type="primary"
            >
              修改公告
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteApplyAnnouncement(record.id);
              action.reload();
            }}>
            删除公告
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="公告列表"
        columns={columns}
        bordered
        actionRef={actionRef}
        pagination={{
          hideOnSinglePage: true,
        }}
        rowKey="id"
        request={(params) => findAnnouncement(params)}
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
