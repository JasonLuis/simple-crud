import { IHouseRuleService } from './HouseRuleService';
import { HouseRuleServiceDTO } from './HouseRuleServiceDTO';
import { Helper } from '~/shared/helper/Helper';

export class HouseRuleServiceMock implements IHouseRuleService {
  async getAllHouseRulesService(
    dto: HouseRuleServiceDTO.GetAllHouseRules.Request
  ): Promise<HouseRuleServiceDTO.GetAllHouseRules.Response> {
    const body: HouseRuleServiceDTO.GetAllHouseRules.Response = {
      success: true,
      data: {
        entities: [
          {
            id: 2,
            name: 'No Pets',
            active: 1,
            order: 0
          }
        ],
        pagination: {
          total: 6,
          count: 6,
          per_page: 10,
          current_page: 1,
          total_pages: 1,
          links: {
            next: undefined,
            prev: undefined
          }
        }
      },
      message: 'Entities retrieved successfully.'
    };

    return await new Promise((resolve, reject) => {
      if (Helper.isNotDefined(dto.token)) {
        return reject(new Error('Token is empty!'));
      }

      try {
        setTimeout(() => resolve(body), 10);
      } catch (err) {
        return reject(err);
      }
    });
  }

  async getHouseRuleById(
    dto: HouseRuleServiceDTO.GetHouseRuleById.Request
  ): Promise<HouseRuleServiceDTO.GetHouseRuleById.Response> {
    const body: HouseRuleServiceDTO.GetHouseRuleById.Response = {
      success: true,
      data: {
        id: 2,
        name: 'No Pets',
        active: 1,
        order: 0
      },
      message: 'Entity retrieved successfully.'
    };

    return await new Promise((resolve, reject) => {
      if (Helper.isNotDefined(dto.token)) {
        return reject(new Error('Token is empty!'));
      }

      try {
        setTimeout(() => resolve(body), 10);
      } catch (err) {
        return reject(err);
      }
    });
  }

  async createHouseRule(
    dto: HouseRuleServiceDTO.CreateHouseRule.Request
  ): Promise<HouseRuleServiceDTO.CreateHouseRule.Response> {
    const body: HouseRuleServiceDTO.CreateHouseRule.Response = {
      success: true,
      data: {
        id: 9,
        name: 'New House Rules',
        active: 1,
        order: undefined
      },
      message: 'Entity created successfully.'
    };

    return await new Promise((resolve, reject) => {
      if (Helper.isNotDefined(dto.token)) {
        return reject(new Error('Token is empty!'));
      }

      try {
        setTimeout(() => resolve(body), 10);
      } catch (err) {
        return reject(err);
      }
    });
  }

  async updateHouseRule(
    dto: HouseRuleServiceDTO.UpdateHouseRule.Request
  ): Promise<HouseRuleServiceDTO.UpdateHouseRule.Response> {
    const body: HouseRuleServiceDTO.UpdateHouseRule.Response = {
      success: true,
      data: {
        id: 9,
        name: 'New House Rules',
        active: 0,
        order: 0
      },
      message: 'Entity created successfully.'
    };

    return await new Promise((resolve, reject) => {
      if (Helper.isNotDefined(dto.token)) {
        return reject(new Error('Token is empty!'));
      }

      try {
        setTimeout(() => resolve(body), 10);
      } catch (err) {
        return reject(err);
      }
    });
  }

  async deleteHouseRule(
    dto: HouseRuleServiceDTO.DeleteHouseRule.Request
  ): Promise<HouseRuleServiceDTO.DeleteHouseRule.Response> {
    const body: HouseRuleServiceDTO.DeleteHouseRule.Response = {
      success: true,
      data: [],
      message: 'Entity created successfully.'
    };

    return await new Promise((resolve, reject) => {
      if (Helper.isNotDefined(dto.token)) {
        return reject(new Error('Token is empty!'));
      }

      try {
        setTimeout(() => resolve(body), 10);
      } catch (err) {
        return reject(err);
      }
    });
  }
}
