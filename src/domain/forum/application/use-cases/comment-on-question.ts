import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentsRepository } from 'src/domain/forum/application/repositories/question-comments-repository'
import { Either, left, right } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
	constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
	) {}

	async execute({
		authorId,
		questionId,
		content,
	}: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId)

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityID(authorId),
			questionId: new UniqueEntityID(questionId),
			content,
		})

		await this.questionCommentsRepository.create(questionComment)

		return right({
			questionComment,
		})
	}
}
