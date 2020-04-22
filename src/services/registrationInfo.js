import request from '@/utils/request';
import { message } from 'antd';

/**
 * 加入比赛
 */
export async function saveRegistrationInfo(params) {
  return request.post('/api/registration-info/save-registration-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: params,
  });
}

/**
 * 查询所有申请
 */
export async function findRegistrationInfo(params) {
  return request.get('/api/registration-info/find-registration-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 同意申请
 */
export async function saveApplyRegistrationInfo(params) {
  return request.put('/api/registration-info/save-registration-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      id: params,
    },
  }).then(response => {
    if (response.success) {
      message.success('已通过！');
    } else {
      message.error(`失败！原因是该申请已通过或已拒绝！`);
    }
  });
}

/**
 * 拒绝申请
 */
export async function deleteApplyRegistrationInfo(params) {
  return request.put('/api/registration-info/delete-registration-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      id: params,
    },
  }).then(response => {
    if (response.success) {
      message.success('已拒绝！');
    } else {
      message.error(`失败！原因是该申请已通过或已拒绝！`);
    }
  });
}

/**
 * 导出报名表
 */
export async function downloadRegistrationInfo(params) {
  return request.post('/api/registration-info/download-registration-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: params,
  });
}

/**
 * 查询我的申请
 */
export async function findMyRegistrationInfo(params) {
  return request.get('/api/registration-info/find-my-registration-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}
