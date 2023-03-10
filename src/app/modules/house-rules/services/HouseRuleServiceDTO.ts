import { HouseRule } from '../models/HouseRule';

export namespace HouseRuleServiceDTO {
  export namespace GetAllHouseRules {
    export interface Request {
      token: string;
    }
    export interface Response extends HouseRule {}
  }
}
