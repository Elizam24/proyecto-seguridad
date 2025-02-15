import { AppError } from "./app.error";

export class PasswordNotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404); // 404: Not Found
  }
}
