import orderService from "../services/order.service.js";

async function test() {
    const order = await orderService.updateOrderStatus(1, 'IN_PROGRESS')
    console.log(order)

    const completed = await orderService.updateOrderStatus(1, "COMPLETED")
    console.log(completed)

    await orderService.updateOrderStatus(1, "PENDING")
}

test().catch(console.error)