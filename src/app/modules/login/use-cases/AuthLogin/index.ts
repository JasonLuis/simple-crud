import { LoginService } from '../../services/LoginService';
import { AuthLoginUseCase } from './AuthLoginUseCase';
import { HttpAdapter } from '@/app/core/adapter/HttpAdapter';

const httpAdapter = new HttpAdapter();
const authLogin = new LoginService(httpAdapter);

const authLoginUseCase = new AuthLoginUseCase(authLogin);

export { authLoginUseCase };
