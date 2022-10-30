import { UserRouteName, UserRoutePath } from './user.enum';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { name: UserRouteName.LIST, path: UserRoutePath.LIST, component: () => import('./UserList.vue'), },
  { name: UserRouteName.CREATE, path: UserRoutePath.CREATE, component: () => import('./UserUpdate.vue') },
  { name: UserRouteName.UPDATE, path: UserRoutePath.UPDATE, component: () => import('./UserUpdate.vue') },
  { name: UserRouteName.DETAIL, path: UserRoutePath.DETAIL, component: () => import('./UserDetail.vue') },
];

export default routes;
