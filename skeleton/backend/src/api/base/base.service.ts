import { severityStatusEnum } from './../../common/constants/severityStatus.enum'
import { Injectable } from '@nestjs/common'
import { ResponseDto } from '../../common/dto/response.dto'

@Injectable()
export class BaseService {
  constructor() {}
  notFound = () => {
    return new ResponseDto(
      null,
      'No existe el registro',
      severityStatusEnum.Error,
    )
  }
  toResponse = <T>(data: T = null, resultValidation: object = null) => {
    return new ResponseDto(
      data,
      '',
      severityStatusEnum.Success,
      resultValidation,
    )
  }
}
