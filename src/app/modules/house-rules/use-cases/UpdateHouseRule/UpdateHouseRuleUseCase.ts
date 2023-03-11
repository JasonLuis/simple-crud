import { IHouseRuleService } from '../../services/HouseRuleService';
import { UpdateHouseRuleDTO } from './UpdateHouseRuleDTO';
import { UseCase } from '@/app/core/base/UseCase';
import { Result } from '@/app/core/base/Result';
import { left, right } from '@/app/core/base/Either';
import { AppError } from '@/app/core/base/AppError';
import { HttpHelper } from '~/shared/helper/HttpHelper';
import { CallError } from '~/shared/types/ErrorType';

export class UpdateHouseRuleUseCase
  implements UseCase<UpdateHouseRuleDTO.Request, UpdateHouseRuleDTO.Response>
{
  constructor(private houseRuleService: IHouseRuleService) {
    this.houseRuleService = houseRuleService;
  }

  public async execute(
    dto: UpdateHouseRuleDTO.Request
  ): Promise<UpdateHouseRuleDTO.Response> {
    try {
      const call = await this.houseRuleService.updateHouseRule(dto);
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
