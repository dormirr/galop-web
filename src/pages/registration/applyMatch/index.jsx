import { Button, Card, Input, Form, Tooltip } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const FormItem = Form.Item;

const SaveRegistrationInfo = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'registrationInfo/saveRegistrationInfo',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageHeaderWrapper content="比赛报名">
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          scrollToFirstError
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            {...formItemLayout}
            label={
              <Tooltip title="如果不知道 ID 请到比赛列表中查询" arrowPointAtCenter>
                比赛 ID
              </Tooltip>
            }
            name="matchId"
            rules={[
              {
                required: true,
                message: '请输入比赛 ID',
              },
            ]}
          >
            <Input placeholder="请输入比赛 ID" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <Tooltip title="如果不知道 ID 请到我的团队中查询" arrowPointAtCenter>
                团队 ID
              </Tooltip>
            }
            name="teamId"
            rules={[
              {
                required: true,
                message: '请输入团队 ID',
              },
            ]}
          >
            <Input placeholder="请输入团队 ID" />
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['registrationInfo/saveRegistrationInfo'],
}))(SaveRegistrationInfo);
