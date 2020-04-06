import { forgetPassword } from '@/services/forget';
import { message } from 'antd';
import { router } from 'umi';

const Model = {
  namespace: 'forget',
  state: {
    status: undefined,
  },
  effects: {
    *forgetPassword({ payload }, { call, put }) {
      const response = yield call(forgetPassword, payload);

      if (response.status === 201) {
        message.success('重置密码邮件发送成功！');
        router.push({
          pathname: '/login/forget-result',
        });
      }

      if (response.status === 400) {
        message.error('重置密码邮件发送失败！请联系管理员重置密码！');
      }


      yield put({
        type: 'forgetPasswordRe',
        payload: response,
      });
    },

    
  },
  reducers: {
    forgetPasswordRe(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
