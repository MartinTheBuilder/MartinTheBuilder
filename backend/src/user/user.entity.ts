import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Meal } from '../meal/meal.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];
}
