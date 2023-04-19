import { Entity, OneToOne, JoinColumn,Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Lists } from '../../list/entities/list.entity'

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   username: string

   @Column()
   email: string

   @Column()
   password: string

   @Column()
   role: string

   @CreateDateColumn()
   createdAt : String

   @UpdateDateColumn()
   updtedAt : String

   @OneToMany(() => Lists, list => list.user)
   list: Lists[]
}
