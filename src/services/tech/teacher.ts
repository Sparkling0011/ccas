import { request } from '@umijs/max';

export async function getTeacherList(
  params: {
    pageIndex?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.TeacherItem>('/teacher/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const uploadTeacherInfo = async (
  body: API.UploadInfoType,
  options?: Record<string, any>,
) => {
  return request('/cstc/import/teacher', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
};

export const downloadTeacherInfo = async (options?: Record<string, any>) => {
  return request('/cstc/export/class', {
    method: 'POST',
    ...(options || {}),
  });
};

export async function deleteTeacherItem(tecId: string, options?: Record<string, any>) {
  return request(`/teacher/remove/${tecId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
