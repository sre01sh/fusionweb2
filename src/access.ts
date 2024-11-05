import {Role} from './services/roles';
import {API} from "@/services/typings";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const {currentUser} = initialState ?? {};
  return {
    // canAdmin: currentUser && currentUser.access === 'admin', wdc|wgc|sfc|wga
    canAdmin: currentUser && currentUser.roles && currentUser.roles.some((x) => x.includes(Role.Admin)),
    canMaterialHandler:
      currentUser &&
      currentUser.roles &&
      currentUser.roles.some((x) => x.includes(Role.MaterialHandler) || x.includes(Role.Admin)),
    canStockKeeper:
      currentUser &&
      currentUser.roles &&
      currentUser.roles.some((x) => x.includes(Role.StockKeeper) || x.includes(Role.Admin)),
    canMaterialHandlerAndLineLeader:
      currentUser &&
      currentUser.roles &&
      currentUser.roles.some((x) => x.includes(Role.MaterialHandler) || x.includes(Role.LineLeader) || x.includes(Role.Admin)),
    canWhKeeper:
      currentUser &&
      currentUser.roles &&
      currentUser.roles.some((x) => x.includes(Role.WGC) || x.includes(Role.WDC) || x.includes(Role.WGA) || x.includes(Role.Admin)),
    canSfcKeeper:
      currentUser &&
      currentUser.roles &&
      currentUser.roles.some((x) => x.includes(Role.SFC) || x.includes(Role.Admin)),
  };
}
