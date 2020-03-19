import { GithubOutlined, CodeOutlined } from '@ant-design/icons';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>学科竞赛训练管理系统</span>
              </Link>
            </div>
            <div className={styles.desc}>
              学科竞赛训练管理系统是内蒙古工业大学最具影响力的竞赛管理系统
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 学科竞赛训练管理系统"
          links={[
            {
              key: '前端代码',
              title: <CodeOutlined />,
              href: 'https://github.com/dormirr/galop-web',
              blankTarget: true,
            },
            {
              key: '我的 GitHub',
              title: <GithubOutlined />,
              href: 'https://github.com/dormirr',
              blankTarget: true,
            },
            {
              key: '后端代码',
              title: <CodeOutlined />,
              href: 'https://github.com/dormirr/galop-server',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
