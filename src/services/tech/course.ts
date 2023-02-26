import { request } from '@umijs/max';

export async function getCourseList(
  params: {
    pageIndex?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request('/course/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export const uploadCourseInfo = async (body: API.UploadInfoType, options?: Record<string, any>) => {
  return request('/cstc/import/course', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
};

export const downloadCourseInfo = async (options?: Record<string, any>) => {
  return request('/cstc/export/class', {
    method: 'POST',
    ...(options || {}),
  });
};

export async function deleteCourseItem(courseId: string, options?: Record<string, any>) {
  return request(`/course/remove/${courseId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
