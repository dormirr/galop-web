import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { router } from 'umi';
import { login, logout } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    /**
     * 登录
     */
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // 登录成功
      if (response.status === 200) {
        message.success('登录成功！');
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        if(sessionStorage.getItem('authority')[2]==="老"){
          yield put(routerRedux.replace(redirect || '/user/monitor'));
        }else{
          yield put(routerRedux.replace(redirect || '/user/workplace'));
        }
        
      } else if (response.status === 401) {
        message.error('账号或密码错误！');
      }
    },

    /**
     * 退出登录
     */
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      yield put({
        type: 'deleteLoginToken',
        payload: response,
      });

      if (response.status === 204) {
        const { redirect } = getPageQuery();

        // 可能存在安全问题，请注意
        if (window.location.pathname !== '/login' && !redirect) {
          router.replace({
            pathname: '/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      }
    },
  },
  reducers: {
    /**
     * 保存登录 Token
     * 保存登录权限
     */
    changeLoginStatus(state, { payload }) {
      sessionStorage.removeItem('Authorization');
      sessionStorage.setItem('Authorization', payload.token);
      sessionStorage.removeItem('id');
      sessionStorage.setItem('id', payload.id);
      setAuthority(payload.authority);
      return { ...state, status: payload.status };
    },

    /**
     * 删除登录信息
     */
    deleteLoginToken(state, { payload }) {
      // 删除 Token
      sessionStorage.removeItem('Authorization');
      // 删除角色权限
      sessionStorage.removeItem('authority');
      // 删除用户 id
      sessionStorage.removeItem('id');
      return { ...state, status: payload.status };
    },
  },
};

export default Model;
