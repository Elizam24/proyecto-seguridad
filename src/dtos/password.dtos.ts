export class CreatePasswordDto {
  readonly userId: number;
  readonly password: string;
}

export class UpdatePasswordDto {
  readonly userId: number;
  readonly password?: string;
}
