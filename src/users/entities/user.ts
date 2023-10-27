import { Email, Name, Password, type UserData } from '@/users/entities'
import { InvalidNameError, InvalidEmailError, InvalidPasswordError } from '@/users/entities/errors'

export class User {
  public readonly name: Name
  public readonly email: Email
  public readonly password: Password

  private constructor (name: Name, email: Email, password: Password) {
    this.name = name
    this.email = email
    this.password = password
  }

  static create (userData: UserData): User | InvalidNameError | InvalidEmailError | InvalidPasswordError {
    const nameOrError = Name.create(userData.name)
    if (nameOrError instanceof InvalidNameError) {
      return nameOrError
    }

    const emailOrError = Email.create(userData.email)
    if (emailOrError instanceof InvalidEmailError) {
      return emailOrError
    }

    const passwordOrError = Password.create(userData.password)
    if (passwordOrError instanceof InvalidPasswordError) {
      return passwordOrError
    }

    const name: Name = nameOrError
    const email: Email = emailOrError
    const password: Password = passwordOrError

    return new User(name, email, password)
  }
}
