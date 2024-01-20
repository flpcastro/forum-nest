import { Module } from '@nestjs/common'
import { CreateAccountController } from '../http/controllers/create-account.controller'
import { AuthenticateController } from '../http/controllers/authenticate.controller'
import { CreateQuestionController } from '../http/controllers/create-question.controller'
import { FetchRecentQuestionsController } from '../http/controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from 'src/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from 'src/domain/forum/application/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from 'src/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from 'src/domain/forum/application/use-cases/authenticate-student'
import { CrytographyModule } from '../cryptography/cryptography.module'

@Module({
	imports: [
		DatabaseModule,
		CrytographyModule,
	],
	controllers: [
		CreateAccountController, 
		AuthenticateController, 
		CreateQuestionController, 
		FetchRecentQuestionsController
	],
	providers: [
		CreateQuestionUseCase,
		FetchRecentQuestionsUseCase,
		RegisterStudentUseCase,
		AuthenticateStudentUseCase
	]
})
export class HttpModule {}