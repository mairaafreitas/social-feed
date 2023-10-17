import { type User, type UserData } from '@/users/entities'
import { type UseCase } from '@/users/usecases/ports'
import { type UserRepository } from '@/users/usecases/register-user/ports'

export class RegisterUser implements UseCase {
  private readonly userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async perform (request: User): Promise<UserData | undefined> {
    try {
      const name = request.name?.value
      const email = request.email?.value
      const password = request.password?.value
      const userData = { name, email, password }
      if (!(await this.userRepository.exists(userData))) {
        await this.userRepository.add(userData)
      }
      return userData
    } catch (error) {
      console.log(error)
    }
  }
}
