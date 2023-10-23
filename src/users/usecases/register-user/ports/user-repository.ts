import { type UserData } from '@/users/entities'

export interface UserRepository {
  add: (user: UserData) => Promise<UserData>
  findUserByEmail: (email: string) => Promise<UserData | null>
  findAllUsers: () => Promise<UserData[]>
  exists: (user: UserData) => Promise<UserData | boolean>
}
