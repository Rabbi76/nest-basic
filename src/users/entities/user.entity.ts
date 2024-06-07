import { Exclude } from 'class-transformer';
import { UserRoles } from 'src/auth/decorators/role.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Staff })
  role: UserRoles;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
