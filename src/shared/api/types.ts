export interface MeResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}
