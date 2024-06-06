import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('employee')
@Tree('closure-table')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ nullable: true })
  positionId: number;

  @Column({ length: 100, nullable: true })
  positionName: string;

  @TreeChildren()
  child: Employee[];

  @TreeParent()
  parent: Employee;
}
