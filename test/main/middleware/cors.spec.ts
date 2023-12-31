import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
  test('should enable cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app).get('/test_cors')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
      .expect('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  })
})
