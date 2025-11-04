import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type {
  ResetPasswordInterface,
  ResetPasswordResponseInterface,
} from "../types/interfaces/ResetPasswordInterface";
import { resetPassword } from "../api/auth.api";

class UserService {
  resetPassword(): UseMutationResult<ResetPasswordResponseInterface, Error, ResetPasswordInterface> {
    return useMutation({
      mutationFn: ({ token, password, confirmPassword }) => resetPassword(token, password, confirmPassword),
    });
  }
}

export const userService = new UserService();
