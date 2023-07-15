import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile.use-case'
import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileUseCase(usersRepository)
	})

	it('should be able to get user profile', async () => {
		const createUser = await usersRepository.create({
			name: 'John Doe',
			email: 'johndo@example.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			userId: createUser.id,
		})

		expect(user.id).toEqual(expect.any(String))
		expect(user.name).toEqual('John Doe')
	})

	// it('should not be able to get user profile with wrong id', async () => {
	// 	await expect(() => {
	// 		sut.execute({
	// 			userId: 'non-existing-id',
	// 		})
	// 	}).rejects.toBeInstanceOf(ResourceNotFountError)
	// })
})
