import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}