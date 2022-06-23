import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMealDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  subject_id?: number;
}
