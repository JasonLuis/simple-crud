import { Entitie } from '../models/Entitie';
import { HouseRule } from '../models/HouseRule';

export namespace HouseRuleServiceDTO {
  export namespace GetAllHouseRules {
    export interface Request {
      token: string;
    }
    export interface Response extends HouseRule {}
  }

  export namespace GetHouseRuleById {
    export interface Request {
      token: string;
      input: {
        id: number;
      };
    }

    export interface Response {
      success: boolean;
      data: Entitie;
      message: string;
    }
  }
}
