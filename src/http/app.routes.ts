import { FastifyInstance } from 'fastify'
import { registerController } from '@/http/controllers/register.controller'
import { authenticateController } from '@/http/controllers/authenticate.controller'
import { profileController } from '@/http/controllers/profile.controller'

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', registerController)
	app.post('/sessions', authenticateController)

	/** Authenticated */
	app.get('/me', profileController)
}
