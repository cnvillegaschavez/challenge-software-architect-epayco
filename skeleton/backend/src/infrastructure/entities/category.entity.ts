import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  categoryId: number

  @Column({ type: 'varchar', length: 10 })
  code: string

  @Column({ type: 'varchar', length: 100 })
  name: string
}
