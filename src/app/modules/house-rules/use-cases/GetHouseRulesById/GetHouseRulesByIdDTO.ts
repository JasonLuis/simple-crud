import { AppError } from '@/app/core/base/AppError';
import { Either } from '@/app/core/base/Either';
import { Result } from '@/app/core/base/Result';

export namespace GetHouseRulesByIdDTO {
  export interface Request {
    token: string;
    input: {
      id: number;
    };
  }

  export interface ResponseProps {
    id: number;
    name: string;
    active: number;
    order: number;
  }

  export interface ResponseBody extends ResponseProps {}

  export type Response = Either<
    AppError.UnexpectedError | AppError.DataNotFound,
    Result<ResponseBody>
  >;
}
