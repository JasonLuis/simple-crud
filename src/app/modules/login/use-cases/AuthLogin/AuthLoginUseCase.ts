import { ILoginService } from '../../services/LoginService';
import { AuthLoginDTO } from './AuthLoginDTO';
import { AppError } from '@/app/core/base/AppError';
import { left, right } from '@/app/core/base/Either';
import { Result } from '@/app/core/base/Result';
import { UseCase } from '@/app/core/base/UseCase';

export class AuthLoginUseCase
  implements UseCase<AuthLoginDTO.Request, AuthLoginDTO.Response>
{
  private authLoginService: ILoginService;

  constructor(authLoginService: ILoginService) {
    this.authLoginService = authLoginService;
  }

  public async execute(
    dto: AuthLoginDTO.Request
  ): Promise<AuthLoginDTO.Response> {
    try {
      const call = await this.authLoginService.authLogin(dto);

      const res = {
        accessToken: call.data.result.access_token
      };

      return right(Result.ok(res));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
