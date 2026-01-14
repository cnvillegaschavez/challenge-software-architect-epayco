import { UtilMapper } from '../../common/utils/util-mapper'
import { CategoryEntity } from './../../infrastructure/entities/category.entity'
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository'
import { injectionTokens } from './../../infrastructure/repositories/injection-tokens'
import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryProfile } from './mapper/CategoryProfile'
import { CategoryValidator } from './validator/category-validator'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [
    CategoryValidator,
    CategoryProfile,
    UtilMapper,
    CategoriesService,
    {
      provide: injectionTokens.categoryRepository,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoriesModule {}
