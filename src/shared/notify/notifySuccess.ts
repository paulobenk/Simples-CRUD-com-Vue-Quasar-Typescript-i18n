import { Notify } from 'quasar';

export const notifySuccess = (message: string) => {
  Notify.create({
    type: 'positive',
    message,
  });
};
