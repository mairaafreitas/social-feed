import { Name } from '@/users/entities'
import { type InvalidNameError } from '@/users/entities/errors'

describe('Name validation', () => {
  test('should validate name with success', () => {
    const name = 'Fake name test'
    expect(Name.validate(name)).toBeTruthy()
  })
  test('should not accept name less than 2 characters', () => {
    const invalidName = 'x'
    expect(Name.validate(invalidName)).toBeFalsy()
  })
  test('should not accept name greater than 100 characters', () => {
    const invalidName = 'x'.repeat(101)
    expect(Name.validate(invalidName)).toBeFalsy()
  })
  test('should not accept name with invalid character', () => {
    const invalidName = 'Fake $name'
    expect(Name.validate(invalidName)).toBeFalsy()
  })
  test('should not accept name with only whitespace', () => {
    const invalidName = '   '
    expect(Name.validate(invalidName)).toBeFalsy()
  })
})

describe('Name creation', () => {
  test('should create password with success', () => {
    const name = 'Fake name test'
    const newName = Name.create(name) as Name
    expect(newName.value).toBe(name)
  })
  test('should raise InvalidNameError', () => {
    const name = 'Fake $name'
    const invalidName = Name.create(name) as InvalidNameError
    expect(invalidName.message).toBe(`Invalid name: ${name}.`)
  })
})
