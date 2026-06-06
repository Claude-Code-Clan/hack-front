import {
  CreateUserRequestI,
  CreateUserResponseI,
  CreateUserSessionRequestI,
  CreateUserSessionResponseI,
  RenewUserTokensRequestI,
  RenewUserTokensResponseI,
} from '../types/user.types.ts';
import { AxiosResponse } from 'axios';
import $api from './index.ts';

export default class LoginService {
  private static readonly loginBaseUrl = '/user';

  static async registration(data: CreateUserRequestI): Promise<AxiosResponse<CreateUserResponseI>> {
    return $api.post<CreateUserResponseI>(this.loginBaseUrl, data);
  }

  static async login(
    data: CreateUserSessionRequestI
  ): Promise<AxiosResponse<CreateUserSessionResponseI>> {
    return $api.post<CreateUserSessionResponseI>(`${this.loginBaseUrl}/session`, data);
  }

  static async logout(): Promise<AxiosResponse> {
    return $api.delete<CreateUserSessionResponseI>(`${this.loginBaseUrl}/session`);
  }

  static async checkAuth(): Promise<AxiosResponse> {
    return $api.get(`${this.loginBaseUrl}/session/check`);
  }

  static async renewTokens(
    data: RenewUserTokensRequestI
  ): Promise<AxiosResponse<RenewUserTokensResponseI>> {
    return $api.put(`${this.loginBaseUrl}/session`, data);
  }
}
