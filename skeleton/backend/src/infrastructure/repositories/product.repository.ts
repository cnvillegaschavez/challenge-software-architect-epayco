import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from '../entities'

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly dao: Repository<ProductEntity>,
  ) {}

  async create(entity: ProductEntity): Promise<ProductEntity> {
    return await this.dao.save(entity)
  }

  async update(id: number, entity: ProductEntity): Promise<number> {
    const result = await this.dao.update(id, entity)
    return result.affected
  }

  async findById(productId: number): Promise<any> {
    return await this.dao.findOneBy({ productId: productId })
  }

  async findBySpecification(
    entity: ProductEntity,
    relations?: string[],
  ): Promise<ProductEntity[]> {
    return await this.dao.find({ where: { ...entity }, relations })
  }

  async remove(category: ProductEntity) {
    await this.dao.delete(category)
  }
}
