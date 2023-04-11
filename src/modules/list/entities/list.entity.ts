import { Entity, OneToOne, JoinColumn,Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
// import { UserEntity } from 'src/modules/user/entities/user.entity'

@Entity()
export class Lists {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   item: string

   @Column()
   price: number

   @Column()
   description: string

   @CreateDateColumn()
   createdAt : String

   @UpdateDateColumn()
   updtedAt : String

//    @OneToMany(type => UserEntity, user => user.id)
//    @JoinColumn()
//    user: UserEntity[]
}
