import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus } from './user-status.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column('simple-json', { default: ['User'] })
  roles: string[];

  @Column({
    type: 'varchar',
    enum: UserStatus,
    default: UserStatus.ENABLED,
  })
  status: UserStatus;
}
