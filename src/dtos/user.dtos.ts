export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
}

export class UpdateUserDto {
  readonly email?: string;
  readonly password?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phoneNumber?: string;
}

export class UserResponseDto {
  readonly id: number;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
}
