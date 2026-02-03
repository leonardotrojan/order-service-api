import { jest } from '@jest/globals'

jest.unstable_mockModule('../../prisma/client.js', () => ({
  prisma: {
    order: {
      findUnique: jest.fn(),
      delete: jest.fn()
    },
    $transaction: jest.fn()
  }
}))

const { prisma } = await import('../../prisma/client.js')
const { OrderService } = await import('../../services/order.service.js')

describe('OrderService - deleteOrder', () => {
  it('should not delete order with invalid status', async () => {
    prisma.order.findUnique.mockResolvedValue({
      id: 1,
      status: 'PENDING'
    })

    await expect(
      OrderService.deleteOrder(1)
    ).rejects.toThrow('Order cannot be deleted')

    expect(prisma.order.delete).not.toHaveBeenCalled()
  })
})