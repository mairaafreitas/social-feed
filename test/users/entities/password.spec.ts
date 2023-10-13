import { type InvalidPasswordError } from '@/users/entities/errors'
import { Password } from '@/users/entities'

describe('Password validation', () => {
  test('should validate password with success', () => {
    const password = 'Xpassword1*'
    expect(Password.validate(password)).toBeTruthy()
  })
  test('should not accept length less than 8', () => {
    const password = 'short'
    expect(Password.validate(password)).toBeFalsy()
  })
  test('should not accept without upper case', () => {
    const password = 'xpassword'
    expect(Password.validate(password)).toBeFalsy()
  })
  test('should not accept without lower case', () => {
    const password = 'XPASSWORD'
    expect(Password.validate(password)).toBeFalsy()
  })
  test('should not accept without a number', () => {
    const password = 'Xpassword'
    expect(Password.validate(password)).toBeFalsy()
  })
  test('should not accept without a special character', () => {
    const password = 'Xpassword1'
    expect(Password.validate(password)).toBeFalsy()
  })
})

describe('Password creation', () => {
  test('should create password with success', () => {
    const password = 'Xpassword1*'
    const newPassword = Password.create(password) as Password
    expect(newPassword.value).toBe(password)
  })
  test('should raise InvalidPasswordError', () => {
    const password = 'Xpassword'
    const newPassword = Password.create(password) as InvalidPasswordError
    expect(newPassword.message).toBe('Invalid password. Check if you password has at least 8 characters long, upper and lower case, has number and at special character.')
  })
})
