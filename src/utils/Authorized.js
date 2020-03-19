import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */

// 重新加载权限组件
let Authorized = RenderAuthorize(getAuthority());

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
