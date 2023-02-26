import React from 'react';
import { ProForm, ProFormUploadDragger } from '@ant-design/pro-components';

interface uploadProps {
  title?: string;
  uploadActions?: (body: API.UploadInfoType, options?: Record<string, any>) => any;
  onSubmit: (value: { file: File }) => any;
}

const Upload: React.FC<uploadProps> = ({ title, onSubmit }) => {
  const handleUpload = async (formData: any) => {
    onSubmit({ file: formData.file[0].originFileObj });
  };
  return (
    <ProForm onFinish={handleUpload}>
      <ProFormUploadDragger max={4} label={title} name="file" />
    </ProForm>
  );
};

export default Upload;
