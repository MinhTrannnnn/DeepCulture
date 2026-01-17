import bcrypt from 'bcrypt';
import { PasswordHasher } from '../../../domain/repositories/PasswordHasherRepository';

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
