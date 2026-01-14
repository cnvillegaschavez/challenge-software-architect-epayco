import { CategoryEntity } from './../../infrastructure/entities/category.entity'
import { Inject, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { injectionTokens } from 'src/infrastructure/repositories/injection-tokens'
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository'
import { CategoryResponseDto } from './dto/category-response.dto'
import { ResponseDto } from 'src/common/dto/response.dto'
import { UtilMapper } from 'src/common/utils/util-mapper'
import { CategoryValidator } from './validator/category-validator'
import { BaseService } from '../base/base.service'

@Injectable()
export class CategoriesService extends BaseService {
  constructor(
    private readonly validator: CategoryValidator,
    private readonly utilMapper: UtilMapper,
    @Inject(injectionTokens.categoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {
    super()
  }

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    const validResult = this.validator.validate(createCategoryDto)

    if (Object.keys(validResult).length !== 0) {
      return this.toResponse(null, validResult)
    }

    const entity = this.utilMapper.map(
      createCategoryDto,
      CreateCategoryDto,
      CategoryEntity,
    )
    const result = await this.categoryRepository.create(entity)
    const entityResponse = this.utilMapper.map(
      result,
      CategoryEntity,
      CategoryResponseDto,
    )
    return this.toResponse(entityResponse)
  }

  async findAll(): Promise<ResponseDto<CategoryResponseDto[]>> {
    const result = await this.categoryRepository.findBySpecification({} as any)
    const entityResponse = this.utilMapper.mapArray(
      result,
      CategoryEntity,
      CategoryResponseDto,
    )
    return this.toResponse(entityResponse)
  }

  async findOne(id: number): Promise<ResponseDto<CategoryResponseDto>> {
    const result = await this.categoryRepository.findById(id)
    if (!result) return this.notFound()
    const entityResponse = this.utilMapper.map(
      result,
      CategoryEntity,
      CategoryResponseDto,
    )
    return this.toResponse(entityResponse)
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    const validResult = this.validator.validate(updateCategoryDto)
    if (Object.keys(validResult).length !== 0) {
      return this.toResponse(null, validResult)
    }

    const entity = this.utilMapper.map(
      updateCategoryDto,
      CreateCategoryDto,
      CategoryEntity,
    )
    const result = await this.categoryRepository.update(id, entity)
    if (result) {
      const entityResponse = this.utilMapper.map(
        entity,
        CategoryEntity,
        CategoryResponseDto,
      )
      return this.toResponse(entityResponse)
    }
    return this.notFound()
  }

  async remove(id: number) {
    const result = await this.categoryRepository.findById(id)
    if (!result) return this.notFound()
    await this.categoryRepository.remove(result)
    const entityResponse = this.utilMapper.map(
      result,
      CategoryEntity,
      CategoryResponseDto,
    )
    return this.toResponse(entityResponse)
  }
}
