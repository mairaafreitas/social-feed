import { type HttpRequest } from '@/shared/web-controllers/ports'

export const validateRequestBody = (requiredParams: string[], request: HttpRequest): string[] | null => {
  const missingParams: string[] = []

  for (const param of requiredParams) {
    if ((request.body[param] in request.body)) {
      missingParams.push(param)
    }
  }

  return missingParams.length > 0 ? missingParams : null
}
