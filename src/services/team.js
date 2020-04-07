import request from '@/utils/request';
import { message } from 'antd';

/**
 * 创建团队
 */
export async function saveTeam(params) {
  return request.post('/api/team/save-team', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: params,
  });
}

/**
 * 查询团队
 */
export async function findTeam(params) {
  return request.get('/api/team/find-team', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 加入团队
 */
export async function applyTeam(params) {
  return request.post('/api/team/apply-team', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      id: params,
    },
  }).then(response => {
    if (response.success) {
      message.success('成功发送申请！');
    } else {
      message.error(`失败！原因是你已发送过申请或你已在队伍中！`);
    }
  });
}

/**
 * 查询所有申请
 */
export async function findApplyTeam(params) {
  return request.get('/api/team/find-apply-team', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 同意申请
 */
export async function saveApplyTeam(params) {
  return request.put('/api/team/save-apply-team', {
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
export async function deleteApplyTeam(params) {
  return request.put('/api/team/delete-apply-team', {
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
 * 查询我的团队
 */
export async function findMyTeam(params) {
  return request.get('/api/team/find-my-team', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 修改团队信息
 */
export async function saveMyTeam(params) {
  return request.put('/api/team/save-my-team', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      teamProfile: params.values.teamProfile,
      teamName: params.values.teamName,
      teamId: params.teamId,
    }
  });
}

/**
 * 查询一个团队的成员
 */
export async function findOneTeam(params, teamId) {
  return request.get('/api/team/find-one-team', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params: {
      teamId: teamId,
      current: params.current,
      pageSize: params.pageSize,
      sorter: params.sorter,
    },
  });
}