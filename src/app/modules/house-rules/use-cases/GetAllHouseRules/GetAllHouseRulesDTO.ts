import { AppError } from '~/app/core/base/AppError';
import { Either } from '~/app/core/base/Either';
import { Result } from '~/app/core/base/Result';

export namespace GetAllHouseRulesDTO {
  export interface Request {
    token: string;
  }

  export interface ResponseProps {
    id: number;
    name: string;
    order: number;
  }

  export interface ResponseBody {
    entities: Array<ResponseProps>;
  }

  export type Response = Either<
    AppError.UnexpectedError | AppError.DataNotFound,
    Result<ResponseBody>
  >;
}
