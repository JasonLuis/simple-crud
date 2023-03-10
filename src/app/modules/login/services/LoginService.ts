import { LoginServiceDTO } from './LoginServiceDTO';
import { HttpAdapter } from '@/app/core/adapter/HttpAdapter';

type Response<T> = { data: T };

export interface ILoginService {
  authLogin(
    dto: LoginServiceDTO.AuthLogin.Request
  ): Promise<LoginServiceDTO.AuthLogin.Response>;
}

export class LoginService implements ILoginService {
  private httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  async authLogin(
    dto: LoginServiceDTO.AuthLogin.Request
  ): Promise<LoginServiceDTO.AuthLogin.Response> {
    const url = `${process.env.API_URL}/login_json`;

    const body = { ...dto.input };
    const res: Response<LoginServiceDTO.AuthLogin.Response> =
      await this.httpAdapter.post({
        url,
        body
      });

    return res.data;
  }
}
