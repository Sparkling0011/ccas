import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import TableList from '@/components/TableList';
import {
  getTeacherList,
  deleteTeacherItem,
  uploadTeacherInfo as upload,
  downloadTeacherInfo as download,
} from '@/services/tech';
import { message, Space } from 'antd';

const StudentTableList: React.FC = () => {
  const ref = useRef<ActionType>();

  const columns: ProColumns<API.TeacherItem>[] = [
    {
      title: '教师ID',
      dataIndex: 'tecId',
      tip: '教师的id唯一',
      valueType: 'text',
    },
    {
      title: '教师姓名',
      dataIndex: 'tecName',
      valueType: 'text',
    },
    {
      title: '教师性别',
      dataIndex: 'tecGender',
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
      title: '教师出生日期',
      sorter: true,
      dataIndex: 'tecBirth',
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, entity) => (
        <Space size="middle">
          <a
            onClick={async () => {
              const { code } = await deleteTeacherItem(entity.tecId);
              if (code === 200) {
                message.success('删除成功');
                ref.current?.reload();
              } else {
                message.error('删除失败');
              }
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <TableList
      ref={ref}
      type="教师"
      request={getTeacherList}
      actions={{ upload, download }}
      columns={columns}
    />
  );
};
export default StudentTableList;
