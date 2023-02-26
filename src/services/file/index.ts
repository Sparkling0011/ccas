import { request } from '@umijs/max';

export const getFileRoot = async (options?: Record<string, any>) => {
  return request('/search/root', {
    method: 'GET',
    ...(options || {}),
  });
};

interface preuploadType {
  sha256?: string;
  parentId: number;
  fileName: string;
  fileSize?: number;
}
export const preupload = async (body: preuploadType, options?: Record<string, any>) => {
  return request('/file-store/pre-upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

interface directUploadType {
  uuid?: string;
  sha256?: string;
  sha256Part?: string;
  sharding: boolean;
  index?: number;
  file?: string;
}

export const directUpload = async (body: directUploadType, options?: Record<string, any>) => {
  return request('/file-store/direct', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
};

interface fragmentUploadType {
  uuid: string;
  sha256: string;
  sha256Part: string;
  sharding: boolean;
  index: number;
  file: Blob;
}

export const fragmentUpload = async (body: fragmentUploadType, options?: Record<string, any>) => {
  return request('/file-store/sharding', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
};

interface mergeFragmentType {
  uuid?: string;
}

export const mergeFragment = async (body: mergeFragmentType, options?: Record<string, any>) => {
  return request('/file-store/merge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};
