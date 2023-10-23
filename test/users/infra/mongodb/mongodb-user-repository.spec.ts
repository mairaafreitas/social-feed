import { MongoHelper } from '@/shared/infra/mongodb-helper'
import { MongodbUserRepository } from '@/users/infra/mongodb/mongodb-user-repository'

describe('Mongodb User Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.JEST_MONGODB_URI as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'Any Name',
      email: 'any@email.com',
      password: 'any_password'
    }
    await userRepository.add(user)
    expect(await userRepository.exists(user)).toBeTruthy()
  })

  test('findUserByEmail should return the user', async () => {
    const userRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'Any Name',
      email: 'any@email.com',
      password: 'any_password'
    })
    await userRepository.add({
      name: 'Second Name',
      email: 'second@email.com',
      password: 'second_password'
    })
    const users = await userRepository.findAllUsers()
    expect(users[0].name).toEqual('Any Name')
    expect(users[1].name).toEqual('Second Name')
  })

  test('findAllUsers should return all added users', async () => {
    const userRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'Any Name',
      email: 'any@email.com',
      password: 'any_password'
    })
    await userRepository.add({
      name: 'Second Name',
      email: 'second@email.com',
      password: 'second_password'
    })
    const users = await userRepository.findAllUsers()
    expect(users[0].name).toEqual('Any Name')
    expect(users[1].name).toEqual('Second Name')
  })
})
