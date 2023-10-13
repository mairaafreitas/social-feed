import { InvalidPasswordError } from '@/users/entities/errors'

export class Password {
  public readonly value: string

  private constructor (password: string) {
    this.value = password
  }

  public static create (password: string): Password | InvalidPasswordError {
    if (Password.validate(password)) {
      return new Password(password)
    }
    return new InvalidPasswordError()
  }

  public static validate (password: string): boolean {
    return (
      Password.hasMinimumLength(8, password) &&
      Password.containsUppercase(password) &&
      Password.containsLowercase(password) &&
      Password.containsNumber(password) &&
      Password.containsSpecialCharacter(password))
  }

  public static hasMinimumLength (minLength: number, password: string): boolean {
    return password.length >= minLength
  }

  public static containsUppercase (password: string): boolean {
    return /[A-Z]/.test(password)
  }

  public static containsLowercase (password: string): boolean {
    return /[a-z]/.test(password)
  }

  public static containsNumber (password: string): boolean {
    return /\d/.test(password)
  }

  public static containsSpecialCharacter (password: string): boolean {
    return /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)
  }
}
