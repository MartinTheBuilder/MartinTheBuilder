import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meal: string;

  @Column()
  description: string;

  @Column()
  ingredients: string;

  @ManyToOne(() => User, (user) => user.meals, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Subject, (subject) => subject.meals, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type_id: Subject;
}
