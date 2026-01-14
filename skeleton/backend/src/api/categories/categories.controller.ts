import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ResponseDto } from 'src/common/dto/response.dto'
import { CategoryResponseDto } from './dto/category-response.dto'
import { AuthGuard } from '../auth/auth.guard'

@ApiTags('categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({
    status: 200,
    description: 'Forbidden.',
    type: ResponseDto<CategoryResponseDto>,
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id)
  }

  @ApiOperation({ summary: 'Update category' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id)
  }
}
