import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './BaseView.less'; // 上传文件改变时的状态

const onChange = info => {
  if (info.file.status === 'done') {
    message.success(`头像上传成功！稍后会自动刷新！`); // eslint-disable-next-line no-restricted-globals

    location.reload(false);
  } else if (info.file.status === 'error') {
    message.error(`头像上传失败！`);
  }
};

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload
      accept=".jpg,.png"
      action="http://localhost:8080/role/updatePortrait"
      method="put"
      headers={{
        Authorization: sessionStorage.getItem('Authorization'),
      }}
      showUploadList={false}
      onChange={onChange}
    >
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

class BaseView extends Component {
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.userPortrait) {
        return currentUser.userPortrait;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleFinish = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/updateCurrentUser',
      payload: { ...values },
    });
  };

  render() {
    const { currentUser, submitting } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="userEmail"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入您的邮箱！',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userName"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: '请输入您的姓名！',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={submitting}>
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  submitting: loading.effects['user/updateCurrentUser'],
}))(BaseView);
