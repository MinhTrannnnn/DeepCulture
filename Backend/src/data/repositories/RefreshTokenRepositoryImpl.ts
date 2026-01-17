import { AppDataSource } from '../../infra/database/postgres';
import { RefreshTokenSessionModel } from '../models/RefreshTokenSessionModel';
import { RefreshTokenRepository, RefreshTokenSession } from '../../domain/repositories/RefreshTokenRepository';

export class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
    private repository = AppDataSource.getRepository(RefreshTokenSessionModel);

    async save(session: Omit<RefreshTokenSession, 'id'>): Promise<RefreshTokenSession> {
        // convert domain entity to db model (ORM entity)
        const model = this.repository.create({
            userId: session.userId,
            refreshToken: session.refreshToken,
            isRevoked: session.isRevoked,
            revokedAt: session.revokedAt,
            expiresAt: session.expiresAt
        });
        const saved = await this.repository.save(model);
        return this.toEntity(saved);
    }

    async findByToken(token: string): Promise<RefreshTokenSession | null> {
        const model = await this.repository.findOne({ where: { refreshToken: token } });
        return model ? this.toEntity(model) : null;
    }

    // Logout 1 session by revoking the token
    async revoke(id: string): Promise<void> {
        await this.repository.update(id, {
            isRevoked: true,
            revokedAt: new Date()
        });
    }

    // Logout all session
    async revokeByUserId(userId: string): Promise<void> {
        await this.repository.update(
            { userId },
            { isRevoked: true, revokedAt: new Date() }
        );
    }

    private toEntity(model: RefreshTokenSessionModel): RefreshTokenSession {
        return {
            id: model.id,
            userId: model.userId,
            refreshToken: model.refreshToken,
            isRevoked: model.isRevoked,
            revokedAt: model.revokedAt,
            expiresAt: model.expiresAt
        };
    }
}
