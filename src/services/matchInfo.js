import request from '@/utils/request';

/**
 * 创建比赛
 */
export async function saveMatchInfo(params) {
  return request.post('/api/match-info/save-match-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: params,
  });
}

/**
 * 查询比赛
 */
export async function findMatchInfo(params) {
  return request.get('/api/match-info/find-match-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}
/**
 * 查询正在进行的比赛
 */
export async function ongoingMatchInfo() {
  return request.get('/api/match-info/ongoing-match-info', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
}