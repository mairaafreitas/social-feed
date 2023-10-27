import { type UserData } from '@/users/entities'
import { InvalidEmailError } from '@/users/entities/errors'
import { RegisterUser } from '@/users/usecases/register-user'
import { type UserRepository } from '@/users/usecases/register-user/ports'
import { InMemoryUserRepository } from '@/users/usecases/register-user/repository'

describe('Register user use-case', () => {
  test('should add user with complete data to user Repository', async () => {
    const users: UserData[] = []
    const userRepository: UserRepository = new InMemoryUserRepository(users)
    const registerUserUseCase: RegisterUser = new RegisterUser(
      userRepository
    )
    const name = 'name'
    const email = 'email@email.com'
    const password = 'Xpassword1*'
    const userData = { name, email, password }

    const response = await registerUserUseCase.perform(userData) as UserData
    expect(response.name).toBe(name)
    expect(response.email).toBe(email)
    expect(response.password).toBe(password)

    const addedUser = await userRepository.findUserByEmail('email@email.com') as UserData
    expect(addedUser.name).toBe(name)
    expect(addedUser.email).toBe(email)
  })

  test('should not add user with invalid email', async () => {
    const users: UserData[] = []
    const userRepository: UserRepository = new InMemoryUserRepository(users)
    const registerUserUseCase: RegisterUser = new RegisterUser(
      userRepository
    )
    const name = 'name'
    const email = 'email@emailcom'
    const password = 'Xpassword1*'
    const userData = { name, email, password }

    const response = await registerUserUseCase.perform(userData) as InvalidEmailError
    expect(response).toBeInstanceOf(InvalidEmailError)
    expect(response.name).toEqual('InvalidEmailError')
    expect(response.message).toEqual(`Invalid email: ${email}.`)

    const addedUser = await userRepository.findUserByEmail(email) as UserData
    expect(addedUser).toBeNull()
  })
})
