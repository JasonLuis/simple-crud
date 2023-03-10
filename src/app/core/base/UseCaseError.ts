import { ErrorCodeEnumType } from '@/shared/enums/ErrorCodeEnum';

export interface ResponseError {
  detail?: string;
  status?: number;
  title?: string;
  traceId?: string;
}
interface IUseCaseError {
  code?: ErrorCodeEnumType;
  message: string;
  details?: string | ResponseError;
  httpCode?: number;
}

export abstract class UseCaseError implements IUseCaseError {
  public readonly message: string;
  public readonly details: string | ResponseError;
  public readonly httpCode: number;
  // public readonly response: any;
  public readonly error: any;
  public readonly code: ErrorCodeEnumType | undefined;

  constructor(
    message: string,
    details: string | ResponseError,
    httpCode: number,
    code?: ErrorCodeEnumType
  ) {
    this.message = message;
    this.details = details;
    this.httpCode = httpCode;

    if (code) {
      this.code = code;
    }
  }
}
