import orderService from "../services/order.service.js";

async function test() {
    const order = await orderService.createOrder({
        customerId: 1,
        products: [
            { productId: 1, quantity: 2 }
        ]
    })

    console.log(JSON.stringify(order, null, 2))
}

test()
  .catch(console.error)