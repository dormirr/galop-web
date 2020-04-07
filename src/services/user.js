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

/**
 * 查询积分前十
 */
export async function findUserFightingCapacity() {
  return request.get('/api/role/find-user-fighting-capacity', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
}

/**
 * 查询用户
 */
export async function findUser(params) {
  return request.get('/api/role/find-user', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 重置用户密码
 */
export async function forgetUser(params) {
  return request.put('/api/role/forget-user', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      id: params,
    }
  }).then(response => {
    if (response.success) {
      message.success('重置成功！');
    } else {
      message.error(`失败！`);
    }
  });
}