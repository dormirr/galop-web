import { message } from 'antd';
import { saveTeam, findTeam,saveMyTeam } from '@/services/team';

const Model = {
  namespace: 'team',
  state: {
    pagination: {},
  },
  effects: {
    /**
     * 创建队伍
     */
    *saveTeam({ payload }, { call }) {
      yield call(saveTeam, payload);
      message.success('队伍创建成功！');
    },

    /**
     * 查询队伍
     */
    *findTeam(_, { call, put }) {
      const response = yield call(findTeam);
      yield put({
        type: 'findTeamRe',
        payload: Array.isArray(response.list) ? response.list : [],
      });
    },

        /**
     * 修改团队
     */
    *saveMyTeam({ payload }, { call }) {      
      yield call(saveMyTeam, payload);
      message.success('修改团队成功！');
    },
  },
  /**
   * 查询队伍
   */
  reducers: {
    findTeamRe(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
