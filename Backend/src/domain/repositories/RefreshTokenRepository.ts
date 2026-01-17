export interface RefreshTokenSession {
    id: string;
    userId: string;
    refreshToken: string;
    isRevoked: boolean;
    revokedAt: Date | null;
    expiresAt: Date;
}

export interface RefreshTokenRepository {
    save(session: Omit<RefreshTokenSession, 'id'>): Promise<RefreshTokenSession>;
    findByToken(token: string): Promise<RefreshTokenSession | null>;
    revoke(id: string): Promise<void>;
    revokeByUserId(userId: string): Promise<void>;
}
