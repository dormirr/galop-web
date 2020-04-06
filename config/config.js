import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: false,
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: false,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/login',
          component: '../layouts/UserLayout',
          routes: [
            {
              name: '登录',
              icon: 'CloudOutlined',
              path: '/login',
              component: './login',
            },
            {
              name: '找回密码',
              icon: 'CloudOutlined',
              path: '/login/forget',
              component: './forget',
            },
            {
              name: '找回密码结果',
              icon: 'CloudOutlined',
              path: '/login/forget-result',
              component: './forgetResult',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['老师', '学生'],
          routes: [
            {
              path: '/user',
              name: '用户',
              icon: 'UserOutlined',
              authority: ['老师', '学生'],
              routes: [
                {
                  name: '工作台',
                  icon: 'RadarChartOutlined',
                  path: '/user/workplace',
                  component: './user/workplace',
                  authority: ['学生'],
                },
                {
                  name: '工作台',
                  icon: 'RadarChartOutlined',
                  path: '/user/monitor',
                  component: './user/monitor',
                  authority: ['老师'],
                },
                {
                  name: '个人设置',
                  icon: 'SettingOutlined',
                  path: '/user/settings',
                  component: './user/settings',
                  authority: ['老师', '学生'],
                },
                {
                  name: '浏览用户',
                  icon: 'EyeOutlined',
                  path: '/user/find-user',
                  component: './user/findUser',
                  authority: ['老师'],
                },
                {
                  name: '注册',
                  icon: 'UsergroupAddOutlined',
                  path: '/user/register',
                  component: './user/register',
                  authority: ['老师'],
                },
                {
                  name: '注销',
                  icon: 'UsergroupDeleteOutlined',
                  path: '/user/remove',
                  component: './user/remove',
                  authority: ['老师'],
                },
                {
                  component: '404',
                },
              ],
            },
            {
              path: '/team',
              name: '团队',
              icon: 'TeamOutlined',
              authority: ['学生'],
              routes: [
                {
                  name: '创建团队',
                  icon: 'PlusOutlined',
                  path: '/team/save-team',
                  component: './team/saveTeam',
                  authority: ['学生'],
                },
                {
                  name: '浏览团队',
                  icon: 'EyeOutlined',
                  path: '/team/find-team',
                  component: './team/findTeam',
                  authority: ['学生'],
                },
                {
                  name: '我的团队',
                  icon: 'GitlabOutlined',
                  path: '/team/find-my-team',
                  component: './team/findMyTeam',
                  authority: ['学生'],
                },
                {
                  name: '申请管理',
                  icon: 'AppstoreAddOutlined',
                  path: '/team/apply-team',
                  component: './team/applyTeam',
                  authority: ['学生'],
                },
                {
                  name: '修改团队',
                  icon: 'EditOutlined',
                  path: '/team/save-my-team',
                  component: './team/saveMyTeam',
                  authority: ['学生'],
                  hideInMenu: true,
                },
                {
                  name: '查看团队',
                  icon: 'EyeOutlined',
                  path: '/team/read-team',
                  component: './team/readTeam',
                  authority: ['学生'],
                  hideInMenu: true,
                },
                {
                  component: '404',
                },
              ],
            },
            {
              path: '/match',
              name: '比赛',
              icon: 'RightSquareOutlined',
              authority: ['老师', '学生'],
              routes: [
                {
                  name: '创建比赛',
                  icon: 'SendOutlined',
                  path: '/match/save-match',
                  component: './match/saveMatch',
                  authority: ['老师'],
                },
                {
                  name: '浏览比赛',
                  icon: 'SearchOutlined',
                  path: '/match/find-match',
                  component: './match/findMatch',
                  authority: ['学生', '老师'],
                },
                {
                  name: '录入比赛结果',
                  icon: 'LoginOutlined',
                  path: '/match/save-match-result',
                  component: './match/saveMatchResult',
                  authority: ['老师'],
                },
                {
                  component: '404',
                },
              ],
            },
            {
              path: '/registration',
              name: '报名',
              icon: 'StarOutlined',
              authority: ['老师', '学生'],
              routes: [
                {
                  name: '比赛报名',
                  icon: 'BulbOutlined',
                  path: '/registration/apply-match',
                  component: './registration/applyMatch',
                  authority: ['学生'],
                },
                {
                  name: '报名审核',
                  icon: 'CheckCircleOutlined',
                  path: '/registration/find-registration',
                  component: './registration/findRegistration',
                  authority: ['老师'],
                },
                {
                  name: '导出报名表',
                  icon: 'VerticalAlignBottomOutlined',
                  path: '/registration/download-registration',
                  component: './registration/downloadRegistration',
                  authority: ['老师'],
                },
                {
                  component: '404',
                },
              ],
            },
            {
              path: '/fighting-capacity',
              name: '战斗力',
              icon: 'RiseOutlined',
              authority: ['学生'],
              routes: [
                {
                  name: '战斗力记录',
                  icon: 'RiseOutlined',
                  path: '/fighting-capacity/find-fighting-capacity',
                  component: './fightingCapacity/findFightingCapacity',
                  authority: ['学生'],
                },
                {
                  component: '404',
                },
              ],
            },
            {
              path: '/announcement',
              name: '公告',
              icon: 'BellOutlined',
              authority: ['老师', '学生'],
              routes: [
                {
                  name: '创建公告',
                  icon: 'FormOutlined',
                  path: '/announcement/save-announcement',
                  component: './announcement/saveAnnouncement',
                  authority: ['老师'],
                },
                {
                  name: '浏览公告',
                  icon: 'CopyOutlined',
                  path: '/announcement/find-announcement',
                  component: './announcement/findAnnouncement',
                  authority: ['老师', '学生'],
                },
                {
                  name: '修改公告',
                  icon: 'HighlightOutlined',
                  path: '/announcement/save-apply-announcement',
                  component: './announcement/saveApplyAnnouncement',
                  authority: ['老师'],
                  hideInMenu: true,
                },
                {
                  name: '查看公告',
                  icon: 'AlignLeftOutlined',
                  path: '/announcement/read-announcement',
                  component: './announcement/readAnnouncement',
                  authority: ['老师', '学生'],
                  hideInMenu: true,
                },
                {
                  component: '404',
                },
              ],
            },
            {
              name: 'result',
              icon: 'CheckCircleOutlined',
              path: '/result',
              hideInMenu: true,
              routes: [
                {
                  name: 'success',
                  icon: 'smile',
                  path: '/result/success',
                  component: './result/success',
                },
                {
                  name: 'fail',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              hideInMenu: true,
              routes: [
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
};
