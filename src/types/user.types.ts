export interface UserI {
  uuid: string;
}

export interface CreateUserRequestI {
  login: string;
  password: string;
}

export interface CreateUserResponseI {
  uuid: string;
}

export interface CreateUserSessionRequestI extends CreateUserRequestI {}

export interface CreateUserSessionResponseI extends CreateUserResponseI {
  access_token: string;
  refresh_token: string;
}

export interface RenewUserTokensRequestI {
  refresh_token: string;
}

export interface RenewUserTokensResponseI extends CreateUserSessionResponseI {}
