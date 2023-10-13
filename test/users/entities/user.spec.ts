import { User } from '@/users/entities'

describe('User domain entity', () => {
  test('should create user with valid data', () => {
    const validName = 'Any Name'
    const validEmail = 'any@email.com'
    const validPassword = 'Xpassword1*'
    const user = User.create({ name: validName, email: validEmail, password: validPassword }) as User
    expect(user.name.value).toEqual(validName)
    expect(user.email.value).toEqual(validEmail)
    expect(user.password.value).toEqual(validPassword)
  })
  test('should not create user with invalid email address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'Any Name', email: invalidEmail, password: 'Xpassword1*' }) as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual(`Invalid email: ${invalidEmail}.`)
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O'
    const error = User.create({ name: invalidName, email: 'any@email.com', password: 'Xpassword1*' }) as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`)
  })

  test('should not create user with invalid password (no special character)', () => {
    const invalidPassword = 'Xpassword1'
    const error = User.create({ name: 'Any Name', email: 'any@email.com', password: invalidPassword }) as Error
    expect(error.name).toEqual('InvalidPasswordError')
    expect(error.message).toEqual('Invalid password. Check if you password has at least 8 characters long, upper and lower case, has number and at special character.')
  })
})
