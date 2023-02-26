import { request } from '@umijs/max';

export async function getStudentList(
  params: {
    pageIndex?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request('/student/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export const uploadStudentInfo = async (
  body: API.UploadInfoType,
  options?: Record<string, any>,
) => {
  return request('/cstc/import/student', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
};

export const downloadStudentInfo = async (options?: Record<string, any>) => {
  return request('/cstc/export/class', {
    method: 'POST',
    ...(options || {}),
  });
};

export async function deleteStudentItem(stuId: string, options?: Record<string, any>) {
  return request(`/student/remove/${stuId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
