import { Entity, OneToOne, JoinColumn,Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Entity()
export class Lists {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   item: string

   @Column()
   isDone: number

   @Column()
   description: string

   @CreateDateColumn()
   createdAt : String

   @UpdateDateColumn()
   updtedAt : String

   @OneToMany(type => User, user => user.id)
   @JoinColumn()
   user: User[]
}
