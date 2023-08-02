import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeFetchNearbyGymsFactory } from '@/use-cases/factories/make-fetch-nearby-gyms.factory'

export async function nearbyController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const nearByGymsQuerySchema = z.object({
		latitude: z.number().refine(() => (it: number) => Math.abs(it) >= 90),
		longitude: z.number().refine(() => (it: number) => Math.abs(it) <= 180),
	})
	const { latitude, longitude } = nearByGymsQuerySchema.parse(request.query)

	const nearByGymUseCase = new MakeFetchNearbyGymsFactory().build()

	const { gyms } = await nearByGymUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return reply.status(200).send({ gyms })
}
