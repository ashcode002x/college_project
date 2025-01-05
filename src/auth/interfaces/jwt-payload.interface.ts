export interface JwtPayload {
  email: string;
  sub: string; // You can adjust 'sub' as needed; using 'email' here for uniqueness
}
