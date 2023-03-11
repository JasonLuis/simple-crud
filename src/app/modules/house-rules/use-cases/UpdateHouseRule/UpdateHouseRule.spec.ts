import { HouseRuleServiceMock } from '../../services/HouseRuleServiceMock';
import { UpdateHouseRuleUseCase } from './UpdateHouseRuleUseCase';
import { updateHouseRuleUseCase } from '.';
import { ErrorCodeEnum } from '~/shared/enums/ErrorCodeEnum';

describe('Use Case: HouseRules/UpdateHouseRuleUseCase', () => {
  beforeAll(() => {});

  test('UpdateHouseRule - Success', async () => {
    const req = {
      token: 'test token',
      input: {
        house_rules: {
          id: 9,
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await updateHouseRuleUseCase.execute(req);

    expect(res.isRight()).toBe(true);
    expect(res.value.getValue()).toBeDefined();
  });

  test('UpdateHouseRule - Data not found error', async () => {
    const updateHouseRuleMock = new HouseRuleServiceMock();
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
      .spyOn(updateHouseRuleMock, 'updateHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const updateHouseRuleUseCase = new UpdateHouseRuleUseCase(
      updateHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        house_rules: {
          id: 9,
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await updateHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.DataNotFound);
    }
    spy.mockRestore();
  });

  test('UpdateHouseRule - Bad Request Error', async () => {
    const updateHouseRuleMock = new HouseRuleServiceMock();
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
      .spyOn(updateHouseRuleMock, 'updateHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const updateHouseRuleUseCase = new UpdateHouseRuleUseCase(
      updateHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        house_rules: {
          id: 9,
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await updateHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.BadRequestError);
    }
    spy.mockRestore();
  });

  test('UpdateHouseRule - Unexpected error', async () => {
    const updateHouseRuleMock = new HouseRuleServiceMock();
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
      .spyOn(updateHouseRuleMock, 'updateHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const updateHouseRuleUseCase = new UpdateHouseRuleUseCase(
      updateHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        house_rules: {
          id: 9,
          name: 'New House Rules',
          active: 1
        }
      }
    };

    const res = await updateHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.UnexpectedError);
    }
    spy.mockRestore();
  });
});
