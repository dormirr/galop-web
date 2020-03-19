import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */

let Authorized = RenderAuthorize(getAuthority());

// 重新加载权限组件
const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};

/**
 * hard code
 * block need it。
 */
window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };
export default Authorized;
