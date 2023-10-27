import { type UserData } from '@/users/entities'
import { type UserRepository } from '@/users/usecases/register-user/ports'

export class InMemoryUserRepository implements UserRepository {
  private readonly repository: UserData[]
  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<UserData> {
    const userExist = await this.exists(user)
    if (userExist !== false) {
      return userExist as UserData
    }
    this.repository.push(user)
    return user
  }

  async findUserByEmail (email: string): Promise<UserData | null> {
    const userFound = this.repository.find((user) => user.email === email)
    return userFound ?? null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<UserData | boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result != null) {
      return result
    }
    return false
  }
}
