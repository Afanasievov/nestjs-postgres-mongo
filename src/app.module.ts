import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConfig } from './config/mongo.app.config';
import { GraphQLModule } from '@nestjs/graphql';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    TypeOrmModule.forRoot(mongoConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TasksModule,
    AuthModule,
    PassportModule,
    LessonModule,
  ],
})
export class AppModule {}
