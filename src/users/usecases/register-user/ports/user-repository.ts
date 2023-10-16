import { type UserData } from '@/users/entities'

export interface UserRepository {
  add: (user: UserData) => Promise<void>
  findUserByEmail: (email: string) => Promise<UserData | null>
  findAllUsers: () => Promise<UserData[]>
  exists: (user: UserData) => Promise<boolean>
}
