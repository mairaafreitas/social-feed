import { InMemoryUserRepository } from '@/users/usecases/register-user/repository'
import type { UserData } from '@/users/entities'

describe('In memory User Repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })

  test('should return user if user is found in repository', async () => {
    const users: UserData[] = []
    const name = 'name'
    const email = 'email@email.com'
    const password = 'Xpassword1*'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email, password })
    const user = await userRepo.findUserByEmail(email) as UserData
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
    expect(user.password).toBe(password)
  })

  test('should return all users in repository', async () => {
    const users: UserData[] = [
      { name: 'Any Name', email: 'any@email.com', password: 'Xpassword1*' },
      { name: 'Second Name', email: 'second@email.com', password: 'Xpassword1*' }
    ]
    const userRepo = new InMemoryUserRepository(users)

    const returnedUser = await userRepo.findAllUsers()
    expect(returnedUser.length).toBe(2)
  })

  test('should add when user is not found', async () => {
    const users: UserData[] = []
    const name = 'name'
    const email = 'email@email.com'
    const password = 'Xpassword1*'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email, password })

    const userdata = [{ name, email, password }]
    expect(users).toStrictEqual(userdata)
  })

  test('should return true when user exists', async () => {
    const users: UserData[] = [
      { name: 'Any Name', email: 'any@email.com', password: 'Xpassword1*' }
    ]
    const userRepo = new InMemoryUserRepository(users)

    const user: UserData = { name: 'Any Name', email: 'any@email.com', password: 'Xpassword1*' }
    const existUser = await userRepo.exists(user)

    expect(existUser).toBeTruthy()
  })
  test('should return false when user does not exists', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)

    const user: UserData = { name: 'Any Name', email: 'any@email.com', password: 'Xpassword1*' }
    const existUser = await userRepo.exists(user)

    expect(existUser).toBeFalsy()
  })
})
