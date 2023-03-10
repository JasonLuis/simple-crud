import { CallError } from '../types/ErrorType';

export class HttpHelper {
  static isDataNotFoundError(err: CallError): boolean {
    if (
      err.code === '404' ||
      err.message.includes('404') ||
      err.message.includes('Not found')
    ) {
      return true;
    }

    return false;
  }

  static isBadRequestError(err: CallError): boolean {
    if (err.code === '400' || err.message.includes('400')) {
      return true;
    }

    return false;
  }
}
