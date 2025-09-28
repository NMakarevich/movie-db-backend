import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
