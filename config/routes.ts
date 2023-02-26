export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  {
    name: '教学管理',
    icon: 'table',
    path: '/teach',
    routes: [
      { path: '/teach', redirect: './/student' },
      { path: '/teach/student', name: '学生管理', component: './Teach/Student' },
      { path: '/teach/teacher', name: '教师管理', component: './Teach/Teacher' },
      { path: '/teach/course', name: '课程管理', component: './Teach/Course' },
      { path: '/teach/class', name: '班级管理', component: './Teach/Class' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '/file', name: '文件管理', icon: 'file', component: './File' },
  { path: '*', layout: false, component: './404' },
];
