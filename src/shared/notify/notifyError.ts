import { Notify } from 'quasar';

export const notifyError = (error: any) => {
  let msgError = null

  switch (error.response.status) {
    case 0: msgError = 'error.server.not.reachable'; break;
    case 400: msgError = error.response.data; break;
    case 403: msgError = error.response.data; break;
    case 404: msgError = 'error.http.404 (Not Found)'; break;
    case 500: msgError = 'error.http.500 (Internal Server Error)'; break;
    default: msgError = error.response.data;
  }

  Notify.create({
    type: 'negative',
    message: formatJson(msgError),
  });
};

const formatJson = (json: any) => {
  json = JSON.stringify(json, undefined, 2);
  json = json.replace(/\[|\]/g, ' ');
  json = json.replace(/\{|\}/g, ' ');
  json = json.replace(/\"|\"/g, '');
  return json;
}
