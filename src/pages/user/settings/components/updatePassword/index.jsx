import { Form, Button, Input, Popover, Progress } from 'antd';
import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = ({ submitting, dispatch }) => {
  const [visible, setvisible] = useState(false);
  const [popover, setpopover] = useState(false);
  const confirmDirty = false;
  const [form] = Form.useForm();

  const getPasswordStatus = () => {
    const value = form.getFieldValue('userPassword');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const onFinish = values => {
    dispatch({
      type: 'user/submitPassword',
      payload: { ...values },
    });
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('userPassword')) {
      return promise.reject('两次输入的密码不匹配!');
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject('请输入密码！');
    } // 有值的情况

    if (!visible) {
      setvisible(!!value);
    }

    setpopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('userPassword');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          form={form}
          name="UserRegister"
          onFinish={onFinish}
          hideRequiredMark
        >
          <Popover
            getPopupContainer={node => {
              if (node && node.parentNode) {
                return node.parentNode;
              }

              return node;
            }}
            content={
              visible && (
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              )
            }
            overlayStyle={{
              width: 240,
            }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="userPassword"
              className={
                form.getFieldValue('userPassword') &&
                form.getFieldValue('userPassword').length > 0 &&
                styles.password
              }
              label="密码"
              rules={[
                {
                  required: true,
                  validator: checkPassword,
                },
              ]}
            >
              <Input type="password" placeholder="至少6位密码，区分大小写" />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            label="确认密码"
            rules={[
              {
                required: true,
                message: '请确认密码！',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input type="password" placeholder="确认密码" />
          </FormItem>
          <FormItem>
            <Button loading={submitting} type="primary" htmlType="submit">
              修改密码
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ user, loading }) => ({
  user,
  submitting: loading.effects['user/submitPassword'],
}))(Register);
