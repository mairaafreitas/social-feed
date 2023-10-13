export class InvalidPasswordError extends Error {
  public readonly name: string = 'InvalidPasswordError'
  constructor () {
    super('Invalid password. Check if you password has at least 8 characters long, upper and lower case, has number and at special character.')
  }
}
