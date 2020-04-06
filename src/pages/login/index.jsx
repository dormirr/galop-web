import { Alert, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import LoginFrom from './components/Login';
import Link from 'umi/link';

const { UserName, Password, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { login = {}, submitting } = props;
  const { status } = login;

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom onSubmit={handleSubmit}>
        {status === 'error' && !submitting && (
          <LoginMessage content="账户或密码错误" />
        )}

        <UserName
          name="username"
          placeholder="用户名: 20060000363 or 201620205052"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />

        <Password
          name="password"
          placeholder="密码: 123456"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Submit loading={submitting}>登录</Submit>
        <Link to={{
          pathname: 'login/forget',
        }}>
          <Button size="large" block>重置密码</Button>
        </Link>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))(Login);
