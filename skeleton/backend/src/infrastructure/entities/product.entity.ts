import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CategoryEntity } from './category.entity'

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productId: number

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity

  @Column({ type: 'varchar', length: 10 })
  code: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 200 })
  description: string

  @Column({ type: 'varchar', length: 500 })
  imgUrl: string
}
