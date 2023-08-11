import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/http/controllers/_utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to list gyms nearby', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Javascript Gym',
				description: 'Some description',
				phone: '11999999999',
				latitude: -27.2092052,
				longitude: -49.6401091,
			})

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Typescript Gym',
				description: 'Some description',
				phone: '11999999999',
				latitude: -27.0610928,
				longitude: -49.5229501,
			})

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -27.2092052,
				longitude: -49.6401091,
			})
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).equals(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({ title: 'Javascript Gym' }),
		])
	})
})
