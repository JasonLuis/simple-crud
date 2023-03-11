import { IHouseRuleService } from '../../services/HouseRuleService';
import { DeleteHouseRuleDTO } from './DeleteHouseRuleDTO';
import { UseCase } from '@/app/core/base/UseCase';
import { Result } from '@/app/core/base/Result';
import { left, right } from '@/app/core/base/Either';
import { AppError } from '@/app/core/base/AppError';
import { CallError } from '~/shared/types/ErrorType';
import { HttpHelper } from '~/shared/helper/HttpHelper';

export class DeleteHouseRuleUseCase
  implements UseCase<DeleteHouseRuleDTO.Request, DeleteHouseRuleDTO.Response>
{
  constructor(private houseRuleService: IHouseRuleService) {
    this.houseRuleService = houseRuleService;
  }

  public async execute(
    dto: DeleteHouseRuleDTO.Request
  ): Promise<DeleteHouseRuleDTO.Response> {
    try {
      const call = await this.houseRuleService.deleteHouseRule(dto);
      const res = {
        data: call.data
      };

      return right(Result.ok(res));
    } catch (err) {
      if (HttpHelper.isBadRequestError(err as CallError)) {
        return left(new AppError.BadRequestError(err));
      }
      return left(new AppError.UnexpectedError(err));
    }
  }
}
