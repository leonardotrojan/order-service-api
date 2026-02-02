import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Limpeza opcional (bom pra dev)
  await prisma.orderProduct.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.customer.deleteMany()

  // Cliente
  const customer = await prisma.customer.create({
    data: {
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      phone: '11999999999'
    }
  })

  // Produtos
  const product1 = await prisma.product.create({
    data: {
      name: 'Produto A',
      price: 50
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Produto B',
      price: 30
    }
  })

  console.log({
    customer,
    product1,
    product2
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
