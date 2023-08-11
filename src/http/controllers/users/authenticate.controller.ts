import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredetialsError } from '@/use-cases/errors/invalid-credentials-error'
import { MakeAuthenticateFactory } from '@/use-cases/factories/make-authenticate.factory'

export async function authenticateController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})
	const { email, password } = authenticateBodySchema.parse(request.body)

	try {
		const authenticateUseCase = new MakeAuthenticateFactory().build()

		const { user } = await authenticateUseCase.execute({ email, password })

		const token = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: { sub: user.id },
			},
		)

		const refreshToken = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: { sub: user.id, expiresIn: '7d' },
			},
		)

		return reply
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({ token })
	} catch (err) {
		if (err instanceof InvalidCredetialsError) {
			return reply.status(400).send({ message: err.message })
		}

		throw err
	}
}
