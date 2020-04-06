import request from '@/utils/request';
import { message } from 'antd';

/**
 * 创建公告
 */
export async function saveAnnouncement(title, content) {
  return request.post('/api/announcement/save-announcement', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      announcementTitle: title,
      announcementContent: content,
    }
  }).then(response => {
    if (response.success) {
      message.success('公告创建成功！');
    } else {
      message.error(`公告创建失败！`);
    }
  });
}

/**
 * 查询公告
 */
export async function findAnnouncement(params) {
  return request.get('/api/announcement/find-announcement', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 查询单条公告
 */
export async function findOneAnnouncement(params) {
  return request.get('/api/announcement/find-one-announcement', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}

/**
 * 删除公告
 */
export async function deleteApplyAnnouncement(params) {
  return request.delete('/api/announcement/delete-announcement', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      id: params,
    },
  }).then(response => {
    if (response.success) {
      message.success('删除成功！');
    } else {
      message.error(`删除失败！！`);
    }
  });
}

/**
 * 修改公告
 */
export async function saveApplyAnnouncement(id, title, content) {
  return request.put('/api/announcement/save-apply-announcement', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    data: {
      id: id,
      announcementTitle: title,
      announcementContent: content,
    },
  }).then(response => {
    if (response.success) {
      message.success('修改成功！');
    } else {
      message.error(`修改失败！！`);
    }
  });
}

/**
 * 获取前十条公告
 */
export async function findTenAnnouncement(params) {
  return request.get('/api/announcement/find-ten-announcement', {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
    params,
  });
}