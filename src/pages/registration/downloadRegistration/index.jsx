import { Button, Card, Input, Form } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const FormItem = Form.Item;

const BasicForm = props => {
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
      type: 'registrationInfo/downloadRegistrationInfo',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageHeaderWrapper content="输入比赛 ID 导出报名表。">
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            {...formItemLayout}
            label="比赛 ID"
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
  submitting: loading.effects['team/saveTeam'],
}))(BasicForm);
