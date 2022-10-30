import { Notify } from 'quasar';

export const notifyInfo = (message: string) => {
  Notify.create({
    type: 'info',
    message,
  });
};
