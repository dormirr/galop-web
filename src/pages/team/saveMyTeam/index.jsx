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
    const { dispatch, location } = props;
    dispatch({
      type: 'team/saveMyTeam',
      payload: {
        values,
        teamId: location.state.id,
      },
    });
  };

  return (
    <PageHeaderWrapper content="修改团队信息">
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          onFinish={onFinish}
        >
          <FormItem
            {...formItemLayout}
            label="团队名称"
            name="teamName"
            rules={[
              {
                required: false,
                message: '请输入新的团队名称',
              },
            ]}
          >
            <Input placeholder="给队伍起个新的名字" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="团队简介（选填）"
            name="teamProfile"
            rules={[
              {
                required: false,
                message: '请输入新的团队简介',
              },
            ]}
          >
            <Input placeholder="介绍一下团队吧" />
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
  submitting: loading.effects['team/saveMyTeam'],
}))(BasicForm);
