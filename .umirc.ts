import { defineConfig } from 'umi';

export default defineConfig({
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
            { path: '/course/list', component: './CourseList' },
            { path: '/course/add', component: './CourseList/Details' },
            { path: '/course/edit/:id', component: './CourseList/Details' },
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
