import { makeAutoObservable } from 'mobx';
import LoginService from '../api/loginService.ts';
import { storage } from '../utils/localStorage.ts';
import { REFRESH_TOKEN, TOKEN } from '../consts.ts';
import { router } from '../main.tsx';
import ErrorHandler, { ErrorI } from '../utils/errorHandler.ts';
import { CreateUserRequestI, CreateUserSessionRequestI, UserI } from '../types/user.types.ts';

class UserStore {
  isAuth = false;
  user?: UserI;
  private readonly _errorHandler = new ErrorHandler();

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  setUser(user: UserI) {
    this.user = user;
  }

  async login(data: CreateUserSessionRequestI) {
    try {
      const response = await LoginService.login(data);
      storage.set(TOKEN, response.data.access_token);
      storage.set(REFRESH_TOKEN, response.data.refresh_token);
      this.setAuth(true);
      this.setUser({ uuid: response.data.uuid });
      await router.navigate('/account');
      return response;
    } catch (e: unknown) {
      const errorsConfig: ErrorI[] = [{ errorText: 'Неверный логин или пароль', code: 401 }];
      this._errorHandler.handleError(e, errorsConfig);
    }
  }

  async registration(data: CreateUserRequestI) {
    try {
      const response = await LoginService.registration(data);
      this.setUser({ uuid: response.data.uuid });
      await router.navigate('/login');
      return response;
    } catch (e) {
      const errorsConfig: ErrorI[] = [{ errorText: 'Пользователь уже существует', code: 400 }];
      this._errorHandler.handleError(e, errorsConfig);
    }
  }

  async logout() {
    try {
      await LoginService.logout();
      //TODO а будет ли ошибка, если я не брошу запрос при логауте?
      storage.remove(TOKEN);
      storage.remove(REFRESH_TOKEN);
      this.setAuth(false);
      await router.navigate('/login');
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  async renew() {
    try {
      const refreshToken = storage.get(REFRESH_TOKEN);
      //TODO удалить throw после того как разберусь с говнокодом в storage.get
      if (!refreshToken) throw new Error('refreshToken');
      const response = await LoginService.renewTokens({ refresh_token: refreshToken });
      this.setAuth(true);
      this.setUser({ uuid: response.data.uuid });
      storage.set(TOKEN, response.data.access_token);
      storage.set(REFRESH_TOKEN, response.data.refresh_token);
    } catch (e) {
      this.setAuth(false);
      const errorsConfig: ErrorI[] = [
        { errorText: 'Ошибка авторизации', code: 401 },
        { errorText: 'Ошибка авторизации', code: 404 },
      ];
      this._errorHandler.handleError(e, errorsConfig);
    }
  }

  async checkAuth() {
    try {
      await LoginService.checkAuth();
      this.setAuth(true);
    } catch (e) {
      this.setAuth(false);
      const errorsConfig: ErrorI[] = [{ errorText: 'Ошибка авторизации' }];
      this._errorHandler.handleError(e, errorsConfig);
    }
  }
}

export default new UserStore();
