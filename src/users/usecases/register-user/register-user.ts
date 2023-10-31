import { type Encoder } from '@/shared/usecases/ports'
import { User, type UserData } from '@/users/entities'
import { InvalidNameError, InvalidEmailError, InvalidPasswordError } from '@/users/entities/errors'
import { type AuthenticationResult, type RegisterUserUseCase } from '@/users/usecases/ports'
import { type UserRepository } from '@/users/usecases/register-user/ports'

export class RegisterUser implements RegisterUserUseCase {
  private readonly userRepository: UserRepository
  private readonly encoder: Encoder

  constructor (userRepository: UserRepository, encoder: Encoder) {
    this.userRepository = userRepository
    this.encoder = encoder
  }

  public async perform (request: UserData): Promise<InvalidNameError | InvalidEmailError | InvalidPasswordError | AuthenticationResult> {
    const user: User = User.create(request) as User
    if (user instanceof InvalidNameError || user instanceof InvalidEmailError || user instanceof InvalidPasswordError) {
      return user
    }

    const encodedPassword = await this.encoder.encode(user.password.value)
    const userData: UserData = { name: user.name.value, email: user.email.value, password: encodedPassword }

    if (await this.userRepository.exists(userData) === false) {
      await this.userRepository.add(userData)
    }
    return { name: user.name.value, email: user.email.value }
  }
}
