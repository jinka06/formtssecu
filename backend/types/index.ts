export interface RegisterRequest {
  name: string;
  email: string;
  age: string | number;
  username: string;
  password: string;
  bio?: string;
}
