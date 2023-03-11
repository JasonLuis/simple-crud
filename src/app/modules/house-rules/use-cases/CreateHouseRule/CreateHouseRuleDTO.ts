import { AppError } from '@/app/core/base/AppError';
import { Either } from '@/app/core/base/Either';
import { Result } from '@/app/core/base/Result';

export namespace CreateHouseRuleDTO {
  export interface Request {
    token: string;
    input: {
      house_rules: {
        name: string;
        active: number;
      };
    };
  }

  export interface ResponseProps {
    data: {
      id: number;
      name: string;
      active: number;
      order?: number;
    };
  }

  export interface ResponseBody extends ResponseProps {}

  export type Response = Either<
    AppError.UnexpectedError | AppError.DataNotFound | AppError.BadRequestError,
    Result<ResponseBody>
  >;
}
