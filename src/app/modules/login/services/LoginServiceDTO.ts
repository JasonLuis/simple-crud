import { Login } from '../models/Login';

export namespace LoginServiceDTO {
  export namespace AuthLogin {
    export interface Request {
      input: {
        login: {
          email: string;
          password: string;
        };
      };
    }
    export interface Response extends Login {}
  }
}
