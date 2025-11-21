import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordInterface } from "../types/interfaces/auth/ResetPasswordInterface";
import { forgotPasswordAuthApi, resetPasswordAuthApi, signinApi } from "../api/auth.api";
import type { UseFormForgotPassword } from "../types/formSchema/forgotPasswordSchema";
import type { SigninInterface } from "../types/interfaces/auth/SignInterface";

export const useAuthService = () => {
  const resetPassword = () =>
    useMutation({
      mutationFn: ({ token, password, confirmPassword }: ResetPasswordInterface) =>
        resetPasswordAuthApi(token, password, confirmPassword),
    });

  const forgotPassword = () =>
    useMutation({
      mutationFn: (data: UseFormForgotPassword) => forgotPasswordAuthApi(data.email),
    });

  const signin = () =>
    useMutation({
      mutationFn: ({ email, password }: SigninInterface) => signinApi(email, password),
    });

  return { resetPassword, forgotPassword, signin };
};
