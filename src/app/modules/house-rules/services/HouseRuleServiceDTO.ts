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

  export namespace CreateHouseRule {
    export interface Request {
      token: string;
      input: {
        house_rules: {
          name: string;
          active: number;
        };
      };
    }

    export interface Response {
      success: boolean;
      data: {
        id: number;
        name: string;
        active: number;
        order?: number;
      };
      message: string;
    }
  }

  export namespace UpdateHouseRule {
    export interface Request {
      token: string;
      input: {
        house_rules: {
          id: number;
          name: string;
          active: number;
        };
      };
    }
    export interface Response {
      success: boolean;
      data: {
        id: number;
        name: string;
        active: number;
        order?: number;
      };
      message: string;
    }
  }
}
