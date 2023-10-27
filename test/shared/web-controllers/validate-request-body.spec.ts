import { validateRequestBody } from '@/shared/web-controllers/validate-request-body'

describe('Validate Request Body', () => {
  test('should return null when all required parameters are present', () => {
    const requiredParams = ['name', 'email']
    const request = {
      body: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    }

    const result = validateRequestBody(requiredParams, request)

    expect(result).toBeNull()
  })

  test('should return null when no parameters are required', () => {
    const requiredParams = []
    const request = {
      body: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    }

    const result = validateRequestBody(requiredParams, request)

    expect(result).toBeNull()
  })

  test('should return an array of missing parameters', () => {
    const requiredParams = ['name', 'email', 'age']
    const request = {
      body: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    }

    const result = validateRequestBody(requiredParams, request)

    expect(result).toEqual(['age'])
  })

  test('should return all required parameters when request body is empty', () => {
    const requiredParams = ['name', 'email']
    const request = {
      body: {}
    }

    const result = validateRequestBody(requiredParams, request)

    expect(result).toEqual(requiredParams)
  })
})
