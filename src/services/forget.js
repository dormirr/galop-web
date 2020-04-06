import request from '@/utils/request';

// 登录
export async function forgetPassword(params) {
  return request.post('/api/role/forget', {
    data: params,
  });
}
