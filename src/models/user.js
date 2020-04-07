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
    *updateCurrentUser({ payload }, { call,put }) {
      const response = yield call(updateCurrentUser, payload);
      yield put({
        type: 'fetchCurrentUser',
      });

      // 更新成功
      if (response.status === 201) {
        message.success('更新信息成功！');
      }
    },

    /**
     * 获取当前用户
     */
    *fetchCurrentUser(_, { call, put }) {
      const response = yield call(queryCurrentUser);
      yield put({
        type: 'fetchCurrentUserRe',
        payload: response,
      });
    },

    /**
     * 修改密码
     */
    *submitPassword({ payload }, { call }) {
      const response = yield call(updatePassword, payload);

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
    fetchCurrentUserRe(state, action) {
      return { ...state, currentUser: action.payload };
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
