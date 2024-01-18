import { Question as PrismaQuestion } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Question } from 'src/domain/forum/enterprise/entities/question'
import { Slug } from 'src/domain/forum/enterprise/entities/value-objects/slug'

export class PrismaQuestionMapper {
	static toDomain(raw: PrismaQuestion): Question {
		return Question.create({
			title: raw.title,
			content: raw.content,
			authorId: new UniqueEntityID(raw.authorId),
			bestAnswerId: undefined,
			slug: Slug.create(raw.slug),
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		}, new UniqueEntityID(raw.id))
	}
}