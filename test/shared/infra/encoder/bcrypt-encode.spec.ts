import bcrypt from 'bcrypt'
import { BcryptEncoder } from '@/users/infra/encoder'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('mocked_hash')
  },
  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const rounds = 10
const makeEncoder = (): BcryptEncoder => {
  return new BcryptEncoder(rounds)
}

describe('Bcrypt Encoder hash()', () => {
  test('should call hash with correct value', async () => {
    const encoder = makeEncoder()

    const compareSpy = jest.spyOn(bcrypt, 'hash')
    await encoder.encode('any_value')

    expect(compareSpy).toHaveBeenCalledWith('any_value', rounds)
  })

  test('should return a valid hash on success', async () => {
    const encoder = makeEncoder()

    const hash = await encoder.encode('any_value')

    expect(hash).toBe('mocked_hash')
  })

  test('should throw error if bcrypt throws', async () => {
    const encoder = makeEncoder()

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      throw new Error('ENCODE ERROR')
    })

    const promise = encoder.encode('any_value')

    await expect(promise).rejects.toThrow('ENCODE ERROR')
  })
})

describe('Bcrypt Encoder compare()', () => {
  test('should call compare with correct value', async () => {
    const encoder = makeEncoder()

    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await encoder.compare('any_value', 'any_hash')

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('should return true when compare succeeds', async () => {
    const encoder = makeEncoder()

    const isValid = await encoder.compare('any_value', 'any_hash')
    expect(isValid).toBeTruthy()
  })

  test('should return false when compare fails', async () => {
    const encoder = makeEncoder()

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => await Promise.resolve(false))
    const isValid = await encoder.compare('any_value', 'any_hash')
    expect(isValid).toBeFalsy()
  })

  test('should throw if compare throws', async () => {
    const encoder = makeEncoder()

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => { await Promise.reject(new Error()) })
    const promise = encoder.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
