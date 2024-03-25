import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { E_Gender } from './types'


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'email', type: 'varchar', nullable: true})
  email: string

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password: string

  @Column({ name: 'name_first', type: 'varchar', nullable: true })
  nameFirst: string

  @Column({ name: 'name_last', type: 'varchar', nullable: true })
  nameLast: string

  @Column({ name: 'birth_date', type: 'timestamp', nullable: true })
  birthDate: Date

  @Column({ name: 'gender', type: 'enum', enum: E_Gender, nullable: true })
  gender: E_Gender | null
}
