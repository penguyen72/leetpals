/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient
}

if (!global.prisma) {
  global.prisma = new PrismaClient()
}
global.prisma.$connect()
export const prisma = global.prisma
