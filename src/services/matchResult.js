import request from '@/utils/request';

/**
 * 查询比赛
 */
export async function findMatchResult(params) {
  return request.get('/api/match-result/find-match-result', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}