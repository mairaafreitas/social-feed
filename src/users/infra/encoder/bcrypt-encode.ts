import { type Encoder } from '@/shared/usecases/ports'
import * as bcrypt from 'bcrypt'

export class BcryptEncoder implements Encoder {
  private readonly rounds: number = 10

  constructor (rounds: number) {
    this.rounds = rounds
  }

  async encode (plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds)
  }

  async compare (plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed)
  }
}
