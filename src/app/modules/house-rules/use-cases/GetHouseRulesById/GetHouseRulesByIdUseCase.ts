import { IHouseRuleService } from '../../services/HouseRuleService';
import { GetHouseRulesByIdDTO } from './GetHouseRulesByIdDTO';
import { UseCase } from '@/app/core/base/UseCase';
import { Result } from '@/app/core/base/Result';
import { left, right } from '@/app/core/base/Either';
import { AppError } from '@/app/core/base/AppError';
import { HttpHelper } from '~/shared/helper/HttpHelper';
import { CallError } from '~/shared/types/ErrorType';

export class GetHouseRulesByIdUseCase
  implements
    UseCase<GetHouseRulesByIdDTO.Request, GetHouseRulesByIdDTO.Response>
{
  constructor(private houseRuleService: IHouseRuleService) {
    this.houseRuleService = houseRuleService;
  }

  public async execute(
    dto: GetHouseRulesByIdDTO.Request
  ): Promise<GetHouseRulesByIdDTO.Response> {
    try {
      const call = await this.houseRuleService.getHouseRuleById(dto);
      const res = call.data;

      return right(Result.ok<GetHouseRulesByIdDTO.ResponseBody>(res));
    } catch (err) {
      if (HttpHelper.isDataNotFoundError(err as CallError)) {
        return left(new AppError.DataNotFound(err));
      }
      return left(new AppError.UnexpectedError(err));
    }
  }
}
