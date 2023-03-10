import { authLoginUseCase } from '.';

describe('Use Case: AuthLoginUseCase', () => {
  beforeAll(() => {});

  test('AuthLogin - Success', async () => {
    const req = {
      input: {
        login: {
          email: process.env.EMAIL as string,
          password: process.env.PASSWORD as string
        }
      }
    };
    const res = await authLoginUseCase.execute(req);
    expect(res.isRight()).toBe(true);
    if (res.isRight()) {
      expect(res.value.getValue().accessToken).toBeDefined();
    }
  });
});
