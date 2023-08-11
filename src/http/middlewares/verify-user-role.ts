import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(verifyUserRole: 'ADMIN' | 'MEMBER') {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		if (request.user.role !== verifyUserRole) {
			return reply.status(401).send({ message: 'Unauthorized' })
		}
	}
}
