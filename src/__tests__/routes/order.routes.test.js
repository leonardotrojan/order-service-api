import request from 'supertest'
import { jest } from '@jest/globals'

jest.unstable_mockModule('../../prisma/client.js', () => ({
  prisma: {
    order: {
      findUnique: jest.fn(),
      delete: jest.fn()
    }
  }
}))

const { prisma } = await import('../../prisma/client.js')
const app = (await import('../../app.js')).default

describe('DELETE /orders/:id', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).delete('/orders/1')
    expect(res.status).toBe(401)
  })

  it('should return 409 if order status is invalid', async () => {
    prisma.order.findUnique.mockResolvedValue({
      id: 1,
      status: 'PENDING'
    })

    const token = generateToken()

    const response = await request(app)
      .delete('/orders/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(409)
  })

  it('should delete order with valid status', async () => {
    prisma.order.findUnique.mockResolvedValue({
      id: 1,
      status: 'COMPLETED'
    })

    prisma.$transaction.mockResolvedValue()

    const token = generateToken()

    const response = await request(app)
      .delete('/orders/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Order deleted successfully')
  })
})