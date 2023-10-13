import { InvalidNameError } from '@/users/entities/errors'

export class Name {
  public readonly value: string

  private constructor (name: string) {
    this.value = name
  }

  public static create (name: string): InvalidNameError | Name {
    if (Name.validate(name)) {
      return new Name(name)
    }
    return new InvalidNameError(name)
  }

  public static validate (name: string): boolean {
    return (
      Name.hasValidLength(name) &&
      Name.containsValidCharacters(name) &&
      Name.doesNotConsistOfOnlyWhitespace(name)
    )
  }

  public static hasValidLength (name: string): boolean {
    return name.length >= 2 && name.length <= 100
  }

  public static containsValidCharacters (name: string): boolean {
    return /^[A-Za-z\s'-]+$/.test(name)
  }

  public static doesNotConsistOfOnlyWhitespace (name: string): boolean {
    return /\S/.test(name)
  }
}
