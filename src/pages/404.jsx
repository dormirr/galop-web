import { Button, Result } from 'antd';
import React from 'react';
import { router } from 'umi';

const NoFoundPage = () => (
  <Result
    status={404}
    title="404"
    subTitle="抱歉，您访问的页面不存在。"
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
