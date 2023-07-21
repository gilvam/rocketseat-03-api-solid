import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetUserProfileFactory } from '@/use-cases/factories/make-get-user-profile.factory'

export async function profileController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await request.jwtVerify()

	const getUserProfile = new MakeGetUserProfileFactory().build()

	const { user } = await getUserProfile.execute({ userId: request.user.sub })

	return reply
		.status(200)
		.send({ user: { ...user, password_hash: undefined } })
}
