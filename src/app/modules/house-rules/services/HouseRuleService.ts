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
    dto: HouseRuleServiceDTO.CreateHouseRule.Request
  ): Promise<HouseRuleServiceDTO.CreateHouseRule.Response>;
  updateHouseRule(
    dto: HouseRuleServiceDTO.UpdateHouseRule.Request
  ): Promise<HouseRuleServiceDTO.UpdateHouseRule.Response>;
  deleteHouseRule(
    dto: HouseRuleServiceDTO.DeleteHouseRule.Request
  ): Promise<HouseRuleServiceDTO.DeleteHouseRule.Response>;
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
    dto: HouseRuleServiceDTO.CreateHouseRule.Request
  ): Promise<HouseRuleServiceDTO.CreateHouseRule.Response> {
    const url = `${process.env.API_URL}/house_rules`;

    const headers = {
      Authorization: `${dto.token}`
    };
    const body = {
      ...dto.input
    };

    const res: Response<HouseRuleServiceDTO.CreateHouseRule.Response> =
      await this.httpAdapter.post({
        url,
        headers,
        body
      });

    return res.data;
  }

  async updateHouseRule(
    dto: HouseRuleServiceDTO.UpdateHouseRule.Request
  ): Promise<HouseRuleServiceDTO.UpdateHouseRule.Response> {
    const url = `${process.env.API_URL}/house_rules/${dto.input.house_rules.id}`;

    const headers = {
      Authorization: `${dto.token}`
    };

    const body = {
      ...dto.input
    };

    const res: Response<HouseRuleServiceDTO.UpdateHouseRule.Response> =
      await this.httpAdapter.put({
        url,
        headers,
        body
      });

    return res.data;
  }

  async deleteHouseRule(
    dto: HouseRuleServiceDTO.DeleteHouseRule.Request
  ): Promise<HouseRuleServiceDTO.DeleteHouseRule.Response> {
    const url = `${process.env.API_URL}/house_rules/${dto.input.id}`;

    const headers = {
      Authorization: `${dto.token}`
    };

    const res: Response<HouseRuleServiceDTO.DeleteHouseRule.Response> =
      await this.httpAdapter.delete({
        url,
        headers
      });

    return res.data;
  }
}
