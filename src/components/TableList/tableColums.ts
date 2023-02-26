import type { ProColumns } from '@ant-design/pro-components';

const teacherColumns: ProColumns<API.TeacherItem>[] = [
  {
    title: '教师ID',
    dataIndex: 'tecId',
    tip: '教师的id唯一',
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
  },
];

const StudentColumns: ProColumns<API.TeacherItem>[] = [
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
];
const CourseColumns: ProColumns<API.TeacherItem>[] = [
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
];
const ClassColumns: ProColumns<API.TeacherItem>[] = [
  {
    title: '班级ID',
    dataIndex: 'tecId',
    tip: '班级的ID唯一',
  },
  {
    title: '课程ID',
    dataIndex: 'coID',
    valueType: 'text',
  },
];

export { teacherColumns, StudentColumns, CourseColumns, ClassColumns };
