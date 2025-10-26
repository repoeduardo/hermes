import { PrismaClient } from "@/src/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import "dotenv/config";

const globalPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prisma = prisma;
}

export default prisma;
