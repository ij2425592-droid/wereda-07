// prisma.config.ts
import 'dotenv/config'
import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Falls back to standard URL if DIRECT_URL isn't set
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
})