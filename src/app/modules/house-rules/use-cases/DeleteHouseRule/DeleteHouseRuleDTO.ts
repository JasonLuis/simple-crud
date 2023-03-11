import { AppError } from '@/app/core/base/AppError';
import { Either } from '@/app/core/base/Either';
import { Result } from '@/app/core/base/Result';

export namespace DeleteHouseRuleDTO {
  export interface Request {
    token: string;
    input: {
      id: number;
    };
  }

  export interface ResponseProps {
    data?: Array<unknown>;
  }

  export interface ResponseBody extends ResponseProps {}

  export type Response = Either<
    AppError.UnexpectedError | AppError.BadRequestError,
    Result<ResponseBody>
  >;
}
