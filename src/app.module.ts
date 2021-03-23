import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.app.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, SequelizeModule.forRoot(sequelizeConfig)],
})
export class AppModule {}
