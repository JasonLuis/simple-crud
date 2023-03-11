import { HouseRuleServiceMock } from '../../services/HouseRuleServiceMock';
import { DeleteHouseRuleUseCase } from './DeleteHouseRuleUseCase';
import { deleteHouseRuleUseCase } from '.';
import { ErrorCodeEnum } from '~/shared/enums/ErrorCodeEnum';

describe('Use Case: HouseRules/DeleteHouseRuleUseCase', () => {
  beforeAll(() => {});

  test('DeleteHouseRule - Success', async () => {
    const req = {
      token: 'test token',
      input: {
        id: 9
      }
    };

    const res = await deleteHouseRuleUseCase.execute(req);

    expect(res.isRight()).toBe(true);
    expect(res.value.getValue()).toBeDefined();
  });

  test('DeleteHouseRule - Bad Request Error', async () => {
    const deleteHouseRuleMock = new HouseRuleServiceMock();
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
      .spyOn(deleteHouseRuleMock, 'deleteHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const deleteHouseRuleUseCase = new DeleteHouseRuleUseCase(
      deleteHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        id: 9
      }
    };

    const res = await deleteHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.BadRequestError);
    }
    spy.mockRestore();
  });

  test('DeleteHouseRule - Unexpected error', async () => {
    const deleteHouseRuleMock = new HouseRuleServiceMock();
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
      .spyOn(deleteHouseRuleMock, 'deleteHouseRule')
      .mockImplementation(() => {
        return Promise.reject(apiError);
      });

    const deleteHouseRuleUseCase = new DeleteHouseRuleUseCase(
      deleteHouseRuleMock
    );

    const req = {
      token: 'test token',
      input: {
        id: 9
      }
    };

    const res = await deleteHouseRuleUseCase.execute(req);
    expect(res.isLeft()).toBe(true);
    if (res.isLeft()) {
      expect(res.value.errorValue().code).toBe(ErrorCodeEnum.UnexpectedError);
    }
    spy.mockRestore();
  });
});
