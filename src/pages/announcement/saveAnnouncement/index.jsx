import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Input, Button, Card, Modal } from 'antd';
import { saveAnnouncement } from '@/services/announcement';

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
    title: '',
    content: '',
    visible: false,
  };

  componentWillUnmount() {
    this.isLivinig = false;
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = editorState => {
    this.setState({
      editorState,
      content: this.state.editorState.toRAW(),
    });
  };

  setTitle = title => {
    this.setState({
      title: title.target.value,
    });
  };

  onSubmit = () => {
    saveAnnouncement(this.state.title, this.state.content);
  };

  render() {
    const { editorState, title } = this.state;
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.showModal,
      },
    ];
    return (
      <PageHeaderWrapper content="创建公告">
        <div>
          <div className="editor-wrapper">
            <Card title="编辑器">
              <Input placeholder="请输入标题" onChange={this.setTitle} />

              <BraftEditor
                value={editorState}
                extendControls={extendControls}
                onChange={this.handleChange}
                onSave={this.handleChange}
              />

              <Button type="primary" onClick={this.onSubmit}>
                提交
              </Button>
            </Card>
            <Modal
              title={title}
              visible={this.state.visible}
              footer={null}
              onCancel={this.handleCancel}
              destroyOnClose
            >
              <div
                className="braft-output-content"
                dangerouslySetInnerHTML={{
                  __html: this.state.editorState.toHTML(),
                }}
              />
            </Modal>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}
