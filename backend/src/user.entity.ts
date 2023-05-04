import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  account: string;

  @Column()
  lowPin: number;

  @Column()
  highPin: number;

  @Column()
  balance: number;

  @Column()
  securityBalance: number;
}
