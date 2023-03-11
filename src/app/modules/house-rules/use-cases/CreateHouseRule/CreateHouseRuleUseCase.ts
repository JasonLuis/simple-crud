import { IHouseRuleService } from '../../services/HouseRuleService';
import { CreateHouseRuleDTO } from './CreateHouseRuleDTO';
import { UseCase } from '@/app/core/base/UseCase';
import { Result } from '@/app/core/base/Result';
import { left, right } from '@/app/core/base/Either';
import { AppError } from '@/app/core/base/AppError';
import { HttpHelper } from '~/shared/helper/HttpHelper';
import { CallError } from '~/shared/types/ErrorType';

export class CreateHouseRuleUseCase
  implements UseCase<CreateHouseRuleDTO.Request, CreateHouseRuleDTO.Response>
{
  constructor(private houseRuleService: IHouseRuleService) {
    this.houseRuleService = houseRuleService;
  }

  public async execute(
    dto: CreateHouseRuleDTO.Request
  ): Promise<CreateHouseRuleDTO.Response> {
    try {
      const call = await this.houseRuleService.createHouseRule(dto);
      const res = {
        data: call.data
      };
      return right(Result.ok(res));
    } catch (err) {
      if (HttpHelper.isDataNotFoundError(err as CallError)) {
        return left(new AppError.DataNotFound(err));
      } else if (HttpHelper.isBadRequestError(err as CallError)) {
        return left(new AppError.BadRequestError(err));
      }
      return left(new AppError.UnexpectedError(err));
    }
  }
}
