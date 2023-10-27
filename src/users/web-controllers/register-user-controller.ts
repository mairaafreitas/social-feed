import { badRequest, ok, serverError, validateRequestBody } from '@/shared/web-controllers'
import { type HttpRequest, type HttpResponse } from '@/shared/web-controllers/ports'
import { type RegisterUserUseCase } from '@/users/usecases/ports'
import { type User } from '@/users/entities'
import { MissingParamError } from '@/users/web-controllers/errors'
import { InvalidNameError, InvalidEmailError, InvalidPasswordError } from '@/users/entities/errors'

export class RegisterUserController {
  private readonly registerUserUsecase: RegisterUserUseCase
  constructor (registerUserUsecase: RegisterUserUseCase) {
    this.registerUserUsecase = registerUserUsecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParams = validateRequestBody(['name', 'email', 'password'], request)
      if (missingParams != null) {
        return badRequest(new MissingParamError(missingParams))
      }

      const userData: User = request.body
      const response = await this.registerUserUsecase.perform(userData)

      if (response instanceof InvalidNameError || response instanceof InvalidEmailError || response instanceof InvalidPasswordError) {
        return badRequest(response.message)
      }

      if (response === undefined) {
        return badRequest(response.value)
      }

      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}
