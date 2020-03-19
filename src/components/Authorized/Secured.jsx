import React from 'react';
import CheckPermissions from './CheckPermissions';

/**
 * 默认不能访问任何页面
 * default is "NULL"
 */
const Exception403 = () => 403;

export const isComponentClass = component => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};

// 确定传入组件是否已实例化
// AuthorizedRoute 已经实例化
// 授权的渲染已经实例化，子级没有实例化
// 未实例化安全
const checkIsInstantiation = target => {
  if (isComponentClass(target)) {
    const Target = target;
    return props => <Target {...props} />;
  }

  if (React.isValidElement(target)) {
    return props => React.cloneElement(target, props);
  }

  return () => target;
};

/**
 * 用于判断是否拥有权限访问此 view 权限
 * authority 支持传入 string, () => boolean | Promise
 * e.g. 'user' 只有 user 用户能访问
 * e.g. 'user,admin' user 和 admin 都能访问
 * e.g. ()=>boolean 返回 true 能访问,返回 false 不能访问
 * e.g. Promise then 能访问 catch 不能访问
 *
 * @param {string | function | Promise} authority
 * @param {ReactNode} error 非必需参数
 */
const authorize = (authority, error) => {
  /**
   * 转换成 class
   * 防止传入字符串时找不到 staticContext 造成报错
   */
  let classError = false;

  if (error) {
    classError = () => error;
  }

  if (!authority) {
    throw new Error('authority is required');
  }

  return function decideAuthority(target) {
    const component = CheckPermissions(authority, target, classError || Exception403);
    return checkIsInstantiation(component);
  };
};

export default authorize;
