import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { createMap, type Mapper } from '@automapper/core'
import { Injectable } from '@nestjs/common'
import { CategoryEntity } from 'src/infrastructure/entities'
import { CategoryResponseDto } from '../dto/category-response.dto'
import { CreateCategoryDto } from '../dto/create-category.dto'

@Injectable()
export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CategoryEntity, CategoryResponseDto)
      createMap(mapper, CreateCategoryDto, CategoryEntity)
    }
  }
}
