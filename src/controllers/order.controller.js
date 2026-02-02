import orderService from "../services/order.service.js";

class OrderController {
    async create(req, res) {
        try {
            const order = await orderService.createOrder(req.body)
            return res.status(201).json(order)
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }

    async updateStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body

            const order = await orderService.updateOrderStatus(
                Number(id),
                status
            )

            return res.json(order)
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }

    async getAll(req,res) {
        try {
            const orders = await orderService.getAllOrders()
            return res.json(orders)
        } catch (error) {
            return res.status(500).json({ 
                error: error.message 
            })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            const order = await orderService.getOrderById(Number(id))
            return res.json(order)
        } catch {
            return res.status(404).json({
                error: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const result = await orderService.deleteOrder(Number(id))
            return res.json(result)
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
}

export default new OrderController()