import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    SequelizeModule.forRoot(sequelizeConfig as SequelizeModuleOptions),
  ],
})
export class AppModule {}
