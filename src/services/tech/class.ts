import { request } from '@umijs/max';

export async function getClassList(
  params: {
    pageIndex?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request('/class/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export const uploadClassInfo = async (body: API.UploadInfoType, options?: Record<string, any>) => {
  return request('/cstc/import/class', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
};

export const downloadClassInfo = async (options?: Record<string, any>) => {
  return request('/cstc/export/class', {
    method: 'POST',
    ...(options || {}),
  });
};

export async function deleteClassItem(
  params: {
    classId: string;
  },
  options?: Record<string, any>,
) {
  return request('/class/remove', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
