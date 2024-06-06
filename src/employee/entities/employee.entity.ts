import { EmployeePosition } from "src/employee-position/entities/employee-position.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, OneToOne, JoinTable, ManyToMany, OneToMany, ManyToOne } from "typeorm";

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 500 })
    name: string;

    @OneToOne(() => EmployeePosition)
    @JoinColumn()
    position: EmployeePosition

    @ManyToOne((type) => Employee, (category) => category.child)
    parent?: Employee

    @OneToMany((type) => Employee, (category) => category.parent)
    child?: Employee[]
  
  
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
