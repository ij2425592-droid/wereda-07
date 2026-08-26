import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global;

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.warn('⚠️ [Prisma] DATABASE_URL is not set in environment variables! Please configure it in your Vercel Project Settings.');
    }

    const pool = new Pool({
        connectionString,
        ssl: connectionString && connectionString.includes('supabase.com')
            ? { rejectUnauthorized: false }
            : undefined,
    });
    const adapter = new PrismaPg(pool);

    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}