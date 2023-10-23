import { MongoHelper } from '@/shared/infra/mongodb-helper'
import { type UserData } from '@/users/entities'
import { type UserRepository } from '@/users/usecases/register-user/ports'
import { type ObjectId } from 'mongodb'

export interface MongodbUser {
  name: string
  email: string
  password: string
  _id: ObjectId
}

export class MongodbUserRepository implements UserRepository {
  async add (user: UserData): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users')
    const userClone = {
      name: user.name,
      email: user.email,
      password: user.password
    }
    const userExist = await this.exists(user)
    if (userExist !== false) {
      return userExist as UserData
    }
    const newUser = await userCollection.insertOne(userClone)
    return this.withApplicationId({ ...userClone, _id: newUser.insertedId })
  }

  async findUserByEmail (email: string): Promise<UserData | null> {
    const userCollection = MongoHelper.getCollection('users')
    const user = await userCollection.findOne<MongodbUser>({ email })
    if (user != null) {
      return this.withApplicationId(user)
    }
    return null
  }

  async findAllUsers (): Promise<UserData[]> {
    const userCollection = MongoHelper.getCollection('users')
    return (await userCollection.find<MongodbUser>({}).toArray()).map(this.withApplicationId)
  }

  async exists (user: UserData): Promise<UserData | boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result != null) {
      return result
    }
    return false
  }

  private withApplicationId (dbUser: MongodbUser): UserData {
    return {
      name: dbUser.name,
      email: dbUser.email,
      password: dbUser.password,
      id: dbUser._id.toString()
    }
  }
}
