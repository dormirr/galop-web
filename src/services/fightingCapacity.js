import request from '@/utils/request';

/**
 * 查询战斗力记录
 */
export async function findFightingCapacity(params) {
  return request.get('/api/fighting-capacity/find-fighting-capacity', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 查询战斗力变化
 */
export async function changeFightingCapacity() {
  return request.get('/api/fighting-capacity/change-fighting-capacity', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
}

/**
 * 查询报名人数变化
 */
export async function changeMatch() {
  return request.get('/api/fighting-capacity/change-match', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
}
