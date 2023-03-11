import { HouseRuleServiceDTO } from './HouseRuleServiceDTO';
import { HttpAdapter } from '~/app/core/adapter/HttpAdapter';

type Response<T> = { data: T };

export interface IHouseRuleService {
  getAllHouseRulesService(
    dto: HouseRuleServiceDTO.GetAllHouseRules.Request
  ): Promise<HouseRuleServiceDTO.GetAllHouseRules.Response>;
  getHouseRuleById(
    dto: HouseRuleServiceDTO.GetHouseRuleById.Request
  ): Promise<HouseRuleServiceDTO.GetHouseRuleById.Response>;
  createHouseRule(
    dto: HouseRuleServiceDTO.CreateHouseRules.Request
  ): Promise<HouseRuleServiceDTO.CreateHouseRules.Response>;
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

  async getHouseRuleById(
    dto: HouseRuleServiceDTO.GetHouseRuleById.Request
  ): Promise<HouseRuleServiceDTO.GetHouseRuleById.Response> {
    const url = `${process.env.API_URL}/house_rules/${dto.input.id}`;

    const headers = {
      Authorization: `${dto.token}`
    };

    const res: Response<HouseRuleServiceDTO.GetHouseRuleById.Response> =
      await this.httpAdapter.get({
        url,
        headers
      });

    return res.data;
  }

  async createHouseRule(
    dto: HouseRuleServiceDTO.CreateHouseRules.Request
  ): Promise<HouseRuleServiceDTO.CreateHouseRules.Response> {
    const url = `${process.env.API_URL}/house_rules/`;

    const headers = {
      Authorization: `${dto.token}`
    };

    const res: Response<HouseRuleServiceDTO.CreateHouseRules.Response> =
      await this.httpAdapter.post({
        url,
        headers
      });

    return res.data;
  }
}
