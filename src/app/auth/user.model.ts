export class User {
  constructor(
    public email: string,
    public id: string,
    private token: string,
    private tokenExpirationDate: Date
  ) {}

  get userToken(): string | null {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    } else {
      return this.token;
    }
  }
}
