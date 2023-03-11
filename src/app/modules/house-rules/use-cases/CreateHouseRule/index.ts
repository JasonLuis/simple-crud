import { HouseRuleService } from '../../services/HouseRuleService';
import { HouseRuleServiceMock } from '../../services/HouseRuleServiceMock';
import { CreateHouseRuleUseCase } from './CreateHouseRuleUseCase';
import { HttpAdapter } from '~/app/core/adapter/HttpAdapter';

const MOCK = process.env.MOCK === 'true';

const httpAdapter = new HttpAdapter();
const houseRuleService = MOCK
  ? new HouseRuleServiceMock()
  : new HouseRuleService(httpAdapter);

const createHouseRuleUseCase = new CreateHouseRuleUseCase(houseRuleService);

export { createHouseRuleUseCase };
