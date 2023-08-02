import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetUserMetricsFactory } from '@/use-cases/factories/make-get-user-metrics.factory'

export async function metricsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const getUserMetricsUseCase = new MakeGetUserMetricsFactory().build()

	const { checkInsCount } = await getUserMetricsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send({ checkInsCount })
}
