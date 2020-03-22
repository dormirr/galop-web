import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

/**
 * 获取当前用户信息
 */
export async function queryCurrentUser() {
  return request.get('/api/auth/info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
