import { Form, Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;

const Register = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    dispatch({
      type: 'forget/forgetPassword',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <Form form={form} name="UserForget" onFinish={onFinish}>
        <FormItem
          name="userNumber"
          rules={[
            {
              required: true,
              message: '请输入学号/工号',
            },
          ]}
        >
          <Input size="large" placeholder="学号/工号" />
        </FormItem>
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            发送重置密码邮件
          </Button>
          <Link className={styles.login} to="/login">
            使用已有账户登录
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};

export default connect(({ status, loading }) => ({
  status,
  submitting: loading.effects['forget/forgetPassword'],
}))(Register);
