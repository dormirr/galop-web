import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import LoginFrom from './components/Login';

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
  const [autoLogin, setAutoLogin] = useState(true);

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
          <LoginMessage content="账户或密码错误（admin/ant.design）" />
        )}

        <UserName
          name="username"
          placeholder="用户名: admin or 201620205052"
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

        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))(Login);
