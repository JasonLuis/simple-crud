import { AppError } from '@/app/core/base/AppError';
import { Either } from '@/app/core/base/Either';
import { Result } from '@/app/core/base/Result';

export namespace AuthLoginDTO {
  export interface Request {
    input: {
      login: {
        email: string;
        password: string;
      };
    };
  }

  export interface ResponseProps {
    accessToken: string;
  }

  export interface ResponseBody extends ResponseProps {}

  export type Response = Either<AppError.UnexpectedError, Result<ResponseBody>>;
}
