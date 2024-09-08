import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()
prisma.$connect().then(() => {
  console.log("prisma connected to mongodb");
}).catch((e: any) => {
  console.log("prisma failed to connect to mongodb: ", e);
})

