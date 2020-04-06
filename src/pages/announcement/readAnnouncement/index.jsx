import React, { Component } from 'react';
import BraftEditor from 'braft-editor'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import { findOneAnnouncement } from '@/services/announcement';
import 'braft-editor/dist/output.css'
import router from 'umi/router';

export default class ReadAnnouncement extends Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
    title: '',
    loading: true,
  }

  componentDidMount() {
    const id = {
      id: this.props.location.state.id,
    }
    const response = Promise.resolve(findOneAnnouncement(id));

    response.then(result => {
      this.setState({
        title: result.announcementDto.announcementTitle,
        editorState: BraftEditor.createEditorState(result.announcementDto.announcementContent),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.isLivinig = false
  }

  render() {
    const { editorState, title, loading } = this.state;
    return (
      <PageHeaderWrapper>
        <Card
          title={title}
          loading={loading}
          bordered={false}>
          <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: editorState.toHTML() }} />
          <Button type="block" onClick={() => router.goBack()}>返回</Button>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
