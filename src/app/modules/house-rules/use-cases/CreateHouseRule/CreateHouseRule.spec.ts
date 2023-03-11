import { HouseRuleServiceMock } from '../../services/HouseRuleServiceMock';
import { CreateHouseRuleUseCase } from './CreateHouseRuleUseCase';
import { createHouseRuleUseCase } from '.';
import { ErrorCodeEnum } from '~/shared/enums/ErrorCodeEnum';

describe('Use Case: HouseRules/CreateHouseRuleUseCase', () => {
  beforeAll(() => {});

  test('CreateHouseRules - Success', async () => {
    const req = {
      token: 'test token',
      input: {
        house_rules: {
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await createHouseRuleUseCase.execute(req);

    expect(res.isRight()).toBe(true);
    expect(res.value.getValue()).toBeDefined();
  });

  test('CreateHouseRules - Data not found error', async () => {
    const createHouseRuleMock = new HouseRuleServiceMock();
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
      .spyOn(createHouseRuleMock, 'createHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const createHouseRuleUseCase = new CreateHouseRuleUseCase(
      createHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        house_rules: {
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await createHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.DataNotFound);
    }
    spy.mockRestore();
  });

  test('CreateHouseRules - Bad Request Error', async () => {
    const createHouseRuleMock = new HouseRuleServiceMock();
    const apiError = {
      code: 400,
      message: 'Bad Request error code 400',
      response: {
        data: {
          errors: 'Bad Request'
        }
      }
    };

    const spy = jest
      .spyOn(createHouseRuleMock, 'createHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const createHouseRuleUseCase = new CreateHouseRuleUseCase(
      createHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        house_rules: {
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await createHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.BadRequestError);
    }
    spy.mockRestore();
  });

  test('CreateHouseRules - Unexpected error', async () => {
    const createHouseRuleMock = new HouseRuleServiceMock();
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
      .spyOn(createHouseRuleMock, 'createHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const createHouseRuleUseCase = new CreateHouseRuleUseCase(
      createHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        house_rules: {
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await createHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.UnexpectedError);
    }
    spy.mockRestore();
  });
});
