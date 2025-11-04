export interface ResetPasswordInterface {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponseInterface {
  message: string;
}
