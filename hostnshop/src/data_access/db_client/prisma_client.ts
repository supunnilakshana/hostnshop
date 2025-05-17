import {PrismaClient} from "@prisma/client";

// Create a new Prisma client instance on each request (for both development and production)
export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
