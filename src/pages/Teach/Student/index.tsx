import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import TableList from '@/components/TableList';
import {
  getStudentList,
  deleteStudentItem,
  uploadStudentInfo as upload,
  downloadStudentInfo as download,
} from '@/services/tech';
import { message, Space } from 'antd';

const StudentTableList: React.FC = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<API.StudentItem>[] = [
    {
      title: '学生ID',
      dataIndex: 'stuId',
      tip: '学生的id唯一',
    },
    {
      title: '学生姓名',
      dataIndex: 'stuName',
      valueType: 'text',
    },
    {
      title: '学生性别',
      dataIndex: 'stuGender',
      valueEnum: {
        0: {
          text: '男',
          status: '',
        },
        1: {
          text: '女',
        },
      },
    },
    {
      title: '学生出生日期',
      sorter: true,
      dataIndex: 'stuBirth',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, entity) => (
        <Space size="middle">
          <a
            onClick={async () => {
              const { code } = await deleteStudentItem(entity.stuId);
              if (code === 200) {
                message.success('删除成功');
                ref.current?.reload();
              } else {
                message.error('删除失败');
              }
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <TableList
      ref={ref}
      type="学生"
      request={getStudentList}
      actions={{ upload, download }}
      columns={columns}
    />
  );
};
export default StudentTableList;
