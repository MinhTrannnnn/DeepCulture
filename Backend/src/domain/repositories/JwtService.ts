export interface AccessTokenPayload {
  sub: string;
  role: string;
}

export interface RefreshTokenPayload {
  sub: string;
}
export interface JwtService {
  signAccessToken(payload: AccessTokenPayload): string;
  signRefreshToken(payload: RefreshTokenPayload): string;
  verifyAccessToken(token: string): AccessTokenPayload;
  verifyRefreshToken(token: string): RefreshTokenPayload;
}
