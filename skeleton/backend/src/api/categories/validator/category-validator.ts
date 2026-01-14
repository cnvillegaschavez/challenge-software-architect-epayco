import { Validator } from 'fluentvalidation-ts'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CategoryValidator extends Validator<CreateCategoryDto> {
  constructor() {
    super()
    this.ruleFor('code').notEmpty().notNull()
    this.ruleFor('name').notEmpty().maxLength(100)
  }
}
