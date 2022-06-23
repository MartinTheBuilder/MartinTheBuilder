import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MealModule } from './meal/meal.module';
import { SubjectModule } from './subject/subject.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ConfigModule.forRoot({isGlobal: true})
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt('5432', 10),
      username: 'postgres',
      password: 'postgres',
      database: 'node123',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    MealModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
