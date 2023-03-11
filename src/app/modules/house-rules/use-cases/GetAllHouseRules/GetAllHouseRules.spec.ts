import { HouseRuleServiceMock } from '../../services/HouseRuleServiceMock';
import { GetAllHouseRulesUseCase } from './GetAllHouseRulesUsecase';
import { houseRuleUseCase } from '.';
import { ErrorCodeEnum } from '~/shared/enums/ErrorCodeEnum';

describe('Use Case: HouseRules/GetAllHouseRules', () => {
  test('GetAllHouseRules - Success', async () => {
    const req = {
      token: 'teste token'
    };

    const res = await houseRuleUseCase.execute(req);

    expect(res.isRight()).toBe(true);
    expect(res.value.getValue()).toBeDefined();
  });

  test('GetAllHouseRules - Data not found error', async () => {
    const getAllHouseRulesMock = new HouseRuleServiceMock();
    const apiError = {
      code: 404,
      message: 'Data not found code 404',
      response: {
        data: {
          errors: 'Data not found'
        }
      }
    };

    const spy = jest
      .spyOn(getAllHouseRulesMock, 'getAllHouseRulesService')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const getAllHouseRulesUseCase = new GetAllHouseRulesUseCase(
      getAllHouseRulesMock
    );

    const req = {
      token: 'test token'
    };

    const res = await getAllHouseRulesUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.DataNotFound);
    }
    spy.mockRestore();
  });

  test('GetAllHouseRules - Unexpected error', async () => {
    const getAllHouseRulesMock = new HouseRuleServiceMock();
    const apiError = {
      code: 500,
      message: 'Server error code 500',
      response: {
        data: {
          errors: 'Server error'
        }
      }
    };

    const spy = jest
      .spyOn(getAllHouseRulesMock, 'getAllHouseRulesService')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const getAllHouseRulesUseCase = new GetAllHouseRulesUseCase(
      getAllHouseRulesMock
    );

    const req = {
      token: 'test token'
    };

    const res = await getAllHouseRulesUseCase.execute(req);
    expect(res.isLeft()).toBe(true);

    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.UnexpectedError);
    }
    spy.mockRestore();
  });
});
