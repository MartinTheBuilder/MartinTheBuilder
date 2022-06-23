import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal) private readonly mealRepository: Repository<Meal>,
  ) {}

  getAll(): Promise<Meal[]> {
    return this.mealRepository.find();
  }

  create(data): Promise<Meal> {
    return this.mealRepository.save(data);
  }

  findOne(id: number): Promise<Meal> {
    return this.mealRepository.findOne({ id });
  }

  async update(id: number, data): Promise<Meal> {
    await this.mealRepository.update(id, data);

    return this.findOne(id);
  }

  delete(id: number) {
    return this.mealRepository.delete({ id });
  }
}
