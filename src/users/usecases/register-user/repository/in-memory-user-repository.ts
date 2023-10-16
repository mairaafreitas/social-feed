import { type UserData } from '@/users/entities'
import { type UserRepository } from '@/users/usecases/register-user/ports'

export class InMemoryUserRepository implements UserRepository {
  private readonly repository: UserData[]
  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData | null> {
    const userFound = this.repository.find((user) => user.email === email)
    return userFound ?? null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    const foundUser = await this.findUserByEmail(user.email)
    if (foundUser == null) {
      return false
    }
    return true
  }
}
