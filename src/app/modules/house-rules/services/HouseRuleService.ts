import { HouseRuleServiceDTO } from './HouseRuleServiceDTO';
import { HttpAdapter } from '~/app/core/adapter/HttpAdapter';

type Response<T> = { data: T };

export interface IHouseRuleService {
  getAllHouseRulesService(
    dto: HouseRuleServiceDTO.GetAllHouseRules.Request
  ): Promise<HouseRuleServiceDTO.GetAllHouseRules.Response>;
}

export class HouseRuleService implements IHouseRuleService {
  private httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  async getAllHouseRulesService(
    dto: HouseRuleServiceDTO.GetAllHouseRules.Request
  ): Promise<HouseRuleServiceDTO.GetAllHouseRules.Response> {
    const url = `${process.env.API_URL}/house_rules`;

    const headers = {
      Authorization: `${dto.token}`
    };

    const res: Response<HouseRuleServiceDTO.GetAllHouseRules.Response> =
      await this.httpAdapter.get({
        url,
        headers
      });

    return res.data;
  }
}
