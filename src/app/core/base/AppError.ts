/* eslint-disable no-console */
import { Result } from './Result';
import { UseCaseError } from './UseCaseError';
import { ErrorCodeEnum } from '@/shared/enums/ErrorCodeEnum';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.UnexpectedError,
        message: 'Some error happenned.',
        details: err?.response?.data,
        httpCode: err?.status,
        error: err
      } as UseCaseError);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
  export class TimeoutError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.Timeout,
        message: 'timeout',
        details: err?.message,
        httpCode: 502,
        error: err
      } as UseCaseError);
    }

    public static create(err: any): TimeoutError {
      return new TimeoutError(err);
    }
  }

  export class DataNotFound extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.DataNotFound,
        message: 'Data not found',
        httpCode: 404,
        error: err,
        details: err?.response?.data
      } as UseCaseError);
    }

    public static create(err: any): DataNotFound {
      return new DataNotFound(err);
    }
  }

  export class AccessDeniedError extends Result<UseCaseError> {
    public constructor() {
      super(false, {
        code: ErrorCodeEnum.AccessDenied,
        message: 'Access Denied'
      } as UseCaseError);
    }

    public static create(): AccessDeniedError {
      return new AccessDeniedError();
    }
  }

  export class BadRequestError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.BadRequestError,
        message: 'Bad Request',
        httpCode: 400,
        error: err,
        details: err?.response?.data
      } as UseCaseError);
    }

    public static create(err: any): BadRequestError {
      return new BadRequestError(err);
    }
  }
}
