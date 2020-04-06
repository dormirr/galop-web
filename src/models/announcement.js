import { message } from 'antd';
import { saveAnnouncement } from '@/services/announcement';

const Model = {
  namespace: 'announcement',
  state: {},
  effects: {
    *saveAnnouncement({ payload }, { call }) {
      yield call(saveAnnouncement, payload);
      message.success('公告创建成功');
    },
  },
};

export default Model;
