import prisma from "../prisma/client.js";

class OrderService {
    async createOrder({ customerId, products }) {
        if (!customerId) {
            throw new Error("Customer is required")
        }

        if (!products || products.length === 0) {
            throw new Error("Order must have at least one product")
        }

        const customer = await prisma.customer.findUnique({
            where: { id: customerId }
        })

        if (!customer) {
            throw new Error("Customer is not found")
        }

        const productsIds = products.map(p => p.productId)

        const dbProducts = await prisma.product.findMany({
            where: {
                id: { in: productsIds }
            }
        })

        if (dbProducts.length !== products.length) {
            throw new Error("One or more products not found")
        }

        let totalPrice = 0

        const orderProductsData = products.map(item => {
            if (item.quantity < 1) {
                throw new Error("Product quantity must be at least 1")
            }

            const product = dbProducts.find(p => p.id === item.productId)

            totalPrice += product.price * item.quantity

            return {
                productId: product.id,
                quantity: item.quantity
            }
        })

        const order = await prisma.order.create({
            data: {
                customerId,
                status: "PENDING",
                totalPrice,
                products: {
                    create: orderProductsData
                }
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                },
                customer: true
            }
        })

        return order
    }

    async updateOrderStatus(orderId, newStatus) {
        if (!orderId) {
            throw new Error("Order ID is required")
        }

        if (!newStatus) {
            throw new Error("New status is required")
        }

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        if (!order) {
            throw new Error("Order not found")
        }

        if (order.status === 'COMPLETED' || order.status === 'CANCELED') {
            throw new Error(`Order already ${order.status} and cannot be updated`)
        }

        const allowedTransitions = {
            PENDING: ['IN_PROGRESS', 'CANCELED'],
            IN_PROGRESS: ['COMPLETED', 'CANCELED']
        }

        const allowedNextStatuses = allowedTransitions[order.status]

        if (!allowedNextStatuses.includes(newStatus)) {
            throw new Error(
                `Invalid status transition from ${order.status} to ${newStatus}`
            )
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: newStatus
            }
        })

        return updatedOrder
    }

    async getAllOrders() {
        return prisma.order.findMany({
            include: {
                customer: true,
                products: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async getOrderById(orderId) {
        if (!orderId) {
            throw new Error("Order ID is required")
        }

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                customer: true,
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })

        if (!order) {
            throw new Error("Order not found")
        }

        return order
    }

    async deleteOrder(orderId) {
        if (!orderId) {
            throw new Error("Order ID is required")
        }

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        if (!order) {
            throw new Error("Order not found")
        }

        const allowedStatuses = ["COMPLETED", "CANCELED"]

        if (!allowedStatuses.includes(order.status)) {
            throw new Error(`Order with status ${order.status} cannot be deleted`)
        }

        await prisma.order.delete({
            where: {
                id: orderId
            }
        })

        return { message: "order deleted sucessfully" }
    }
}

export default new OrderService()