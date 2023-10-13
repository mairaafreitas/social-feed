import { InvalidEmailError } from '@/users/entities/errors'

export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email
  }

  public static create (email: string): Email | InvalidEmailError {
    if (Email.validate(email)) {
      return new Email(email)
    }
    return new InvalidEmailError(email)
  }

  public static validate (email: string): boolean {
    return (
      Email.hasValidFormat(email) &&
      Email.hasValidLength(email)
    )
  }

  private static hasValidFormat (email: string): boolean {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    return emailRegex.test(email)
  }

  private static hasValidLength (email: string): boolean {
    if (email.length === 0 || email.length > 320) {
      return false
    }

    const [local, domain] = email.split('@')
    return (
      local.length > 0 && local.length <= 64 &&
      domain.length > 0 && domain.length <= 255 &&
      domain.split('.').every(part => part.length <= 63)
    )
  }
}
