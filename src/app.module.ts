import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.app.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), TasksModule, AuthModule, PassportModule],
})
export class AppModule {}
