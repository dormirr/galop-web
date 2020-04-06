import { Button, Card, DatePicker, Input, Form, InputNumber, Tooltip, Radio } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const SaveMatch = props => {
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
      type: 'matchInfo/saveMatch',
      payload: values,
    });
  };

  return (
    <LocaleProvider locale={zh_CN}>
      <PageHeaderWrapper content="创建比赛">
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
          >
            <FormItem
              {...formItemLayout}
              label="比赛类型"
              name="matchType"
              rules={[
                {
                  required: true,
                  message: '请选择比赛类型',
                },
              ]}
            >
              <Radio.Group>
                <Radio value="训练赛">训练赛</Radio>
                <Radio value="正式赛">正式赛</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="比赛标题"
              name="matchName"
              rules={[
                {
                  required: true,
                  message: '请输入比赛标题',
                },
              ]}
            >
              <Input placeholder="给比赛起个名字" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="比赛起止时间"
              name="date"
              rules={[
                {
                  required: true,
                  message: '请选择比赛起止日期',
                },
              ]}
            >
              <RangePicker
                style={{
                  width: '100%',
                }}
                placeholder={['开始日期', '结束日期']}
                showTime
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>要求团队人数</span>}
              name="teamSize"
              rules={[
                {
                  required: true,
                  message: '请输入团队人数',
                },
              ]}
            >
              <InputNumber
                placeholder="请输入"
                min={1}
                max={50}
                formatter={value => `${value}人`}
                parser={value => value.replace('人', '')}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>冠军所得奖励</span>}
              name="championAward"
              rules={[
                {
                  required: true,
                  message: '请输入冠军所得奖励',
                },
              ]}
            >
              <InputNumber
                placeholder="请输入"
                min={1}
                max={5000}
                formatter={value => `${value}分`}
                parser={value => value.replace('分', '')}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <Tooltip
                  title="每个人所得奖励计算公式为：冠军所得奖励 -（名次 * 递减梯度）"
                  arrowPointAtCenter
                >
                  <span>递减梯度</span>
                </Tooltip>
              }
              name="decrementParameter"
              rules={[
                {
                  required: true,
                  message: '请输入递减梯度',
                },
              ]}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={1000}
                formatter={value => `${value}分`}
                parser={value => value.replace('分', '')}
              />
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
    </LocaleProvider>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['matchInfo/saveMatch'],
}))(SaveMatch);
