import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Upload, message } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const FormItem = Form.Item;

const BasicForm = () => {
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
  }; // 上传文件改变时的状态

  const onChange = info => {
    if (info.file.status === 'done') {
      message.success(`文件上传成功！共添加${info.file.response.suc}个账号！`);
    } else if (info.file.status === 'error') {
      message.error(
        `文件上传失败！共添加${info.file.response.suc}个账号，失败${info.file.response.err}个账号！`,
      );
    }
  };

  return (
    <PageHeaderWrapper content="通过 Excel 批量导入用户账号。">
      <Card bordered={false}>
        <Form
          style={{
            marginTop: 8,
          }}
          form={form}
          name="register"
        >
          <FormItem {...formItemLayout} label="Excel 模板" name="excel">
            <Button icon={<DownloadOutlined />} href="https://localhost:8080/file/添加用户模板.xlsx">
              点击下载
            </Button>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="上传 Excel"
            help="注意：下载模板填写时请不要改动格式，否则可能上传失败！"
            name="registerExcel"
          >
            <div>
              <Upload
                accept=".xlsx,.xls"
                action="https://localhost:8080/role/register"
                headers={{
                  Authorization: sessionStorage.getItem('Authorization'),
                }}
                listType="picture"
                multiple
                onChange={onChange}
              >
                <Button>
                  <UploadOutlined /> 上传
                </Button>
              </Upload>
            </div>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(BasicForm);
