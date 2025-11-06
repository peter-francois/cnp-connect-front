import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordInterface } from "../types/interfaces/auth/ResetPasswordInterface";
import { forgotPasswordAuthApi, resetPasswordAuthApi } from "../api/auth.api";
import type { UseFormForgotPassword } from "../types/formSchema/forgotPasswordSchema";

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

  return { resetPassword, forgotPassword };
};
