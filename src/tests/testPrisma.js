import prisma from "../prisma/client.js";

async function test() {
    const customers = await prisma.customer.findMany()
    console.log(customers)
}

test()
  .catch(console.error)
  .finally(() => prisma.$disconnect())