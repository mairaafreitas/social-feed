import { User, type UserData } from '@/users/entities'
import { InvalidNameError, InvalidEmailError, InvalidPasswordError } from '@/users/entities/errors'
import { type RegisterUserUseCase } from '@/users/usecases/ports'
import { type UserRepository } from '@/users/usecases/register-user/ports'

export class RegisterUser implements RegisterUserUseCase {
  private readonly userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async perform (request: UserData): Promise<InvalidNameError | InvalidEmailError | InvalidPasswordError | UserData > {
    const user: User = User.create(request) as User
    if (user instanceof InvalidNameError || user instanceof InvalidEmailError || user instanceof InvalidPasswordError) {
      return user
    }

    const name = user.name.value
    const email = user.email.value
    const password = user.password.value
    const userData: UserData = { name, email, password }

    if (await this.userRepository.exists(userData) === false) {
      await this.userRepository.add(userData)
    }
    return { name: user.name.value, email: user.email.value, password: user.password.value }
  }
}
