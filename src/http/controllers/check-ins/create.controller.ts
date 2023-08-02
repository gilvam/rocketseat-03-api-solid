import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeCheckInFactory } from '@/use-cases/factories/make-check-in.factory'

export async function createController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createCheckInParamsSchema = z.object({
		gymId: z.string().uuid(),
	})
	const createCheckInBodySchema = z.object({
		latitude: z.number().refine(() => (it: number) => Math.abs(it) >= 90),
		longitude: z.number().refine(() => (it: number) => Math.abs(it) <= 180),
	})

	const { gymId } = createCheckInParamsSchema.parse(request.params)
	const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

	const checkInUseCase = new MakeCheckInFactory().build()

	await checkInUseCase.execute({
		gymId,
		userId: request.user.sub,
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return reply.status(201).send()
}
