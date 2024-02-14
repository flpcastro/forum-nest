import { AppModule } from 'src/infra/app.module'
import { PrismaService } from '../../database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from 'src/infra/database/database.module'

describe('Create Question (E2E)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService
	let studentFactory: StudentFactory

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule],
			providers: [StudentFactory],
		}).compile()

		app = moduleRef.createNestApplication()

		prisma = moduleRef.get(PrismaService)
		jwt = moduleRef.get(JwtService)

		studentFactory = moduleRef.get(StudentFactory)

		await app.init()
	})

	test('[POST] /questions', async () => {
		const user = await studentFactory.makePrismaStudent()
		
		const accessToken = jwt.sign({ sub: user.id.toString() })

		const response = await request(app.getHttpServer())
			.post('/questions')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				title: 'New question',
				content: 'Question content',
			})

		expect(response.statusCode).toBe(201)

		const questionOnDatabase = await prisma.question.findFirst({
			where: {
				title: 'New question',
			},
		})

		expect(questionOnDatabase).toBeTruthy()
	})
})