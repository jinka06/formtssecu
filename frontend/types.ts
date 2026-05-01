export interface RegisterRequest {
  name: string;
  email: string;
  age: string | number;
  username: string;
  password: string;
  bio?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: {
    id: number;
    name: string;
    email: string;
    username: string;
  };
  errors?: ValidationError[];
  message?: string;
  mockUserCount?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}
