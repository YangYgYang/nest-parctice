import { Entity, JoinColumn,Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, } from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Entity()
export class Lists {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   item: string

   @Column({ nullable: true })
   isDone: boolean

   @Column({ nullable: true })
   description: string

   @CreateDateColumn()
   createdAt : String

   @UpdateDateColumn()
   updtedAt : String

   @ManyToOne(() => User,user => user.list)
   userId: User
}
