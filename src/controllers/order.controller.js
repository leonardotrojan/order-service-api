import orderService from "../services/order.service.js";

class OrderController {
    async create(req, res) {
        const order = await orderService.createOrder(req.body)
        return res.status(201).json(order)
    }

    async updateStatus(req, res) {
        const { id } = req.params
        const { status } = req.body

        const order = await orderService.updateOrderStatus(
            Number(id),
            status
        )

        return res.json(order)
    }

    async getAll(req,res) {
        const orders = await orderService.getAllOrders()
        return res.json(orders)
    }

    async getById(req, res) {
        const { id } = req.params
        const order = await orderService.getOrderById(Number(id))
        return res.json(order)
    }

    async delete(req, res) {
        const { id } = req.params
        const result = await orderService.deleteOrder(Number(id))
        return res.json(result)
    }
}

export default new OrderController()