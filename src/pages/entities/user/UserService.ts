import { api } from 'boot/axios';
import { IUser } from 'src/shared/model';
import { notifyError } from 'src/shared/notify';

const baseApiUrl = 'users/';

export class UserService {
  async getAll(): Promise<IUser[]> {
    return new Promise<IUser[]>(resolve => {
      api
        .get<IUser[]>(baseApiUrl)
        .then(res => resolve(res.data))
        .catch(err => notifyError(err));
    });
  }

  async getById(id: string): Promise<IUser> {
    return new Promise<IUser>(resolve => {
      api
        .get<IUser>(`${baseApiUrl}${id}/`)
        .then(res => resolve(res.data))
        .catch(err => notifyError(err));
    });
  }

  async create(entity: IUser): Promise<IUser> {
    return new Promise<IUser>(resolve => {
      api
        .post<IUser>(baseApiUrl, entity)
        .then(res => resolve(res.data))
        .catch(err => notifyError(err));
    });
  }

  async update(entity: IUser): Promise<IUser> {
    return new Promise<IUser>(resolve => {
      api
        .put<IUser>(`${baseApiUrl}${entity.id}/`, entity)
        .then(res => resolve(res.data))
        .catch(err => notifyError(err));
    });
  }

  async delete(id: string): Promise<string> {
    return new Promise<string>(resolve => {
      api
        .delete<string>(`${baseApiUrl}${id}/`)
        .then(res => resolve(res.data))
        .catch(err => notifyError(err));
    });
  }
}
