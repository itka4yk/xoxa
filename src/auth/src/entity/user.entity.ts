import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];
}