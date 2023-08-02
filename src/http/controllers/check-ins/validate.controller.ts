import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeValidateCheckInFactory } from '@/use-cases/factories/make-validate-check-in.factory'

export async function validateController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const validateCheckInParamsSchema = z.object({
		checkInId: z.string().uuid(),
	})

	const { checkInId } = validateCheckInParamsSchema.parse(request.params)

	const validateCheckInUseCase = new MakeValidateCheckInFactory().build()

	await validateCheckInUseCase.execute({ checkInId })

	return reply.status(204).send()
}
