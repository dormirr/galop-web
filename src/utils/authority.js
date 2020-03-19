import { reloadAuthorized } from './Authorized';

// 使用 localStorage 存储权限信息，该权限信息可能是从实际项目中的服务器发送的。
export function getAuthority(str) {
  // authorityString 可以是 老师, "老师", ["老师"]
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('authority') : str;

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['老师'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;

  // 自动加载
  localStorage.setItem('authority', JSON.stringify(proAuthority));

  reloadAuthorized();
}
