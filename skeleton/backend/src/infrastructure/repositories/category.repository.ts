import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from '../entities'

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly dao: Repository<CategoryEntity>,
  ) {}

  async create(entity: CategoryEntity): Promise<CategoryEntity> {
    return await this.dao.save(entity)
  }

  async update(id: number, entity: CategoryEntity): Promise<number> {
    const result = await this.dao.update(id, entity)
    return result.affected
  }

  async findById(categoryId: number): Promise<CategoryEntity | null> {
    return await this.dao.findOneBy({ categoryId: categoryId })
  }

  async remove(category: CategoryEntity) {
    await this.dao.delete(category)
  }

  async findBySpecification(entity: CategoryEntity): Promise<CategoryEntity[]> {
    return await this.dao.find({ where: { ...entity } })
  }
}
