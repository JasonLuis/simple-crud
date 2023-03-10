export enum ResponseTypesEnum {
  SUCCESS = 'Success',
  ERROR = 'Error'
}

interface Details {
  config?: {} | undefined;
  data?: string | undefined;
  headers?: {} | undefined;
  request?: {} | undefined;
  status?: number | undefined;
  statusText?: string | undefined;
}
export interface ControllerResponse<T> {
  type: ResponseTypesEnum;
  data?: T;
  message?: string;
  details?: Details | undefined;
  httpCode?: number | undefined;
}
