import { AppError } from "./app.error";

export class PasswordValidationError extends AppError {
  constructor(message: string) {
    super(message, 400); // 400: Bad Request
  }
}
