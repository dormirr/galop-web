import { Form, Button, Input, Popover, Progress } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { useState } from 'react';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  ),
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
      return promise.reject(
        formatMessage({
          id: 'userandregister.password.twice',
        }),
      );
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject(
        formatMessage({
          id: 'userandregister.password.required',
        }),
      );
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
                    <FormattedMessage id="userandregister.strength.msg" />
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
              label={formatMessage({
                id: '密码',
              })}
              rules={[
                {
                  required: true,
                  validator: checkPassword,
                },
              ]}
            >
              <Input
                type="password"
                placeholder={formatMessage({
                  id: 'userandregister.password.placeholder',
                })}
              />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            label={formatMessage({
              id: '确认密码',
            })}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'userandregister.confirm-password.required',
                }),
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input
              type="password"
              placeholder={formatMessage({
                id: 'userandregister.confirm-password.placeholder',
              })}
            />
          </FormItem>
          <FormItem>
            <Button loading={submitting} type="primary" htmlType="submit">
              <FormattedMessage id="修改密码" />
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
