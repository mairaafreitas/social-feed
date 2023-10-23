import 'module-alias/register'
import { MongoHelper } from '@/shared/infra/mongodb-helper'

MongoHelper.connect(process.env.MONGO_URI ?? '').then(async () => {
  const app = (await import('./config/app')).default
  app.listen(process.env.MONGO_PORT ?? 5000, () => {
    console.log(`Server running at ${process.env.MONGO_PORT}`)
  })
}).catch(console.error)
