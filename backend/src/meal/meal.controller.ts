import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateMealDto } from './create-meal.dto';
import { Request } from 'express';
import { UpdateMealDto } from './update-meal.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(AuthGuard)
@Controller('meal')
export class MealController {
  constructor(
    private mealService: MealService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAll() {
    return this.mealService.getAll();
  }

  @Post()
  async create(@Body() data: CreateMealDto, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    console.log(user);
    return this.mealService.create({
      meal: data.meal,
      description: data.description,
      ingredients: data.ingredients,
      user: { id: user.id },
      type_id: { id: data.type_id },
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
          return callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.mealService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    const meal = await this.getOne(id);

    if (meal.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }

    return this.mealService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateMealDto,
    @Req() request: Request,
  ) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    const meal = await this.getOne(id);

    if (meal.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }

    return this.mealService.update(id, data);
  }
}
