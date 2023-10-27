import { type HttpRequest, type HttpResponse } from '@/shared/web-controllers/ports'
import { type UserData } from '@/users/entities'
import { type RegisterUserUseCase } from '@/users/usecases/ports'
import { RegisterUser } from '@/users/usecases/register-user'
import { type UserRepository } from '@/users/usecases/register-user/ports'
import { InMemoryUserRepository } from '@/users/usecases/register-user/repository'
import { RegisterUserController } from '@/users/web-controllers/register-user-controller'

describe('Register user web controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const registerUseCase: RegisterUserUseCase = new RegisterUser(
    repo
  )
  const controller: RegisterUserController = new RegisterUserController(registerUseCase)

  class ErrorRegisterUserUseCaseStub implements RegisterUserUseCase {
    async perform (request: any): Promise<void> {
      throw Error()
    }
  }
  const errorRegisterUserUseCaseStub: RegisterUserUseCase = new ErrorRegisterUserUseCaseStub()

  test('should return status code ok when request contain valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'email@email.com',
        password: 'Xpassword1*'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(request.body)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'invalid_email.com',
        password: 'Xpassword!.'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingName)
    expect(response.statusCode).toEqual(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return status code 400 when request is missing user email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'Any Name',
        password: 'Xpassword!.'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingEmail)
    expect(response.statusCode).toEqual(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('should return status code 400 when request is missing user password', async () => {
    const requestWithMissingNameAndEmail: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'email@email.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingNameAndEmail)
    expect(response.statusCode).toEqual(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: password.')
  })

  test('should return status code 400 when request contains invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
        email: 'email@email.com',
        password: 'Xpassword!.'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(`Invalid name: ${requestWithInvalidName.body.name}.`)
  })

  test('should return status code 400 when request contains invalid email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'invalid_email.com',
        password: 'Xpassword!.'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(`Invalid email: ${requestWithInvalidEmail.body.email}.`)
  })
  test('should return status code 400 when request contains invalid password', async () => {
    const requestWithInvalidPassword: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'email@email.com',
        password: 'password!.'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidPassword)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual('Invalid password. Check if you password has at least 8 characters long, upper and lower case, has number and at special character.')
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'email@email.com',
        password: 'password!.'
      }
    }
    const controller: RegisterUserController = new RegisterUserController(errorRegisterUserUseCaseStub)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
