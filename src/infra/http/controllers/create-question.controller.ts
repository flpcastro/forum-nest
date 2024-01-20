/* eslint-disable no-mixed-spaces-and-tabs */
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateQuestionUseCase } from 'src/domain/forum/application/use-cases/create-question'

const createQuestionBodySchema = z.object({
	title: z.string(),
	content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
	constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
	async handle(
		@Body(bodyValidationPipe) body: CreateQuestionBodySchema,
		@CurrentUser() user: UserPayload
	) {
		const { title, content } = body
		const userId = user.sub

		await this.createQuestion.execute({
			title,
			content,
			authorId: userId,
			attachmentsIds: [],
		})
	}
}