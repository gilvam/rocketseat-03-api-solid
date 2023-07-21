import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await request.jwtVerify()

	console.log(`request.headers: `, request.headers)
	console.log(`request.user: `, request.user.sub)

	return reply.status(200).send()
}
