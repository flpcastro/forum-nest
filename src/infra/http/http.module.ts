import { Module } from '@nestjs/common'
import { CreateAccountController } from '../http/controllers/create-account.controller'
import { AuthenticateController } from '../http/controllers/authenticate.controller'
import { CreateQuestionController } from '../http/controllers/create-question.controller'
import { FetchRecentQuestionsController } from '../http/controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from 'src/domain/forum/application/use-cases/create-question'

@Module({
	imports: [DatabaseModule],
	controllers: [
		CreateAccountController, 
		AuthenticateController, 
		CreateQuestionController, 
		FetchRecentQuestionsController
	],
	providers: [
		CreateQuestionUseCase,
	]
})
export class HttpModule {}