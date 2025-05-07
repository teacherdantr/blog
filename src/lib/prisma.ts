import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClient = globalForPrisma.prisma ?? new PrismaClient({\n  log: [\'query\', \'info\', \'warn\', \'error\'],\n});

prismaClient.$connect().then(() => console.log(\'Prisma connected\')).catch((e) => console.error(\'Prisma connection error:\', e));

export const prisma = prismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
