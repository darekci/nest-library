export class User {
  private userDomain: void;

  constructor(id?: number) {
    this.id = id;

    if (!id) {
      this.number = this.generateNumber();
    }
  }

  id: number;
  fullName: string;
  number: string;
  phone: string;
  email: string;

  withFullName(fullName: string): User {
    this.fullName = fullName;
    return this;
  }

  withPhone(phone: string): User {
    this.phone = phone;
    return this;
  }

  withEmail(email: string): User {
    this.email = email;
    return this;
  }

  private generateNumber(): string {
    const length = 8;
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}

export function createUser(id?: number): User {
  return new User(id);
}
