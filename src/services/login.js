import request from '@/utils/request';

// 登录
export async function login(params) {
  return request.post('/api/auth/login', {
    data: params,
  });
}

// 退出登录
export async function logout() {
  return request.delete('/api/auth/logout', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
}
