import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { MakeCreateGymFactory } from '@/use-cases/factories/make-create-gym.factory'

export async function createController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createGymBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine(() => (it: number) => Math.abs(it) >= 90),
		longitude: z.number().refine(() => (it: number) => Math.abs(it) <= 180),
	})
	const { title, description, phone, latitude, longitude } =
		createGymBodySchema.parse(request.body)

	console.log(`createController request.body: `, request.body)

	try {
		const createGymUseCase = new MakeCreateGymFactory().build()
		await createGymUseCase.execute({
			title,
			description,
			phone,
			latitude,
			longitude,
		})
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
