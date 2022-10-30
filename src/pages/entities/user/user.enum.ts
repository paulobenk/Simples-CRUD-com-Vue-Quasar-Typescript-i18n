export enum UserRouteName {
  LIST = 'userList',
  CREATE = 'userCreate',
  UPDATE = 'userUpdate',
  DETAIL = 'userDetail',
}

export enum UserRoutePath {
  LIST = '/users',
  CREATE = 'create',
  UPDATE = 'update/:id',
  DETAIL = 'detail/:id',
}
