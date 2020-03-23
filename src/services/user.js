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

/**
 * 更新当前用户信息
 */
export async function updateCurrentUser(params) {
  return request.put('/api/role/updateNameAndEmail', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: params,
  });
}

/**
 * 修改密码
 */
export async function updatePassword(params) {
  return request.put('/api/role/updatePassword', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
