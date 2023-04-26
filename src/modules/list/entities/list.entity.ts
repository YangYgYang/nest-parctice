import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'list' })
export class Lists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column({ nullable: true })
  isDone: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.list)
  user: User;
}
