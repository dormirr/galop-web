import { message } from 'antd';
import { queryCurrentUser, updateCurrentUser, updatePassword } from '@/services/user';
import { router } from 'umi';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    status: 404,
  },
  effects: {
    /**
     * 更新当前用户信息
     */
    *updateCurrentUser({ payload }, { call }) {
      const response = yield call(updateCurrentUser, payload);

      // 更新成功
      if (response.status === 201) {
        message.success('更新信息成功！稍后会自动刷新！');
        // eslint-disable-next-line no-restricted-globals
        location.reload(false);
      }
    },

    /**
     * 获取当前用户
     */
    *fetchCurrentUser(_, { call, put }) {
      const response = yield call(queryCurrentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    /**
     * 修改密码
     */
    *submitPassword({ payload }, { call, put }) {
      const response = yield call(updatePassword, payload);
      yield put({
        type: 'updateHandle',
        payload: response,
      });

      if (response.status === 201) {
        message.success('修改密码成功！请重新登录！');
        // 删除 Token
        sessionStorage.removeItem('Authorization');
        // 删除角色权限
        sessionStorage.removeItem('authority');
        router.push('/login');
      }
    },
  },
  reducers: {
    /**
     * 保存当前用户
     */
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload };
    },

    /**
     * 返回修改密码结果
     */
    updateHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
