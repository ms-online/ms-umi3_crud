import { defineConfig } from 'umi';

export default defineConfig({
  title: '米修在线',
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/',
          redirect: '/course',
        },
        {
          path: '/course',
          // component: './CourseList'
          routes: [
            { path: '/course', redirect: '/course/list' },
            {
              path: '/course/list',
              component: './CourseList',
              title: '课程列表',
            },
            {
              path: '/course/add',
              component: './CourseList/Details',
              title: '添加课程',
            },
            {
              path: '/course/edit/:id',
              component: './CourseList/Details',
              title: '编辑课程',
            },
          ],
        },
        { path: '/course', component: './CourseList' },
        { path: '/about', component: './About' },
      ],
    },
  ],
  sass: {
    implementation: require('node-sass'),
  },
  cssModulesTypescriptLoader: {},
});
