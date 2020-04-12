import { message } from 'antd';
import { saveRegistrationInfo, downloadRegistrationInfo } from '@/services/registrationInfo';

const Model = {
  namespace: 'registrationInfo',
  state: {},
  effects: {
    /**
     * 比赛报名
     */
    *saveRegistrationInfo({ payload }, { call }) {
      const response = yield call(saveRegistrationInfo, payload);
      console.log(response);

      if (response.success) {
        message.success('成功发送申请！');
      } else {
        message.error(`失败！原因是你已有待审批或通过的申请或团队人数不符或你不是队长或比赛ID与团队ID不存在！`);
      }
    },

    /**
     * 导出报名表
     */
    *downloadRegistrationInfo({ payload }, { call }) {
      const response = yield call(downloadRegistrationInfo, payload);
      if (response.success) {
        message.success('报名表导出成功！');
        window.location.href = `https://localhost:8080/file/${response.download}`;
      } else {
        message.error(`失败！原因是无人报名或比赛ID不存在！`);
      }
    },
  },
  reducers: {},
};

export default Model;
