import 'dotenv/config'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import * as process from 'process'
import { prisma } from '@/lib/prisma'

function generateDataBaseUrl(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('Please provide a DATABASE_URL environment variable.')
	}

	const url = new URL(process.env.DATABASE_URL)
	url.searchParams.set('schema', schema)
	return url.toString()
}

export default <Environment>{
	name: 'prisma',
	async setup() {
		const schema = randomUUID()
		const database = generateDataBaseUrl(schema)

		process.env.DATABASE_URL = database

		execSync('npx prisma migrate deploy')

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				)
				await prisma.$disconnect()
			},
		}
	},
}
