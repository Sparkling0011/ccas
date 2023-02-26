import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import TableList from '@/components/TableList';
import {
  deleteCourseItem,
  getCourseList,
  uploadCourseInfo as upload,
  downloadCourseInfo as download,
} from '@/services/tech';
import { message, Space } from 'antd';
const StudentTableList: React.FC = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<API.CourseItem>[] = [
    {
      title: '课程ID',
      dataIndex: 'courseId',
      valueType: 'text',
      tip: '教师的名称唯一',
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      valueType: 'text',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, entity) => (
        <Space size="middle">
          <a
            onClick={async () => {
              const { code } = await deleteCourseItem(entity.courseId);
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
      type="课程"
      request={getCourseList}
      actions={{ upload, download }}
      columns={columns}
    />
  );
};
export default StudentTableList;
