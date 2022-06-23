import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  meal: string;

  @IsString()
  description: string;

  @IsString()
  ingredients: string;

  @IsNotEmpty()
  type_id: number;
}