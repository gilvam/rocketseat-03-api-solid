import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeFetchUserCheckInsHistoryFactory } from '@/use-cases/factories/make-fetch-user-check-ins-history.factory'

export async function historyController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const checkInHistoryQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	})
	const { page } = checkInHistoryQuerySchema.parse(request.query)

	const fetchUserCheckInsHistoryUseCase =
		new MakeFetchUserCheckInsHistoryFactory().build()

	const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
		userId: request.user.sub,
		page,
	})

	return reply.status(200).send({ checkIns })
}
