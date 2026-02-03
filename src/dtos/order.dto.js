import { z } from "zod"

const createOrderDTO = z.object({
    customerId: z.number().int().positive(),
    products: z.array(
        z.object({
            productId: z.number().int().positive(),
            quantity: z.number().int().positive()
        })
    ).min(1)
})

const updateOrderStatusDTO = z.object({
    status: z.enum([
        'PENDING',
        'PROCESSING',
        'COMPLETED',
        'CANCELED'
    ])
})

const orderIdParamDTO = z.object({
    id: z.coerce.number().int().positive()
})

export { 
    createOrderDTO, 
    updateOrderStatusDTO, 
    orderIdParamDTO 
}