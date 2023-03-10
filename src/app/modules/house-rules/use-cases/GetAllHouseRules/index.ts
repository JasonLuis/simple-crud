import { HouseRuleService } from '../../services/HouseRuleService';
import { HouseRuleServiceMock } from '../../services/HouseRuleServiceMock';
import { GetAllHouseRulesUseCase } from './GetAllHouseRulesUsecase';
import { HttpAdapter } from '~/app/core/adapter/HttpAdapter';

const MOCK = process.env.MOCK === 'true';

const httpAdapter = new HttpAdapter();
const houseRuleService = MOCK
  ? new HouseRuleServiceMock()
  : new HouseRuleService(httpAdapter);

const houseRuleUseCase = new GetAllHouseRulesUseCase(houseRuleService);

export { houseRuleUseCase };
