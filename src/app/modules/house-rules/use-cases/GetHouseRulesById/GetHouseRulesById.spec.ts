import { HouseRuleServiceMock } from '../../services/HouseRuleServiceMock';
import { GetHouseRulesByIdUseCase } from './GetHouseRulesByIdUseCase';
import { getHouseRulesByIdUseCase } from '.';
import { ErrorCodeEnum } from '~/shared/enums/ErrorCodeEnum';

describe('Use Case: HouseRules/GetHouseRulesByIdUseCase', () => {
  beforeAll(() => {});

  test('GetHouseRulesByIdUseCase - Success', async () => {
    const req = {
      token: 'test token',
      input: {
        id: 2
      }
    };

    const res = await getHouseRulesByIdUseCase.execute(req);

    expect(res.isRight()).toBe(true);
    expect(res.value.getValue()).toBeDefined();
    if (res.isRight()) {
      expect(res.value.getValue().active).toBeDefined();
      expect(res.value.getValue().id).toBeDefined();
      expect(res.value.getValue().name).toBeDefined();
      expect(res.value.getValue().order).toBeDefined();
    }
  });

  test('GetHouseRulesByIdUseCase - Data not found error', async () => {
    const getHouseRuleByIdMock = new HouseRuleServiceMock();
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
      .spyOn(getHouseRuleByIdMock, 'getHouseRuleById')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const getHouseRulesByIdUseCase = new GetHouseRulesByIdUseCase(
      getHouseRuleByIdMock
    );

    const req = {
      token: 'test token',
      input: {
        id: 2
      }
    };

    const res = await getHouseRulesByIdUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.DataNotFound);
    }
    spy.mockRestore();
  });

  test('GetHouseRulesByIdUseCase - Unexpected error', async () => {
    const getHouseRuleByIdMock = new HouseRuleServiceMock();
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
      .spyOn(getHouseRuleByIdMock, 'getHouseRuleById')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const getHouseRulesByIdUseCase = new GetHouseRulesByIdUseCase(
      getHouseRuleByIdMock
    );

    const req = {
      token: 'test token',
      input: {
        id: 2
      }
    };

    const res = await getHouseRulesByIdUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.UnexpectedError);
    }
    spy.mockRestore();
  });
});
