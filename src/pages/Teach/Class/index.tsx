import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import TableList from '@/components/TableList';
import { deleteCourseItem, getClassList } from '@/services/tech';
import { uploadClassInfo as upload, downloadClassInfo as download } from '@/services/tech';
import { message, Space } from 'antd';

const StudentTableList: React.FC = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<API.ClassItem>[] = [
    {
      title: '班级ID',
      dataIndex: 'classId',
      tip: '班级的ID唯一',
    },
    {
      title: '课程ID',
      dataIndex: 'coId',
      valueType: 'text',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, entity) => (
        <Space size="middle">
          <a
            onClick={async () => {
              const { code } = await deleteCourseItem(entity.classId);
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
      type="班级"
      request={getClassList}
      actions={{ upload, download }}
      columns={columns}
    />
  );
};
export default StudentTableList;
