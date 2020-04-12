import { Button, Result } from 'antd';
import { Link } from 'umi';
import React from 'react';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/login">
      <Button size="large">返回登录</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={<div className={styles.title}>密码重置邮件已发送！</div>}
    subTitle="重置密码邮件已发送到你的邮箱中，5分钟内有效。请及时登录邮箱查看。"
    extra={actions}
  />
);

export default RegisterResult;
